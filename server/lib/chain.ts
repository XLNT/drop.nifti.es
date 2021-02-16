import ERC1155PresetMinterPauserArtifact from 'common/lib/contracts/ERC1155PresetMinterPauser.json';
import { Granter } from 'common/lib/granter';
import { DropGrant, GrantType } from 'common/lib/schemas/DropGrantSchema';
import { ethers } from 'ethers';

const provider =
  process.env.NODE_ENV === 'development'
    ? new ethers.providers.JsonRpcProvider()
    : new ethers.providers.InfuraProvider('mainnet', process.env.INFURA_PROJECT_ID);
const signer = new ethers.Wallet(process.env.SIGNER_PRIVATE_KEY, provider);

const EMPTY_DATA = ethers.utils.arrayify(0);

function getContract(address: string) {
  return new ethers.Contract(address, ERC1155PresetMinterPauserArtifact.abi, signer);
}

// verifies that a grant is valid on-chain and will most likely succeed
export async function validateGrantOnChain(
  granter: Pick<Granter, 'tokenAddress'>,
  grant: DropGrant,
  to: string,
) {
  // const contract = getContract(granter.tokenAddress);

  switch (grant.type) {
    case GrantType.Mint: {
      return true;
    }
    case GrantType.Transfer: {
      return true;
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
