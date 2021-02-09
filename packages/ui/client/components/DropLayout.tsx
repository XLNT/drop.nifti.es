import { Box, Center, HStack, Link, Portal, Text, VStack } from '@chakra-ui/react';
import { PropsWithChildren, ReactNode } from 'react';

import { Pill } from './Pill';

export function DropLayout({ children, footer }: PropsWithChildren<{ footer: ReactNode }>) {
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
        <HStack justify="space-between" wrap="wrap" spacing={1}>
          {/* TODO: granter whitelabel */}
          <Text py={2}>
            <Link href="https://themanymatts.lol">
              <Pill prefix="✋">themanymatts</Pill>
            </Link>
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
        <VStack align="stretch">{children}</VStack>
      </VStack>
    </>
  );
}
