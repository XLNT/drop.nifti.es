import { CODES } from 'common/lib/codes';
import { Granter } from 'common/lib/granter';
import { DropGrant, DropGrantSchema } from 'common/lib/schemas/DropGrantSchema';
import { DropToken, DropTokenSchema } from 'common/lib/schemas/DropTokenSchema';
import { createValidator } from 'common/lib/validation';
import { decode } from 'jsonwebtoken';

import { validateGrantForGranter } from './chain';
import { getGranter } from './granter';
import { tokenExists, verifyToken } from './token';

const validateTokenWithGrant = createValidator<DropToken>(DropTokenSchema);
const validateGrant = createValidator<DropGrant>(DropGrantSchema);

export async function verifyGrantAndGranter(
  token: string,
): Promise<{ grant: DropGrant; granter: Granter; error?: string }> {
  if (Object.keys(CODES).includes(token)) return CODES[token];

  // token based
  const parsed = decode(token);

  if (!parsed) throw new Error(`This is not a valid drop.nifti.es link!`);

  // NOTE: conditional shortcircuit for type
  if (!validateTokenWithGrant(parsed)) throw new Error('unreachable');

  const granter = await getGranter(parsed.iss);

  // NOTE: this typecast is safe because of validateTokenWithGrant above
  const { grant } = verifyToken(token, granter.publicKey) as DropToken;

  // NOTE: conditional shortcircuit for type
  if (!validateGrant(grant)) throw new Error('unreachable');

  const error = await validateGrantForGranter(granter, grant);
  if (error) return { grant, granter, error };

  const used = await tokenExists(token);
  if (used) return { grant, granter, error: 'This drop has already been claimed.' };

  return { grant, granter };
}
