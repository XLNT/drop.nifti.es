import { Box, Center, HStack, Link, Portal, Text, VStack } from '@chakra-ui/react';
import { Granter } from 'common/lib/granter';
import { PropsWithChildren, ReactNode } from 'react';

import { Pill } from './Pill';

export function DropLayout({
  children,
  footer,
  granter,
}: PropsWithChildren<{ footer: ReactNode; granter?: Pick<Granter, 'prefix' | 'name' | 'url'> }>) {
  return (
    <>
      {footer && (
        <Portal>
          <Center
            position="fixed"
            bottom="0"
            borderTopWidth="1px"
            borderTopColor="smudge"
            width="full"
            p={4}
            bg="drywall"
          >
            <Box width="full" maxWidth="2xl">
              {footer}
            </Box>
          </Center>
        </Portal>
      )}
      <VStack align="stretch" mx="auto" maxWidth="2xl" pt={4} pb={24} px={6}>
        <HStack as="header" justify="space-between" wrap="wrap" spacing={1}>
          <Text py={2}>
            {granter && (
              <Link href={granter.url} isExternal>
                <Pill prefix={granter.prefix}>{granter.name}</Pill>
              </Link>
            )}
          </Text>
          <HStack py={2} spacing={1}>
            <Text as="span" fontSize="xs" fontFamily="mono">
              powered by
            </Text>
            <Link href="/" isExternal>
              <Pill prefix="📦">drop.nifti.es</Pill>
            </Link>
          </HStack>
        </HStack>
        <VStack as="main" align="stretch">
          {children}
        </VStack>
      </VStack>
    </>
  );
}
