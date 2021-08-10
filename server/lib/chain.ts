import ERC1155PresetMinterPauserArtifact from 'common/lib/contracts/ERC1155PresetMinterPauser.json';
import { Granter } from 'common/lib/granter';
import { DropGrant, GrantType } from 'common/lib/schemas/DropGrantSchema';
import { BigNumber, ethers } from 'ethers';

const provider =
  process.env.NODE_ENV === 'development'
    ? new ethers.providers.JsonRpcProvider()
    : new ethers.providers.InfuraProvider('mainnet', process.env.NEXT_PUBLIC_INFURA_ID);
const signer = new ethers.Wallet(process.env.SIGNER_PRIVATE_KEY, provider);

const EMPTY_DATA = ethers.utils.arrayify(0);

function getContract(address: string) {
  return new ethers.Contract(address, ERC1155PresetMinterPauserArtifact.abi, signer);
}

// verifies that a grant is valid on-chain and will most likely succeed
export async function validateGrantForGranter(granter: Granter, grant: DropGrant) {
  if (granter.tokenIds) {
    // verify that this granter can manage the token ids in the grant
    const validIds = granter.tokenIds.map((id) => BigNumber.from(id));
    const everyTokenIdIsManageable = grant.ids
      .map((id) => BigNumber.from(id))
      .every((id) => validIds.some((validId) => validId.eq(id)));
    if (!everyTokenIdIsManageable) {
      return `${granter.name} does not have permission to drop ${
        grant.ids.length > 1 ? 'these tokens' : 'this token'
      }.`;
    }
  }

  // const contract = getContract(granter.tokenAddress);

  switch (grant.type) {
    case GrantType.Mint: {
      return;
    }
    case GrantType.Transfer: {
      return;
    }
    default:
      throw new Error('unreachable');
  }
}

export async function executeGrant(
  granter: Pick<Granter, 'tokenAddress'>,
  grant: DropGrant,
  to: string,
) {
  const contract = getContract(granter.tokenAddress);

  switch (grant.type) {
    case GrantType.Mint:
      return await contract.functions.mintBatch(
        to,
        grant.ids,
        grant.amounts,
        grant.data ?? EMPTY_DATA,
      );
    case GrantType.Transfer: {
      return await contract.functions.safeBatchTransferFrom(
        grant.from,
        to,
        grant.ids,
        grant.amounts,
        grant.data ?? EMPTY_DATA,
      );
    }
    default:
      throw new Error('unreachable');
  }
}
