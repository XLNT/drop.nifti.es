import { Granter } from 'common/lib/granter';
import { ethers } from 'ethers';
import type { NextApiRequest, NextApiResponse } from 'next';
import { authenticator } from 'otplib';
import { executeGrant } from 'server/lib/chain';
import { consumeCodeIfExists } from 'server/lib/codes';
import { handler, nope, yup } from 'server/lib/handler';
import { verifyGrantAndGranter } from 'server/lib/verifyGrantAndGranter';

async function isCodeValid(code: string, granter: Granter) {
  // if generated on-site
  const isValid = authenticator.check(code, granter.secret);
  if (isValid) return true;

  // if generated off-site
  try {
    await consumeCodeIfExists(code, granter.issuer);
    return true;
  } catch {
    return false;
  }
}

export default handler(async function drop(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return nope(res, 400, `<dog fetch meme> No ${req.method}. Only POST.`);

  const args = {
    issuer: req.body.issuer as string,
    assetId: req.body.assetId as string,
    code: req.body.code as string,
    address: req.body.address as string,
  };

  try {
    if (!ethers.utils.isAddress(args.address)) throw new Error('Invalid address');
  } catch (error) {
    return nope(res, 400, error.message);
  }

  const { grant, granter, error } = verifyGrantAndGranter(args.issuer, args.assetId);
  if (error) return nope(res, 400, error);

  const isValid = await isCodeValid(args.code, granter);
  if (!isValid) return nope(res, 400, `${args.code} is an invalid code at this time.`);

  // here we're happy with the input that's been provided and can send off the transaction
  const tx = await executeGrant(grant, args.address);

  return yup(res, { hash: tx.hash });
});
