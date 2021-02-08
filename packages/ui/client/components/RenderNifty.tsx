import { Box, BoxProps, Center, forwardRef, Heading, Image, Text, VStack } from '@chakra-ui/react';
import { providers } from 'ethers';
import { ElementType, useMemo } from 'react';

import { Skeleton } from './Skeleton';

interface ERC1155Metadata {
  name?: string;
  description?: string;
  image?: string;
}

interface RenderWithProviderProps {
  contractAddress: string;
  tokenId: string;
  provider: providers.Provider;
}

interface RenderWithMetadataProps {
  metadata: ERC1155Metadata;
}

type RenderNiftyProps = RenderWithProviderProps | RenderWithMetadataProps;

const isMetadataProps = (props: any): props is RenderWithMetadataProps => !!props.metadata;

interface MetadataResult {
  metadata: ERC1155Metadata;
  loading: boolean;
  error: Error;
}

function useMetadata(props: RenderNiftyProps): MetadataResult {
  if (isMetadataProps(props)) {
    return { metadata: props.metadata, loading: false, error: undefined };
  }

  // TODO: do some fetching
}

enum NiftyType {
  Image,
}

interface RenderImageNiftyData {
  type: NiftyType.Image;
  image: string;
}

type RenderNiftyData = RenderImageNiftyData;

interface NiftyResult {
  data?: RenderNiftyData;
  metadata?: ERC1155Metadata;
  loading: boolean;
  error: Error;
}

function useNifty(props: RenderNiftyProps): NiftyResult {
  const { metadata, loading, error } = useMetadata(props);

  if (metadata?.image) {
    return { data: { type: NiftyType.Image, image: metadata.image }, metadata, loading, error };
  }

  return { loading, error };
}

const RenderNiftyAsset = forwardRef<{ result: NiftyResult }, ElementType<any>>(
  function RenderNiftyAsset({ result: { data, metadata, loading, error }, ...delegated }, ref) {
    const alt = useMemo(() => [metadata?.name, metadata?.description].filter(Boolean).join(' — '), [
      metadata,
    ]);

    if (error) {
      return <Box ref={ref} bg="smudge" {...delegated} />;
    }

    if (loading) {
      return <Skeleton ref={ref} {...delegated} />;
    }

    switch (data.type) {
      case NiftyType.Image:
        return <Image ref={ref} src={data.image} alt={alt} {...delegated} />;
      default:
        throw new Error(`Unknown nifty type: ${data.type}`);
    }
  },
);

export function RenderNifty(props: RenderNiftyProps) {
  const result = useNifty(props);

  return (
    <VStack spacing={4} align="stretch">
      <Center>
        <RenderNiftyAsset height={64} result={result} />
      </Center>

      {result.metadata?.name ? (
        <Heading as="span" fontSize="lg">
          {result.metadata?.name}
        </Heading>
      ) : (
        <Skeleton height={4} width="full" />
      )}

      {result.metadata?.description ? (
        <Text as="span" fontSize="base">
          {result.metadata?.description}
        </Text>
      ) : (
        <Skeleton height={4} width="full" />
      )}
    </VStack>
  );
}
