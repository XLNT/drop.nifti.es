import { query as q } from 'faunadb';

import { client } from './db';

export interface Granter {
  publicKey: string;
  tokenAddress: string;
}

// TODO: look up publicKey by issuer - some type of dashboard to add public keys, idk
export async function getGranter(issuer: string): Promise<Granter> {
  try {
    const result = await client.query<{ data: Granter }>(
      q.Get(q.Match(q.Index('granters_by_issuer'), issuer)),
    );

    return result.data;
  } catch (error) {
    throw new Error(`Invalid issuer — '${issuer}' hasn't registered with drop.nifti.es.`);
  }
}
