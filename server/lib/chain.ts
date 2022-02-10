import { AssetId } from 'caip';
import { Granter } from 'common/lib/granter';
import { DropGrant } from 'common/lib/schemas/DropGrantSchema';
import { BigNumber, ethers, Signer } from 'ethers';
import { getAddress } from 'ethers/lib/utils';

const EMPTY_DATA = ethers.utils.arrayify(0);

function getContract(address: string, signer: Signer) {
  return new ethers.Contract(
    address,
    [
      `function mintBatch(address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data) public`,
      `function mint(address to, string memory uri) public`,
    ],
    signer,
  );
}

// verifies that a grant is valid on-chain and will most likely succeed
export async function validateGrantForGranter(granter: Granter, grant: DropGrant) {
  const assetId = new AssetId(grant.id);

  // verify that granter has dominion over this tokenContract
  if (getAddress(granter.tokenAddress) !== getAddress(assetId.assetName.reference)) {
    return `${granter.name} does not have permission to drop this token.`;
  }

  if (granter.tokenIds) {
    // verify that this granter can manage the token ids in the grant
    const tokenId = BigNumber.from(assetId.tokenId);
    const validIds = granter.tokenIds.map((id) => BigNumber.from(id));
    const canManageTokenId = validIds.some((validId) => validId.eq(tokenId));

    if (!canManageTokenId) {
      return `${granter.name} does not have permission to drop this token.`;
    }
  }
}

export async function executeGrant(grant: DropGrant, to: string) {
  const assetId = new AssetId(grant.id);
  const provider = new ethers.providers.InfuraProvider(
    parseInt(assetId.chainId.reference),
    process.env.NEXT_PUBLIC_INFURA_PROJECT_ID,
  );
  const signer = new ethers.Wallet(process.env.SIGNER_PRIVATE_KEY, provider);
  const contract = getContract(assetId.assetName.reference, signer);

  switch (assetId.assetName.namespace) {
    case 'eip721': {
      return await contract.functions.mint(to, grant.uri);
    }
    case 'eip1155': {
      return await contract.functions.mintBatch(
        to, //
        [assetId.tokenId],
        [grant.amount],
        EMPTY_DATA,
      );
    }
  }
}
