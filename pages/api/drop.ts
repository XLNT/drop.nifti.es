import { DropArguments, DropArgumentsSchema } from 'common/lib/schemas/DropArgumentsSchema';
import { createValidator } from 'common/lib/validation';
import { ethers } from 'ethers';
import type { NextApiRequest, NextApiResponse } from 'next';
import { executeGrant } from 'server/lib/chain';
import { handler, nope, yup } from 'server/lib/handler';
import { lockToken } from 'server/lib/token';
import { verifyGrantAndGranter } from 'server/lib/verifyGrantAndGranter';

const validateArgs = createValidator<DropArguments>(DropArgumentsSchema);

export default handler(async function drop(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return nope(res, 400, `<dog fetch meme> No ${req.method}. Only POST.`);

  const args = {
    token: req.body.token as string,
    address: req.body.address as string,
  };

  try {
    // conditional shortcircuit for type
    if (!validateArgs(args)) throw new Error('unreachable');
    if (!ethers.utils.isAddress(args.address)) throw new Error('Invalid address');
  } catch (error) {
    return nope(res, 400, error.message);
  }

  const { grant, granter, error } = await verifyGrantAndGranter(args.token);
  if (error) return nope(res, 400, error);

  // here we're happy with the input that's been provided and can send off the transaction
  const tx = await executeGrant(granter, grant, args.address);

  // lock the token after the tx is broadcast
  await lockToken(args.token);

  return yup(res, { hash: tx.hash });
});
