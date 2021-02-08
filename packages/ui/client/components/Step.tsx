import { Box, forwardRef, HStack, Text } from '@chakra-ui/react';
import { isValidMotionProp, motion } from 'framer-motion';
import { PropsWithChildren } from 'react';

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
  active = false,
  onClick,
}: PropsWithChildren<{ number: number; active?: boolean; onClick: VoidFunction }>) {
  return (
    <MotionHStack
      direction="row"
      onClick={onClick}
      whileTap={onClick ? { scale: 0.9 } : undefined}
      transformOrigin="left center"
      animate={{
        opacity: active ? 1 : 0.3,
        scale: active ? 1 : 0.8,
      }}
    >
      <Text fontWeight="bold" fontSize="3xl" width={8}>
        {number}
      </Text>
      <Box flex={1}>{children}</Box>
    </MotionHStack>
  );
}
