import { Grant } from 'common/lib/grant';
import { Granter, GRANTERS } from 'common/lib/granter';

export function getGranter(issuer: string): Granter {
  if (!GRANTERS[issuer]) {
    throw new Error(`Invalid issuer — '${issuer}' hasn't registered with drop.nifti.es.`);
  }

  return GRANTERS[issuer];
}

export function validateIdForGranter(granter: Granter, id: string): string | undefined {
  // verify that granter has dominion over this assetId
  if (!granter.ids.includes(id)) {
    return `${granter.name} does not have permission to drop this token.`;
  }
}

// generate a specific grant given an issuer and a specific id
export function getGrantForGranter(granter: Granter, id: string): Grant {
  if (['matt', 'stephenson'].includes(granter.issuer)) {
    return { id, amount: 100 };
  }

  if (granter.issuer === 'toby') {
    return { id, uri: 'ipfs://QmbuBTC7tTRfmto66sMum8X66SGtfRiVNbAvfh35kSqaPh' };
  }

  return { id };
}
