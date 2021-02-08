import { Box, Center, HStack, Portal, VStack } from '@chakra-ui/react';
import { PropsWithChildren, ReactNode } from 'react';

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
          >
            <Box width="full" maxWidth="2xl">
              {footer}
            </Box>
          </Center>
        </Portal>
      )}
      <VStack align="stretch" mx="auto" maxWidth="2xl" py={16} px={8}>
        <HStack justify="space-between">hey</HStack>
        {children}
      </VStack>
    </>
  );
}
