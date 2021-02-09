export interface Granter {
  publicKey: string;
  tokenAddress: string;
}

const OOTMM_GRANTER: Granter = {
  publicKey: process.env.OOTMM_PUBLIC_KEY,
  tokenAddress: process.env.STICKERS_ADDRESS,
};

// TODO: look up publicKey by issuer - some type of dashboard to add public keys, idk
export async function getGranter(issuer: string): Promise<Granter> {
  if (issuer === 'ootmm') {
    return OOTMM_GRANTER;
  }

  throw new Error('unreachable');
}
