import type { NextApiRequest, NextApiResponse } from 'next';
import { authenticator } from 'otplib';
import { upsertValidCode } from 'server/lib/codes';
import { getGranter } from 'server/lib/granter';
import { handler, nope, yup } from 'server/lib/handler';

export default handler(async function newCode(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return nope(res, 400, `<dog fetch meme> No ${req.method}. Only POST.`);

  const code = req.body.code as string;

  const granter = getGranter(req.body.issuer as string);
  const isValid = authenticator.check(code, granter.secret);

  if (!isValid) return nope(res, 400, 'nope.');

  await upsertValidCode(code, granter.issuer);

  return yup(res, { code });
});
