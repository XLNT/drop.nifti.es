import { Granter } from 'common/lib/granter';
import { DropToken, DropTokenSchema } from 'common/lib/schemas/DropTokenSchema';
import { createValidator } from 'common/lib/validation';
import { decode } from 'jsonwebtoken';
import { getGranter } from 'server/lib/granter';
import { handler, nope, yup } from 'server/lib/handler';
import { tokenExists } from 'server/lib/token';

const validateTokenWithGrant = createValidator<DropToken>(DropTokenSchema);

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

  // TODO: use.nifti.es service
  const metadata = {
    name: 'buddha matt',
    description: 'some really really really really really really really really long description',
    image: 'https://themanymatts.lol/images/buddha.png',
  };

  return yup(res, {
    granter,
    metadata,
    error: used && `This drop has already been claimed.`,
  });
});
