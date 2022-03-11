import { AssetId } from 'caip';
import { Grant } from 'common/lib/grant';
import { ethers, Signer } from 'ethers';

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

export async function executeGrant(grant: Grant, to: string) {
  const assetId = new AssetId(grant.id);
  const provider = new ethers.providers.InfuraProvider(
    parseInt(assetId.chainId.reference),
    process.env.NEXT_PUBLIC_INFURA_PROJECT_ID,
  );
  const signer = new ethers.Wallet(process.env.SIGNER_PRIVATE_KEY, provider);
  const contract = getContract(assetId.assetName.reference, signer);

  console.log(assetId.chainId.reference, to, grant.uri, contract.address);

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
