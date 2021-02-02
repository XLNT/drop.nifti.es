import { makeMessage } from 'common/lib/message';
import type { NextApiRequest, NextApiResponse } from 'next';
import { digestify, recoverAddress } from 'server/lib/proof';
import { verifyToken } from 'server/lib/token';

interface DropGrant {
  tokenId: number;
}

export default function drop(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(400).end();

  const token = req.body.token as string;
  const address = req.body.address as string;
  const signature = req.body.signature as string;

  const message = makeMessage(address);

  // recover proof to get address
  const to = recoverAddress(digestify(message), signature);

  console.log(process.env.OOTMM_PUBLIC_KEY);

  // TODO: look up publicKey by issuer
  // const parsed = decode(token) as Record<string, any>;
  // const issuer = parsed.iss as string;
  const publicKey = process.env.OOTMM_PUBLIC_KEY;

  const payload = verifyToken(token, publicKey);

  console.log(payload);

  // TODO: verify payload against schema, cast to type

  res.status(200).json({ payload });
}
