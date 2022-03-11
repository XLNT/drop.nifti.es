import { AssetId } from 'caip';
import { Grant } from 'common/lib/grant';
import { DefenderRelayProvider, DefenderRelaySigner } from 'defender-relay-client/lib/ethers';
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

function getCredentials(chainId: string) {
  switch (chainId) {
    case '1':
      return { apiKey: process.env.RELAY_KEY_MAINNET, apiSecret: process.env.RELAY_SECRET_MAINNET };
    case '137':
      return { apiKey: process.env.RELAY_KEY_POLYGON, apiSecret: process.env.RELAY_SECRET_POLYGON };
    default:
      throw new Error(`Invalid chainId: ${chainId}`);
  }
}

export async function executeGrant(grant: Grant, to: string) {
  const assetId = new AssetId(grant.id);
  const credentials = getCredentials(assetId.chainId.reference);
  const provider = new DefenderRelayProvider(credentials);
  const signer = new DefenderRelaySigner(credentials, provider, { speed: 'fast' });
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
