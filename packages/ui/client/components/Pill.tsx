import { Text } from '@chakra-ui/react';
import { PropsWithChildren, ReactNode } from 'react';

export function Pill({ prefix, children }: PropsWithChildren<{ prefix: ReactNode }>) {
  return (
    <Text as="span" bg="smudge" px="1" borderRadius={4} textStyle="highlightable">
      {prefix}&nbsp;{children}
    </Text>
  );
}
