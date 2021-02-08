import {
  Box,
  Code,
  Divider,
  Heading,
  Link,
  ListItem,
  OrderedList,
  Portal,
  Text,
  UnorderedList,
  VStack,
} from '@chakra-ui/react';
import { Pill } from 'client/components/Pill';
import { useDrops } from 'client/lib/useDrops';
import { useState } from 'react';

export default function Home() {
  const [container, setContainer] = useState<HTMLDivElement>();
  useDrops(container, { variants: ['📦', '🚚', '🎉', '📦'], tick: 50 });

  return (
    <>
      <Portal>
        <Box
          ref={setContainer}
          position="fixed"
          top={0}
          left={0}
          height="full"
          width="full"
          pointerEvents="none"
        />
      </Portal>
      <VStack minHeight="100vh" py={16} spacing={16} width="full" maxWidth="2xl" mx="auto">
        <VStack px={8} spacing={16} align="start">
          <Heading as="h1" fontSize={['2xl', '3xl', '4xl', '5xl']}>
            📦 drop.nifti.es
          </Heading>
          <Heading as="h2" fontSize={['md', 'lg', 'xl']} lineHeight="tall">
            <Pill prefix="📦">Drops</Pill>, <Pill prefix="🚚">digital delivery</Pill>, and{' '}
            <Pill prefix="↪">distribution</Pill> for ERC1155 tokens.
          </Heading>
          <VStack align="start" spacing={4}>
            <Heading as="span" fontSize="md" lineHeight="normal">
              Literally just the easiest way to distribute ERC1155 assets to users, whether
              they&apos;re familiar with blockchain or not.
            </Heading>
            <Heading as="span" fontSize="md" lineHeight="tall" fontWeight="normal">
              Use it to drop memorabilia like{' '}
              <Link href="https://themanymatts.lol" isExternal>
                <Pill prefix="✋">themanymatts</Pill>
              </Link>{' '}
              , deliver digital merchandise during a{' '}
              <Link href="https://softspot.art" isExternal>
                <Pill prefix="✺">Softspot</Pill>
              </Link>{' '}
              event, or distribute token rewards to your users.
            </Heading>
            <Heading as="span" fontSize="md" lineHeight="normal" fontWeight="normal">
              drop.nifti.es uses <sup>(🔜)</sup> the{' '}
              <Link href="https://opengsn.org" isExternal>
                Open Gas Network
              </Link>{' '}
              for gas-less metatransactions.
            </Heading>
          </VStack>
        </VStack>
        <Divider />
        <VStack px={8} spacing={8} align="start">
          <Heading as="h4" fontSize="base" lineHeight="tall" fontWeight="normal">
            drop.nifti.es is an alpha release – if you&apos;d like to use it, bug{' '}
            <Link href="https://twitter.com/mattgcondon" isExternal>
              <Pill prefix="🐦">@mattgcondon</Pill>
            </Link>{' '}
            on twitter
          </Heading>
          <Heading as="h4" fontSize="base" lineHeight="tall">
            integrate drop.nifti.es in three steps <sup>🔜</sup>
          </Heading>
          <OrderedList spacing={4}>
            <ListItem>
              Connect drop.nifti.es to your contract,
              <UnorderedList>
                <ListItem>
                  deploy an ERC1155 contract with minting capabilities <sup>(if necessary)</sup>
                </ListItem>
                <ListItem>link your signer and ERC1155 contract here on drop.nifti.es.</ListItem>
                <ListItem>
                  allow drop.nifti.es to mint and transfer assets with
                  <Code>setApprovalForAll(...)</Code> <sup>(if necessary)</sup>
                </ListItem>
                <ListItem>
                  fund the{' '}
                  <Link href="https://opengsn.org" isExternal>
                    Gas Station Network&apos;s RelayHub
                  </Link>{' '}
                  to pay for your users&apos; gas.
                </ListItem>
              </UnorderedList>
            </ListItem>
            <ListItem>
              Sign a JWT — drop.nifti.es supports minting and transfering ERC1155 assets
              <UnorderedList>
                <ListItem>
                  mint: <Code>{`{ type: 'mint', ids: [1], amounts: [1] }`}</Code>
                </ListItem>
                <ListItem>
                  transfer: <Code>{`{ type: 'transfer', ids: [2, 6], amounts: [1, 7] }`}</Code>
                </ListItem>
              </UnorderedList>
            </ListItem>
            <ListItem>
              Forward a link to your beneficiary, perhaps in a nice email or something
              <UnorderedList>
                <ListItem>
                  <Code>{`https://drop.nifti.es/:token`}</Code>
                </ListItem>
              </UnorderedList>
            </ListItem>
            <ListItem>That&apos;s it.</ListItem>
          </OrderedList>
        </VStack>
        <Divider />
        <VStack align="start" spacing={8} px={8}>
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
              <Pill prefix="📂">GitHub</Pill>
            </Link>
            .
          </Text>
        </VStack>
      </VStack>
    </>
  );
}
