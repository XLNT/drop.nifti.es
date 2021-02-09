import { query as q } from 'faunadb';
import { verify } from 'jsonwebtoken';

import { client } from './db';

export const AUDIENCE = 'drop.nifti.es';

// verify that the token is from a specific publicKey, and for us
export function verifyToken(token: string, publicKey: string | Buffer) {
  return verify(token, publicKey, {
    algorithms: ['ES256'],
    audience: AUDIENCE,
  });
}

export async function tokenExists(token: string) {
  return client.query<boolean>(q.Exists(q.Match(q.Index('tokens_uniq'), token)));
}

export async function lockToken(token: string): Promise<void> {
  const result = client.query<null | { data: { token: string } }>(
    q.If(
      q.Exists(q.Match(q.Index('tokens_uniq'), token)),
      null,
      q.Create(q.Collection('tokens'), { data: { token } }),
    ),
  );

  if (result === null) {
    // already exists (and therefore claimed, throw)
    throw new Error('This token has already been claimed');
  }

  return;
}
