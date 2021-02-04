import { Button, Text } from '@chakra-ui/react';
import WalletConnect from '@walletconnect/client';
import registry from '@walletconnect/mobile-registry';
import type { IMobileRegistryEntry, IQRCodeModal, ISessionParams } from '@walletconnect/types';
import { WalletButton } from 'client/components/WalletButton';
import { makeMessage } from 'common/lib/message';
import { utils } from 'ethers';
import { useRouter } from 'next/dist/client/router';
import { useCallback, useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';

const REGISTRY = registry.filter((entry) =>
  [
    'Rainbow',
    // 'Trust Wallet',
    // 'Argent',
  ].includes(entry.name),
);

const makeConnector = (qrcodeModal?: IQRCodeModal) =>
  new WalletConnect({
    bridge: 'https://bridge.walletconnect.org',
    qrcodeModal,
    clientMeta: {
      name: 'Drop Nifties',
      description: 'Some stickers',
      url: 'https://drop.nifti.es',
      icons: [
        'https://uploads-ssl.webflow.com/5e73d2e36a448d3100d70d9b/5ef54e60b872cb1683663d58_favicon.png',
      ],
    },
  });

export default function Drop() {
  const router = useRouter();
  const token = router.query.token as string;

  const [connector, setConnector] = useState<WalletConnect>();

  useEffect(() => {
    if (!isMobile) {
      import('@walletconnect/qrcode-modal')
        .then((qrcodeModal) => {
          setConnector(makeConnector(qrcodeModal.default));
        })
        .catch(setError);
    } else {
      setConnector(makeConnector());
    }
  }, []);

  const [loading, setLoading] = useState(false);
  const [uri, setUri] = useState<string>();
  const [selectedEntry, setSelectedEntry] = useState<IMobileRegistryEntry>();
  const [signature, setSignature] = useState<string>();
  const [address, setAddress] = useState<string>();
  const [error, setError] = useState<Error>();

  useEffect(() => {
    if (!connector) return;
    if (connector.connected) {
      setAddress(connector.accounts[0]);
      return;
    }

    connector.on('connect', (error, payload) => {
      if (error) return setError(error);
      setAddress((payload.params as ISessionParams[])[0].accounts[0]);
    });

    connector.on('disconnect', (error) => {
      setAddress(undefined);
      if (error) return setError(error);
    });

    return () => {
      if (connector.connected) connector.killSession();
    };
  }, [connector]);

  const createSession = useCallback(() => {
    connector
      .createSession()
      .then(() => setUri(connector.uri))
      .catch(setError);
  }, [connector]);

  useEffect(() => {
    if (!connector) return;
    if (isMobile) createSession();
  }, [connector, createSession]);

  const handleSign = useCallback(async () => {
    if (isMobile) {
      // redirect to rainbow in the future...
      setTimeout(
        () =>
          window.open(
            selectedEntry.universalLink ??
              `${selectedEntry.deepLink}${selectedEntry.deepLink.endsWith(':') ? '//' : '/'}`,
          ),
        500,
      );
    }

    // request signature immediately
    setLoading(true);
    try {
      const signature = await connector.signPersonalMessage([
        utils.toUtf8Bytes(makeMessage(address)),
        address,
      ]);
      setSignature(signature);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [address, connector, selectedEntry]);

  const handleDrop = useCallback(async () => {
    try {
      setLoading(true);
      await fetch('/api/drop', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, address, signature }),
      });
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [address, signature, token]);

  if (error) {
    return <Text color="tomato">{error.message}</Text>;
  }

  if (address && signature) {
    return (
      <Button onClick={handleDrop} isLoading={loading}>
        Submit
      </Button>
    );
  }

  if (address) {
    return (
      <Button onClick={handleSign} isLoading={loading}>
        Sign Message
      </Button>
    );
  }

  if (isMobile) {
    return (
      <div>
        {uri &&
          REGISTRY.map((entry) => (
            <WalletButton
              key={entry.name}
              entry={entry}
              uri={uri}
              onClick={() => setSelectedEntry(entry)}
              isLoading={!connector}
            />
          ))}
      </div>
    );
  }

  return (
    <Button onClick={createSession} isLoading={!connector}>
      Wallet Connect
    </Button>
  );
}
