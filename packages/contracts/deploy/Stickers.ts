import { DeployFunction, DeployResult } from 'hardhat-deploy/types';

const uri = `https://themanymatts.lol/sticker/{id}.json`;

const main: DeployFunction = async function ({
  getNamedAccounts,
  deployments,
  getChainId,
  getUnnamedAccounts,
  ethers,
}) {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  const result: DeployResult = await deploy('Stickers', {
    from: deployer,
    args: [uri],
  });

  if (result.newlyDeployed) {
    console.log(`deployed at ${result.address} using ${result.receipt?.gasUsed} gas`);
  }
};

export default main;
