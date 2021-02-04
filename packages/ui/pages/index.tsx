import {
  Code,
  Divider,
  Heading,
  Link,
  ListItem,
  OrderedList,
  Text,
  UnorderedList,
  VStack,
} from '@chakra-ui/react';
import { Pill } from 'client/components/Pill';
import { useDrops } from 'client/lib/useDrops';
import { useMemo } from 'react';

export default function Home() {
  const container = useMemo(
    () => (typeof window !== 'undefined' ? window.document.body : undefined),
    [],
  );
  useDrops(container, { variants: ['📦', '🚚', '🎉', '📦'], tick: 50 });

  return (
    <VStack minHeight="100vh" py={16} spacing={16} width="full" maxWidth="2xl" mx="auto">
      <VStack px={8} spacing={16} align="start">
        <Heading as="h1" fontSize={['2xl', '3xl', '4xl', '5xl']}>
          📦 drop.nifti.es
        </Heading>
        <Heading as="h2" fontSize={['md', 'lg', 'xl']} lineHeight="tall">
          <Pill prefix="📦">Drops</Pill>, <Pill prefix="🚚">digital delivery</Pill>, and{' '}
          <Pill prefix="↪">distribution</Pill>
          <br />
          for ERC1155 tokens.
        </Heading>
        <VStack align="start">
          <Heading as="span" fontSize="md" lineHeight="normal">
            Literally just the easiest way to distribute ERC1155 assets to users, whether
            they&apos;re familiar with blockchain or not.
          </Heading>
          <Heading as="span" fontSize="md" lineHeight="normal">
            Use it to drop memorabilia like{' '}
            <Link href="https://themanymatts.lol" isExternal>
              themanymatts
            </Link>
            , deliver digital merchandise during a{' '}
            <Link href="https://softspot.art" isExternal>
              Softspot
            </Link>{' '}
            event, or distribute token rewards to your users.
          </Heading>
          <Heading as="span" fontSize="md" lineHeight="normal" fontWeight="normal">
            drop.nifti.es uses the{' '}
            <Link href="https://opengsn.org" isExternal>
              Open Gas Network
            </Link>{' '}
            for gas-less metatransactions <sup>🔜</sup>.
          </Heading>
        </VStack>
      </VStack>
      <Divider />
      <VStack px={8} spacing={8} align="start">
        <Heading as="h4" fontSize="base">
          integrate drop.nifti.es in three steps <sup>🔜</sup>
        </Heading>
        <OrderedList spacing={4}>
          <ListItem>
            Tell drop.nifti.es about your contract and verified signer
            <UnorderedList>
              <ListItem>
                deploy an ERC1155 contract with minting capabilities <sup>(if necessary)</sup>
              </ListItem>
              <ListItem>link your signer and ERC1155 contract here on drop.nifti.es.</ListItem>
              <ListItem>
                allow drop.nifti.es to mint and transfer assets <sup>(if necessary)</sup>
              </ListItem>
              <ListItem>
                fund the{' '}
                <Link href="https://opengsn.org" isExternal>
                  Gas Station Network&apos;s RelayHub
                </Link>{' '}
                to pay for you user&apos;s gas.
              </ListItem>
            </UnorderedList>
          </ListItem>
          <ListItem>
            Sign a JWT — drop.nifti.es supports minting and transfering 1155 assets
            <UnorderedList>
              <ListItem>
                like <Code>{`{ type: 'mint', ids: [1], amounts: [1] }`}</Code>
              </ListItem>
              <ListItem>
                or <Code>{`{ type: 'transfer', ids: [2, 6], amounts: [1, 7] }`}</Code>
              </ListItem>
            </UnorderedList>
          </ListItem>
          <ListItem>
            Forward that link to your beneficiary
            <UnorderedList>
              <ListItem>
                <Code>{`https://drop.nifti.es/:token`}</Code>
              </ListItem>
            </UnorderedList>
          </ListItem>
        </OrderedList>
      </VStack>
      <Divider />
      <VStack align="start" spacing={16} px={8}>
        <Text textStyle="highlightable" lineHeight="taller">
          📦 drop.nifi.es is a{' '}
          <Link href="https://nifti.es" isExternal>
            <Pill prefix="❏">nifti.es</Pill>
          </Link>{' '}
          project by
          <Link href="https://twitter.com/mattgcondon" isExternal>
            <Pill prefix="🐦">Matt Condon</Pill>
          </Link>{' '}
          for{' '}
          <Link href="https://themanymatts.lol" isExternal>
            <Pill prefix="✋">themanymatts</Pill>.
          </Link>{' '}
          and{' '}
          <Link href="https://softspot.art" isExternal>
            <Pill prefix="✺">Softspot</Pill>
          </Link>
          . You can view, edit, and audit the code on{' '}
          <Link href="https://github.com/xlnt/drop.nifti.es" isExternal>
            <Pill prefix="📄">GitHub</Pill>
          </Link>
          .
        </Text>
      </VStack>
    </VStack>
  );
}
