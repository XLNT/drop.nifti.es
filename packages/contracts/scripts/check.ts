import { deployments, ethers } from 'hardhat';
import { Deployment } from 'hardhat-deploy/types';

import { Stickers } from '../typechain/Stickers';

const address = '0xEC6d36A487d85CF562B7b8464CE8dc60637362AC';
const id = 0;

async function main() {
  const Stickers: Deployment = await deployments.get('Stickers');
  console.log(`querying stickers at ${Stickers.address}`);
  const stickers = (new ethers.Contract(
    Stickers.address,
    Stickers.abi,
    ethers.provider,
  ) as unknown) as Stickers;

  const balance = await stickers.functions.balanceOf(address, id);

  console.log(`balance of ${address} for tokenId ${id} is ${balance}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
