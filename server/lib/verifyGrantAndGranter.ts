import { Grant } from 'common/lib/grant';
import { Granter } from 'common/lib/granter';

import { getGranter, getGrantForGranter, validateIdForGranter } from './granter';

export function verifyGrantAndGranter(
  issuer: string,
  assetId: string,
): { grant: Grant; granter: Granter; error?: string } {
  // pull granter info
  const granter = getGranter(issuer);

  // default to first id
  const id = !assetId ? granter.ids[0] : assetId;
  // validate that this granter can grant to this id
  const error = validateIdForGranter(granter, id);
  // construct a grant for that id
  const grant = getGrantForGranter(granter, id);

  return { grant, granter, error };
}
