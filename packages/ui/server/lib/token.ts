import { verify } from 'jsonwebtoken';

export function verifyToken(token: string, signer) {
  return verify(token, process.env.JWT_SECRET);
}
