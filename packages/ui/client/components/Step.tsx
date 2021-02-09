import { Box, forwardRef, HStack, Text, VStack } from '@chakra-ui/react';
import { isValidMotionProp, motion } from 'framer-motion';
import { PropsWithChildren, ReactNode } from 'react';

// 1. Create a custom motion component from Box
const MotionHStack = motion.custom(
  forwardRef((props, ref) => {
    const chakraProps = Object.fromEntries(
      // do not pass framer props to DOM element
      Object.entries(props).filter(([key]) => !isValidMotionProp(key)),
    );
    return <HStack ref={ref} {...chakraProps} />;
  }),
);

export function Step({
  number,
  children,
  secondary,
  active = false,
  onClick,
}: PropsWithChildren<{
  number: number;
  secondary?: ReactNode;
  active?: boolean;
  onClick?: VoidFunction;
}>) {
  return (
    <MotionHStack
      spacing={4}
      direction="row"
      cursor={onClick ? 'pointer' : undefined}
      onClick={onClick}
      whileTap={onClick ? { scale: 0.9 } : undefined}
      transformOrigin="left center"
      animate={{
        opacity: active ? 1 : 0.3,
        scale: active ? 1 : 0.8,
      }}
    >
      <Text fontWeight="bold" fontSize="3xl" width={4} flexShrink={0}>
        {number}
      </Text>
      <VStack align="stretch" flex={1} spacing={1}>
        <Box>{children}</Box>
        {secondary}
      </VStack>
    </MotionHStack>
  );
}
