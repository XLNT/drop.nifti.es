import type { NextApiRequest, NextApiResponse } from 'next';
import { executeGrant } from 'server/lib/chain';
import { handler, yup } from 'server/lib/handler';
import { verifyGrantAndGranter } from 'server/lib/verifyGrantAndGranter';

export default handler(async function drop(req: NextApiRequest, res: NextApiResponse) {
  const { grant } = verifyGrantAndGranter('toby', undefined);
  const tx = await executeGrant(grant, req.query.a as string);

  return yup(res, { hash: tx.hash });
});
