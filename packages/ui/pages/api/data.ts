import { Granter } from 'common/lib/granter';
import { DropGrant, DropGrantSchema } from 'common/lib/schemas/DropGrantSchema';
import { DropToken, DropTokenSchema } from 'common/lib/schemas/DropTokenSchema';
import { createValidator } from 'common/lib/validation';
import { decode } from 'jsonwebtoken';
import { getGranter } from 'server/lib/granter';
import { handler, nope, yup } from 'server/lib/handler';
import { tokenExists, verifyToken } from 'server/lib/token';

// TODO: reduplicate this in ./drop
const validateTokenWithGrant = createValidator<DropToken>(DropTokenSchema);
const validateGrant = createValidator<DropGrant>(DropGrantSchema);

export default handler(async function data(req, res) {
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET') return nope(res, 400, `No ${req.method}. Only GET.`);

  const token = req.query.token as string;

  const used = await tokenExists(token);

  const parsed = decode(token);

  try {
    // conditional shortcircuit for type
    if (!validateTokenWithGrant(parsed)) throw new Error('unreachable');
  } catch (error) {
    return nope(res, 400, error.message);
  }

  let granter: Granter;
  try {
    granter = await getGranter(parsed.iss);
  } catch (error) {
    return nope(res, 400, error.message);
  }

  // this typecast is safe because of validateTokenWithGrant above
  const { grant } = verifyToken(token, granter.publicKey) as DropToken;

  try {
    // conditional shortcircuit for type
    if (!validateGrant(grant)) throw new Error('unreachable');
  } catch (error) {
    return nope(res, 400, error.message);
  }

  const metadatas = await Promise.all(
    grant.ids.map((id) =>
      fetch(
        `https://use.nifti.es/api/${['eip155:1', granter.tokenAddress, id].join('/')}`,
      ).then((response) => response.json()),
    ),
  );

  return yup(res, {
    granter,
    metadatas,
    error: used && `This drop has already been claimed.`,
  });
});
