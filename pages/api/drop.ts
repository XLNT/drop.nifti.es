import { makeMessage } from 'common/lib/message';
import { DropArguments, DropArgumentsSchema } from 'common/lib/schemas/DropArgumentsSchema';
import { createValidator } from 'common/lib/validation';
import type { NextApiRequest, NextApiResponse } from 'next';
import { executeGrant } from 'server/lib/chain';
import { handler, nope, yup } from 'server/lib/handler';
import { digestify, recoverAddress } from 'server/lib/proof';
import { lockToken } from 'server/lib/token';
import { verifyGrantAndGranter } from 'server/lib/verifyGrantAndGranter';

const validateArgs = createValidator<DropArguments>(DropArgumentsSchema);

export default handler(async function drop(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return nope(res, 400, `<dog fetch meme> No ${req.method}. Only POST.`);

  const args = {
    token: req.body.token as string,
    address: req.body.address as string,
    signature: req.body.signature as string,
  };

  try {
    // conditional shortcircuit for type
    if (!validateArgs(args)) throw new Error('unreachable');
  } catch (error) {
    return nope(res, 400, error.message);
  }

  const { grant, granter, error } = await verifyGrantAndGranter(args.token);
  if (error) return nope(res, 400, error);

  // recover proof to get address
  const message = makeMessage(args.address);
  const to = recoverAddress(digestify(message), args.signature);

  // here we're happy with the input that's been provided and can send off the transaction
  const tx = await executeGrant(granter, grant, to);

  // lock the token after the tx is broadcast
  await lockToken(args.token);

  return yup(res, { hash: tx.hash });
});
