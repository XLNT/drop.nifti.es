import { config } from 'dotenv';
config({ path: '../../.env' });

import "@nomiclabs/hardhat-waffle";
import { HardhatUserConfig, task } from "hardhat/config";

task("accounts", "Prints the list of accounts", async (args, { ethers }) => {
  const accounts = await ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

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
  }
};


export default hardhatConfig;
