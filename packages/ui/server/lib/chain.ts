import { DropGrant, GrantType } from 'common/lib/schemas/DropGrantSchema';
import { ethers } from 'ethers';

import StickersArtifact from '../../../contracts/artifacts/contracts/Stickers.sol/Stickers.json';
import { ERC1155PresetMinterPauser } from '../../../contracts/typechain/ERC1155PresetMinterPauser';
import { Granter } from './granter';

const provider =
  process.env.NODE_ENV === 'development'
    ? new ethers.providers.JsonRpcProvider()
    : new ethers.providers.InfuraProvider(process.env.INFURA_PROJECT_ID);
const signer = new ethers.Wallet(process.env.SIGNER_PRIVATE_KEY, provider);

const EMPTY_DATA = ethers.utils.arrayify(0);

function getContract(address: string) {
  return (new ethers.Contract(
    address,
    StickersArtifact.abi,
    signer,
  ) as unknown) as ERC1155PresetMinterPauser;
}

// verifies that a grant is valid on-chain and will most likely succeed
export async function validateGrantOnChain(granter: Granter, grant: DropGrant, to: string) {
  const contract = getContract(granter.tokenAddress);
  switch (grant.type) {
    case GrantType.Mint: {
      if (!granter.allowFungible) {
        const balances = await contract.balanceOfBatch(
          grant.ids.map(() => to),
          grant.ids,
        );
        if (balances.some((balance) => balance.gte(1))) {
          throw new Error(`Would increase balance too far.`);
        }
      }

      return true;
    }
    case GrantType.Transfer: {
      return true;
    }
    default:
      throw new Error('unreachable');
  }
}

export async function executeGrant(granter: Granter, grant: DropGrant, to: string) {
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