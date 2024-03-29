import { Button, Divider, Text, VStack } from '@chakra-ui/react';
import type { NftMetadata } from '@zoralabs/nft-metadata';
import { AssetId } from 'caip';
import { CodeInput } from 'client/components/CodeInput';
import { DropLayout } from 'client/components/DropLayout';
import { RenderNifty } from 'client/components/RenderNifty';
import { Step } from 'client/components/Step';
import { explorerBaseURI, explorerName } from 'client/lib/explorer';
import { useQuery } from 'client/lib/useQuery';
import { Grant } from 'common/lib/grant';
import { Granter } from 'common/lib/granter';
import { useRouter } from 'next/dist/client/router';
import Script from 'next/script';
import { useCallback, useEffect, useMemo, useReducer } from 'react';
import Confetti from 'react-confetti';
import useWindowSize from 'react-use/lib/useWindowSize';
import Web3Modal from 'web3modal';

interface DropPageData {
  grant: Grant;
  granter: Pick<Granter, 'prefix' | 'name' | 'url'>;
  metadata: NftMetadata;
}

interface State {
  address?: string;
  code?: string;
  hash?: string;
  loading: boolean;
  error?: Error;
}

type Action =
  | { type: 'setAddress'; address: string }
  | { type: 'setCode'; code: string }
  | { type: 'setError'; error: Error }
  | { type: 'startLoading' }
  | { type: 'setHash'; hash: string }
  | { type: 'reset' };

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'setAddress':
      return { ...state, address: action.address, loading: false, error: undefined };
    case 'setCode':
      return { ...state, code: action.code };
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
  const issuer = router.query.issuer as string;
  const initialCode = router.query.code as string;
  const assetId = ((router.query.assetId as string[]) ?? []).join('/');

  const {
    data,
    loading: pageLoading,
    error: pageError,
  } = useQuery<DropPageData>(
    '/api/data',
    useMemo(() => ({ issuer, assetId }), [assetId, issuer]),
    { skip: !issuer },
  );

  const chainId = useMemo(() => {
    if (!data?.grant) return null;
    return new AssetId(data.grant.id).chainId.reference;
  }, [data]);

  const { width, height } = useWindowSize();

  const [{ address, hash, code, loading: dropLoading, error: dropError }, dispatch] = useReducer(
    reducer,
    undefined,
    () => ({ loading: false, code: initialCode }),
  );

  const connectIsDisabled = !data || pageLoading || !!pageError;
  const claimIsDisabled = !data || !address || !code || pageLoading || !!pageError;

  const error = pageError || dropError;
  const loading = pageLoading || dropLoading;

  const startLoading = useCallback(() => dispatch({ type: 'startLoading' }), []);
  const setAddress = useCallback(
    (address: string) => dispatch({ type: 'setAddress', address }),
    [],
  );
  const setCode = useCallback((code: string) => dispatch({ type: 'setCode', code }), []);
  const setHash = useCallback((hash: string) => dispatch({ type: 'setHash', hash }), []);
  const setError = useCallback((error: Error) => dispatch({ type: 'setError', error }), []);
  const reset = useCallback(async () => dispatch({ type: 'reset' }), []);

  const step = hash ? DropStep.Complete : address ? DropStep.Claim : DropStep.ConnectWallet;

  // 1-way glue query param to state ¯\_(ツ)_/¯
  useEffect(() => {
    if (initialCode) setCode(initialCode);
  }, [initialCode, setCode]);

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
        body: JSON.stringify({ issuer, assetId, code, address }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      setHash(data.hash);
    } catch (error) {
      setError(error);
    }
  }, [startLoading, issuer, assetId, code, address, setHash, setError]);

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
            Connect an ETH wallet!
          </Step>
          {step === DropStep.ConnectWallet && (
            <Button onClick={connectAccount} width="full" isDisabled={connectIsDisabled}>
              Connect Wallet
            </Button>
          )}
          <Step
            number={2}
            secondary={
              code && (
                <Text fontSize="xs" fontFamily="mono" isTruncated>
                  {code}
                </Text>
              )
            }
            active={step === DropStep.Claim}
            onClick={step !== DropStep.Claim ? reset : undefined}
          >
            Enter a code!
          </Step>
          {step === DropStep.Claim && (
            <VStack spacing={4}>
              <CodeInput setCode={setCode} />
              <Button
                onClick={handleDrop}
                isLoading={loading}
                width="full"
                isDisabled={claimIsDisabled}
              >
                Claim {data?.metadata?.name ?? 'NFT'}
              </Button>
            </VStack>
          )}
          <Step number={3} active={step === DropStep.Complete}>
            That&apos;s it!
          </Step>
          {step === DropStep.Complete && (
            <Button
              as="a"
              rel="noopener noreferrer"
              target="_blank"
              href={`${explorerBaseURI(chainId)}/tx/${hash}`}
              width="full"
            >
              View on {explorerName(chainId)}
            </Button>
          )}
        </VStack>
      </VStack>
    </DropLayout>
  );
}
