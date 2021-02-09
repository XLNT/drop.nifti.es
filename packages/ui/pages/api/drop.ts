import { makeMessage } from 'common/lib/message';
import { DropArguments, DropArgumentsSchema } from 'common/lib/schemas/DropArgumentsSchema';
import { DropGrant, DropGrantSchema } from 'common/lib/schemas/DropGrantSchema';
import { DropToken, DropTokenSchema } from 'common/lib/schemas/DropTokenSchema';
import { createValidator } from 'common/lib/validation';
import { decode } from 'jsonwebtoken';
import type { NextApiRequest, NextApiResponse } from 'next';
import { executeGrant, validateGrantOnChain } from 'server/lib/chain';
import { getGranter } from 'server/lib/granter';
import { handler, nope, yup } from 'server/lib/handler';
import { digestify, recoverAddress } from 'server/lib/proof';
import { verifyToken } from 'server/lib/token';

const validateArgs = createValidator<DropArguments>(DropArgumentsSchema);
const validateTokenWithGrant = createValidator<DropToken>(DropTokenSchema);
const validateGrant = createValidator<DropGrant>(DropGrantSchema);

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

  // recover proof to get address
  const message = makeMessage(args.address);
  const to = recoverAddress(digestify(message), args.signature);

  const parsed = decode(args.token);

  try {
    // conditional shortcircuit for type
    if (!validateTokenWithGrant(parsed)) throw new Error('unreachable');
  } catch (error) {
    return nope(res, 400, error.message);
  }

  const granter = await getGranter(parsed.iss);

  // this typecast is safe because of validateTokenWithGrant above
  const { grant } = verifyToken(args.token, granter.publicKey) as DropToken;

  try {
    // conditional shortcircuit for type
    if (!validateGrant(grant)) throw new Error('unreachable');
  } catch (error) {
    return nope(res, 400, error.message);
  }

  try {
    // conditional shortcircuit for type
    if (!validateGrantOnChain(granter, grant, to)) throw new Error('unreachable');
  } catch (error) {
    return nope(res, 400, error.message);
  }

  // here we're happy with the input that's been provided and can send off the transaction
  const tx = await executeGrant(granter, grant, to);

  return yup(res, { hash: tx.hash });
});
