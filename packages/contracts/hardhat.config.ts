import { config } from 'dotenv';
config({ path: '../../.env' });

import "@nomiclabs/hardhat-waffle";
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-solhint";
import "hardhat-typechain";
import { removeConsoleLog } from 'hardhat-preprocessor';
import { HardhatUserConfig, task } from "hardhat/config";

task("accounts", "Prints the list of accounts", async (args, { ethers }) => {
  const accounts = await ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

task('signer', "Prints the signer's address", async (args, {ethers}) => {
  const signer = new ethers.Wallet(process.env.SIGNER_PRIVATE_KEY as string);
  console.log(signer.address);
})

const hardhatConfig: HardhatUserConfig = {
  solidity: {
    version: "0.7.3",
    settings: {
      optimizer: {
        enabled: true,
        runs: 1
      }
    }
  },
  networks: {
    hardhat: {
      // forking: {
      //   url: `https://mainnet.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
      //   blockNumber: 11760686,
      // }
    }
  },
  preprocess: {
    eachLine: removeConsoleLog((bre) => !['hardhat', 'localhost'].includes(bre.network.name)),
  },
};


export default hardhatConfig;
