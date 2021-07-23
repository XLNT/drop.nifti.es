import { Box, HStack, Link, VStack } from '@chakra-ui/react';
import { Granter } from 'common/lib/granter';
import { PropsWithChildren } from 'react';

import { Pill } from './Pill';

export function DropLayout({
  children,
  granter,
}: PropsWithChildren<{ granter?: Pick<Granter, 'prefix' | 'name' | 'url'> }>) {
  return (
    <VStack align="stretch" mx="auto" maxWidth="2xl" pt={4} pb={24} px={6}>
      <HStack as="header" justify="space-between" wrap="wrap" spacing={1}>
        <Box>
          {granter && (
            <Link href={granter.url} isExternal>
              <Pill prefix={granter.prefix}>{granter.name}</Pill>
            </Link>
          )}
        </Box>
        <Link href="/" isExternal>
          <Pill prefix="📦">drop.nifti.es</Pill>
        </Link>
      </HStack>
      <VStack as="main" align="stretch">
        {children}
      </VStack>
    </VStack>
  );
}
