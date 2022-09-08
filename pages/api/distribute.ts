import { AssetId } from 'caip';
import { GRANTERS } from 'common/lib/granter';
import type { NextApiRequest, NextApiResponse } from 'next';
import { executeGrant, getSigner } from 'server/lib/chain';
import { handler, nope, yup } from 'server/lib/handler';
import { verifyGrantAndGranter } from 'server/lib/verifyGrantAndGranter';

const ISSUER = 'toby';
const addresses = [];

export default handler(async function drop(req: NextApiRequest, res: NextApiResponse) {
  if (process.env.NODE_ENV === 'production') return nope(res, 400, 'not today');

  const assetId = new AssetId(GRANTERS[ISSUER].ids[0]);
  const signer = getSigner('1');

  for (const nameOrAddress of addresses) {
    const address = await signer.resolveName(nameOrAddress);
    const { grant } = verifyGrantAndGranter(ISSUER, assetId.toString());
    const tx = await executeGrant(grant, address);
    console.log(`did grant ${address} ${grant.id} with ${grant.uri} — ${tx.hash}`);
  }

  return yup(res, {});
});
