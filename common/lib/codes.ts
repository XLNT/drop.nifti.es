import type { Granter } from './granter';
import type { DropGrant } from './schemas/DropGrantSchema';

export const CODES: Record<string, { grant: DropGrant; granter: Granter }> = {
  toby: {
    grant: {
      id: 'eip155:137/eip721:0x67DFE7A5beEaD6225b68C9A80e8971ad56CDfB60/0',
      amount: '1',
      uri: 'ipfs://QmZPqS2u4TkDHvGhTLMGnaHghVjMjnsAWgpUCkEDCkTNTx',
    },
    granter: {
      name: 'Toby the Cow Dog',
      prefix: '🐕️',
      url: 'https://opensea.io/collection/tobythecowdog',
      tokenAddress: '',
      publicKey: '',
    },
  },
};
