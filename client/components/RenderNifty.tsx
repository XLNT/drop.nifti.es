import { Box, Heading, Image, Text, VStack } from '@chakra-ui/react';
import { NftMetadata } from '@zoralabs/nft-metadata';
import { useMemo } from 'react';

import { Skeleton } from './Skeleton';

function RenderNiftyAsset({
  metadata,
  ...delegated
}: { metadata: NftMetadata } & Record<string, any>) {
  const alt = useMemo(
    () => [metadata?.name, metadata?.description].filter(Boolean).join(' — '),
    [metadata],
  );

  if (!metadata) {
    return <Skeleton {...delegated} />;
  }

  if (metadata.imageURLMimeType.startsWith('video/')) {
    return (
      <Box as="video" objectFit="contain" objectPosition="center" autoPlay muted controls>
        <source src={metadata.imageURL} type={metadata.imageURLMimeType} />
      </Box>
    );
  }

  return (
    <Image
      src={metadata.imageURL}
      alt={alt}
      objectFit="contain"
      objectPosition="center"
      {...delegated}
    />
  );
}

export function RenderNifty({ metadata }: { metadata: NftMetadata }) {
  return (
    <VStack align="stretch" spacing={4}>
      <RenderNiftyAsset height={[48, 64]} metadata={metadata} />

      {metadata?.name ? (
        <Heading as="span" fontSize="lg">
          {metadata?.name}
        </Heading>
      ) : (
        <Skeleton height={4} width="50%" />
      )}

      {metadata?.description ? (
        <Text as="span" fontSize="base">
          {metadata?.description}
        </Text>
      ) : (
        <Skeleton height={4} width="full" />
      )}
    </VStack>
  );
}
