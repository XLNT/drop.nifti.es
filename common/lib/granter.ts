export interface Granter {
  publicKey: string;
  tokenAddress: string;
  tokenIds?: string[];
  prefix: string;
  name: string;
  url: string;
}
