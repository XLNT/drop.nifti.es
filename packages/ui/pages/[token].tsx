import { Button, Center, Divider, Text, VStack } from '@chakra-ui/react';
import WalletConnect from '@walletconnect/client';
import qrcodeModal from '@walletconnect/qrcode-modal';
import type { ISessionParams } from '@walletconnect/types';
import { DropLayout } from 'client/components/DropLayout';
import { RenderNifty } from 'client/components/RenderNifty';
import { Step } from 'client/components/Step';
import { makeMessage } from 'common/lib/message';
import { utils } from 'ethers';
import { useRouter } from 'next/dist/client/router';
import { useCallback, useEffect, useReducer } from 'react';
import Confetti from 'react-confetti';
import useWindowSize from 'react-use/lib/useWindowSize';

const makeConnector = () =>
  new WalletConnect({
    bridge: 'https://bridge.walletconnect.org',
    qrcodeModal,
    qrcodeModalOptions: { mobileLinks: ['rainbow', 'trust wallet', 'argent'] },
    clientMeta: {
      name: 'Drop Nifties',
      description: 'Some stickers',
      url: 'https://drop.nifti.es',
      icons: [
        'https://uploads-ssl.webflow.com/5e73d2e36a448d3100d70d9b/5ef54e60b872cb1683663d58_favicon.png',
      ],
    },
  });

interface State {
  connector: WalletConnect;
  address?: string;
  signature?: string;
  hash?: string;
  loading: boolean;
  error?: Error;
}

type Action =
  | { type: 'setAddress'; address: string }
  | { type: 'setSignature'; signature: string }
  | { type: 'setError'; error: Error }
  | { type: 'startLoading' }
  | { type: 'setHash'; hash: string }
  | { type: 'reset' };

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'setAddress':
      return { ...state, address: action.address, loading: false, error: undefined };
    case 'setSignature':
      return { ...state, signature: action.signature, loading: false, error: undefined };
    case 'setHash':
      return { ...state, hash: action.hash, loading: false, error: undefined };
    case 'setError':
      return { ...state, error: action.error, loading: false };
    case 'startLoading':
      return { ...state, loading: true, error: undefined };
    case 'reset':
      return { loading: false, connector: makeConnector() };
    default:
      return state;
  }
};

enum DropStep {
  ConnectWallet,
  SignMessage,
  Complete,
}

export default function Drop() {
  const router = useRouter();
  const token = router.query.token as string;

  const { width, height } = useWindowSize();

  const [{ connector, address, signature, hash, loading, error }, dispatch] = useReducer(
    reducer,
    undefined,
    () => ({ loading: false, connector: makeConnector() }),
  );

  const startLoading = useCallback(() => dispatch({ type: 'startLoading' }), []);
  const setAddress = useCallback(
    (address: string) => dispatch({ type: 'setAddress', address }),
    [],
  );
  const setSignature = useCallback(
    (signature: string) => dispatch({ type: 'setSignature', signature }),
    [],
  );
  const setHash = useCallback((hash: string) => dispatch({ type: 'setHash', hash }), []);
  const setError = useCallback((error: Error) => dispatch({ type: 'setError', error }), []);
  const reset = useCallback(() => {
    if (connector.connected) connector.killSession();
    dispatch({ type: 'reset' });
  }, [connector]);

  const step = hash ? DropStep.Complete : address ? DropStep.SignMessage : DropStep.ConnectWallet;

  useEffect(() => {
    if (!connector) return;
    if (connector.connected) return setAddress(connector.accounts[0]);

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
  }, [connector, setAddress, setError]);

  const createSession = useCallback(() => {
    connector.createSession().catch(setError);
  }, [connector, setError]);

  const handleSign = useCallback(async () => {
    startLoading();
    try {
      const signature = await connector.signPersonalMessage([
        utils.toUtf8Bytes(makeMessage(address)),
        address,
      ]);
      setSignature(signature);
    } catch (error) {
      setError(error);
    }
  }, [address, connector, setError, setSignature, startLoading]);

  const handleDrop = useCallback(async () => {
    startLoading();
    try {
      const response = await fetch('/api/drop', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, address, signature }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      setHash(data.hash);
    } catch (error) {
      setError(error);
    }
  }, [address, setError, setHash, signature, startLoading, token]);

  // auto-submit after signature
  useEffect(() => {
    if (address && signature) handleDrop();
  }, [address, handleDrop, signature]);

  return (
    <DropLayout
      footer={
        step === DropStep.Complete ? (
          <Button
            as="a"
            rel="noopener noreferrer"
            target="_blank"
            href={`https://etherscan.io/tx/${hash}`}
            width="full"
          >
            View on Etherscan
          </Button>
        ) : step === DropStep.SignMessage ? (
          <Button onClick={handleSign} isLoading={loading} width="full">
            Prove Ownership
          </Button>
        ) : (
          <Button onClick={createSession} isLoading={!connector} width="full">
            Connect Wallet
          </Button>
        )
      }
    >
      {hash && <Confetti width={width} height={height} />}

      <VStack spacing={4} align="stretch">
        <Center>
          <RenderNifty
            metadata={{
              image: 'https://themanymatts.lol/images/buddha.png',
              name: 'buddha matt',
              description:
                'some really really really really really really really really long description',
            }}
          />
        </Center>

        <Divider />

        {error && (
          <>
            <Text color="tomato">{error.message}</Text>
            <Divider />
          </>
        )}

        {/* TODO: some 3-step process with greyed-out steps, etc */}
        <VStack spacing={4} align="stretch">
          <Step
            number={1}
            active={step === DropStep.ConnectWallet}
            onClick={step !== DropStep.ConnectWallet ? reset : undefined}
          >
            Download or connect an Ethereum wallet.
          </Step>
          <Step number={2} active={step === DropStep.SignMessage}>
            Prove ownership of your address
          </Step>
          <Step number={3} active={step === DropStep.Complete}>
            That&apos;s it!
          </Step>
        </VStack>
      </VStack>
    </DropLayout>
  );
}
