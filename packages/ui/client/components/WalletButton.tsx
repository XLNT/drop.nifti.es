import { Button } from '@chakra-ui/react';
import type { IMobileRegistryEntry } from '@walletconnect/types';
import { ComponentPropsWithoutRef, useMemo } from 'react';

function formatIOSMobile(uri: string, entry: IMobileRegistryEntry) {
  const encodedUri: string = encodeURIComponent(uri);
  return entry.universalLink
    ? `${entry.universalLink}/wc?uri=${encodedUri}`
    : entry.deepLink
    ? `${entry.deepLink}${entry.deepLink.endsWith(':') ? '//' : '/'}wc?uri=${encodedUri}`
    : '';
}

export function WalletButton({
  entry,
  uri,
  ...delegated
}: {
  entry: IMobileRegistryEntry;
  uri: string;
} & ComponentPropsWithoutRef<typeof Button>) {
  const href = useMemo(() => formatIOSMobile(uri, entry), [uri, entry]);

  // <div
  //   style={{
  //     background: `url('${entry.logo}') ${entry.color}`,
  //     backgroundSize: '100%',
  //     height: '4rem',
  //     width: '4rem',
  //   }}
  // />;

  return (
    <Button {...delegated} as="a" href={href} rel="noopener noreferrer" target="_blank">
      Download or Connect {entry.name}
    </Button>
  );
}
