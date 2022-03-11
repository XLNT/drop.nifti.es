export interface Granter {
  issuer: string;
  ids: string[];
  prefix: string;
  name: string;
  url: string;
}

export const GRANTERS: Record<string, Granter> = {
  matt: {
    issuer: 'matt',
    ids: [
      'eip155:1/eip1155:0x28959Cf125ccB051E70711D0924a62FB28EAF186/0',
      'eip155:1/eip1155:0x28959Cf125ccB051E70711D0924a62FB28EAF186/1',
      'eip155:1/eip1155:0x28959Cf125ccB051E70711D0924a62FB28EAF186/2',
      'eip155:1/eip1155:0x28959Cf125ccB051E70711D0924a62FB28EAF186/3',
      'eip155:1/eip1155:0x28959Cf125ccB051E70711D0924a62FB28EAF186/5',
    ],
    prefix: '✋',
    name: 'themanymatts',
    url: 'https://themanymatts.lol',
  },
  stephenson: {
    issuer: 'stephenson',
    ids: ['eip155:1/eip1155:0x28959Cf125ccB051E70711D0924a62FB28EAF186/4'],
    prefix: '✋',
    name: 'Matt Stephenson',
    url: 'https://themanymatts.lol',
  },
  toby: {
    issuer: 'toby',
    ids: ['eip155:137/eip721:0x67DFE7A5beEaD6225b68C9A80e8971ad56CDfB60/0'],
    prefix: '🐕️',
    name: 'Toby the Cow Dog',
    url: 'https://opensea.io/collection/tobythecowdog',
  },
};
