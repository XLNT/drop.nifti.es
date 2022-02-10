import { Button, Divider, Text, VStack } from '@chakra-ui/react';
import type { NftMetadata } from '@zoralabs/nft-metadata';
import { DropLayout } from 'client/components/DropLayout';
import { RenderNifty } from 'client/components/RenderNifty';
import { Step } from 'client/components/Step';
import { useQuery } from 'client/lib/useQuery';
import { Granter } from 'common/lib/granter';
import { useRouter } from 'next/dist/client/router';
import Script from 'next/script';
import { useCallback, useMemo, useReducer } from 'react';
import Confetti from 'react-confetti';
import useWindowSize from 'react-use/lib/useWindowSize';
import Web3Modal from 'web3modal';

interface DropPageData {
  granter: Pick<Granter, 'prefix' | 'name' | 'url'>;
  metadata: NftMetadata;
}

interface State {
  address?: string;
  signature?: string;
  hash?: string;
  loading: boolean;
  error?: Error;
}

type Action =
  | { type: 'setAddress'; address: string }
  | { type: 'setError'; error: Error }
  | { type: 'startLoading' }
  | { type: 'setHash'; hash: string }
  | { type: 'reset' };

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'setAddress':
      return { ...state, address: action.address, loading: false, error: undefined };
    case 'setHash':
      return { ...state, hash: action.hash, loading: false, error: undefined };
    case 'setError':
      return { ...state, error: action.error, loading: false };
    case 'startLoading':
      return { ...state, loading: true, error: undefined };
    case 'reset':
      return { loading: false };
    default:
      return state;
  }
};

enum DropStep {
  ConnectWallet,
  Claim,
  Complete,
}

export default function Drop() {
  const router = useRouter();
  const token = router.query.token as string;

  const {
    data,
    loading: pageLoading,
    error: pageError,
  } = useQuery<DropPageData>(
    '/api/data',
    useMemo(() => ({ token }), [token]),
    { skip: !token },
  );

  const claimIsDisabled = !data || pageLoading || !!pageError;

  const { width, height } = useWindowSize();

  const [{ address, hash, loading: dropLoading, error: dropError }, dispatch] = useReducer(
    reducer,
    undefined,
    () => ({ loading: false }),
  );

  const error = pageError || dropError;
  const loading = pageLoading || dropLoading;

  const startLoading = useCallback(() => dispatch({ type: 'startLoading' }), []);
  const setAddress = useCallback(
    (address: string) => dispatch({ type: 'setAddress', address }),
    [],
  );
  const setHash = useCallback((hash: string) => dispatch({ type: 'setHash', hash }), []);
  const setError = useCallback((error: Error) => dispatch({ type: 'setError', error }), []);
  const reset = useCallback(async () => dispatch({ type: 'reset' }), []);

  const step = hash ? DropStep.Complete : address ? DropStep.Claim : DropStep.ConnectWallet;

  const connectAccount = useCallback(async () => {
    startLoading();
    try {
      const modal = new Web3Modal({
        network: 'mainnet',
        cacheProvider: true,
        providerOptions: {
          walletconnect: {
            package: (window as any).WalletConnectProvider.default,
            options: { infuraId: process.env.NEXT_PUBLIC_INFURA_PROJECT_ID },
          },
        },
      });
      const provider = await modal.connect();
      const account = provider.selectedAddress ?? provider.accounts?.[0] ?? null;
      if (!account) throw new Error(`Unable to find selected account.`);
      setAddress(account);
    } catch (error) {
      setError(error);
    }
  }, [setAddress, setError, startLoading]);

  const handleDrop = useCallback(async () => {
    startLoading();
    try {
      const response = await fetch('/api/drop', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, address }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      setHash(data.hash);
    } catch (error) {
      setError(error);
    }
  }, [address, setError, setHash, startLoading, token]);

  return (
    <DropLayout granter={data?.granter}>
      <Script src="https://unpkg.com/@walletconnect/web3-provider@1.5.3" strategy="lazyOnload" />

      {hash && <Confetti width={width} height={height} />}

      <VStack spacing={4} align="stretch">
        <RenderNifty metadata={data?.metadata} />

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
            secondary={
              address && (
                <Text fontSize="xs" fontFamily="mono" isTruncated>
                  {address}
                </Text>
              )
            }
            active={step === DropStep.ConnectWallet}
            onClick={step !== DropStep.ConnectWallet ? reset : undefined}
          >
            Download or connect an Ethereum wallet.
          </Step>
          {step === DropStep.ConnectWallet && (
            <Button onClick={connectAccount} width="full" isDisabled={claimIsDisabled}>
              Connect Wallet
            </Button>
          )}
          <Step number={2} active={step === DropStep.Claim}>
            Claim {data?.metadata?.name ?? 'NFT'}
          </Step>
          {step === DropStep.Claim && (
            <Button
              onClick={handleDrop}
              isLoading={loading}
              width="full"
              isDisabled={claimIsDisabled}
            >
              Claim {data?.metadata?.name ?? 'NFT'}
            </Button>
          )}
          <Step number={3} active={step === DropStep.Complete}>
            That&apos;s it!
          </Step>
          {step === DropStep.Complete && (
            <Button
              as="a"
              rel="noopener noreferrer"
              target="_blank"
              href={`https://etherscan.io/tx/${hash}`}
              width="full"
            >
              View on Etherscan
            </Button>
          )}
        </VStack>
      </VStack>
    </DropLayout>
  );
}
