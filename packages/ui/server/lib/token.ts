import { verify } from 'jsonwebtoken';

export const AUDIENCE = 'drop.nifti.es';

// verify that the token is from a specific publicKey, and for us
export function verifyToken(token: string, publicKey: string | Buffer) {
  return verify(token, publicKey, {
    algorithms: ['ES256'],
    audience: AUDIENCE,
  });
}
