import { config } from 'dotenv';
config({ path: '../../.env' });

import '@nomiclabs/hardhat-waffle';
import '@nomiclabs/hardhat-ethers';
import '@nomiclabs/hardhat-solhint';
import 'hardhat-typechain';
import 'hardhat-deploy';
import 'hardhat-deploy-ethers';
import '@nomiclabs/hardhat-etherscan';

import { utils } from 'ethers';
import { HardhatUserConfig, task } from 'hardhat/config';
import { removeConsoleLog } from 'hardhat-preprocessor';

// https://hardhat.org/plugins/nomiclabs-hardhat-etherscan.html

task('accounts', 'Prints the list of accounts', async (args, { ethers }) => {
  const accounts = await ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

task('signer', "Prints the signer's address", async (args, { ethers }) => {
  const signer = new ethers.Wallet(process.env.SIGNER_PRIVATE_KEY as string);
  console.log(signer.address);
});

const hardhatConfig: HardhatUserConfig = {
  solidity: {
    version: '0.7.3',
    settings: {
      optimizer: {
        enabled: true,
        runs: 1,
      },
    },
  },
  networks: {
    hardhat: {
      accounts: [
        {
          privateKey: process.env.SIGNER_PRIVATE_KEY as string,
          balance: utils.parseEther('10000').toString(),
        },
      ],
      // forking: {
      //   url: `https://mainnet.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
      //   blockNumber: 11760686,
      // }
    },
    mainnet: {
      url: `https://mainnet.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
      accounts: [process.env.SIGNER_PRIVATE_KEY as string],
    },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
  preprocess: {
    eachLine: removeConsoleLog((bre) => !['hardhat', 'localhost'].includes(bre.network.name)),
  },
  namedAccounts: {
    deployer: {
      default: '0xD94ADD50f8EdD5C1973643C151A071C690C8FCb3',
    },
  },
};

export default hardhatConfig;
