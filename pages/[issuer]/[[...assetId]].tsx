import { Button, Divider, Text, VStack } from '@chakra-ui/react';
import type { NftMetadata } from '@zoralabs/nft-metadata';
import { AssetId } from 'caip';
import { DropLayout } from 'client/components/DropLayout';
import { RenderNifty } from 'client/components/RenderNifty';
import { Step } from 'client/components/Step';
import { explorerBaseURI, explorerName } from 'client/lib/explorer';
import { useQuery } from 'client/lib/useQuery';
import { Grant } from 'common/lib/grant';
import { Granter } from 'common/lib/granter';
import { useRouter } from 'next/dist/client/router';
import Script from 'next/script';
import { useCallback, useMemo, useReducer } from 'react';
import AuthCode from 'react-auth-code-input';
import Confetti from 'react-confetti';
import useWindowSize from 'react-use/lib/useWindowSize';
import Web3Modal from 'web3modal';

import authStyles from '../../client/components/auth.module.css';

const CODE_LENGTH = 6;

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
    () => ({ loading: false }),
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
            Download or connect an Ethereum wallet.
          </Step>
          {step === DropStep.ConnectWallet && (
            <Button onClick={connectAccount} width="full" isDisabled={connectIsDisabled}>
              Connect Wallet
            </Button>
          )}
          <Step number={2} active={step === DropStep.Claim}>
            Claim {data?.metadata?.name ?? 'NFT'}
          </Step>
          {step === DropStep.Claim && (
            <VStack spacing={4}>
              <AuthCode
                length={CODE_LENGTH}
                onChange={(value) => {
                  if (value?.length === CODE_LENGTH) {
                    setCode(value);
                  } else {
                    setCode(undefined);
                  }
                }}
                allowedCharacters="numeric"
                containerClassName={authStyles.container}
                inputClassName={authStyles.input}
              />
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
