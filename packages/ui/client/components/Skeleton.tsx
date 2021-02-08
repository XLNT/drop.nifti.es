import { chakra, keyframes } from '@chakra-ui/react';

const shimmer = keyframes`
  0% {
    background-position: 200% 0;
  }

  100% {
    background-position: -200% 0;
  }
`;

export const Skeleton = chakra('div', {
  baseStyle: {
    borderRadius: 4,
    backgroundImage: 'linear-gradient(270deg, #fafafa, #eaeaea, #eaeaea, #fafafa)',
    backgroundSize: '400% 100%',
    animation: `${shimmer} 8s ease-in-out infinite`,
  },
});
