import { expect } from 'chai';
import type { Signer, Wallet } from 'ethers';
import { ethers } from 'hardhat';

import type { Stickers } from '../typechain/Stickers';

const uri = 'https://drop.nifti.es/metadata/{tokenId}';
const data = '0x';

describe('Stickers', function () {
  let stickers: Stickers;
  let signer: Signer;
  let signerAddress: string;

  this.beforeAll(async () => {
    signer = (await ethers.getSigners())[0];
    signerAddress = await signer.getAddress();

    const Stickers = await ethers.getContractFactory('Stickers');
    stickers = (await Stickers.deploy(uri)) as Stickers;
  });

  it('should have configured admin', async function () {
    expect(await stickers.getRoleMemberCount(await stickers.DEFAULT_ADMIN_ROLE())).to.be.equal(1);
    const hasRole = await stickers.hasRole(await stickers.DEFAULT_ADMIN_ROLE(), signerAddress);
    expect(hasRole).to.equal(true);
  });

  it('should have configured minter', async function () {
    expect(await stickers.getRoleMemberCount(await stickers.MINTER_ROLE())).to.be.equal(1);
    const hasRole = await stickers.hasRole(await stickers.MINTER_ROLE(), signerAddress);
    expect(hasRole).to.equal(true);
  });

  it('should have configured pauser', async function () {
    expect(await stickers.getRoleMemberCount(await stickers.PAUSER_ROLE())).to.be.equal(1);
    const hasRole = await stickers.hasRole(await stickers.PAUSER_ROLE(), signerAddress);
    expect(hasRole).to.equal(true);
  });

  it('should not be able to mint from deployer', async function () {
    await expect(stickers.mint('0x0', 0, 1, data)).to.be.reverted;
  });
});
