import { ethers } from "hardhat";

const uri = ``;

async function main() {
  const signer = new ethers.Wallet(process.env.SIGNER_PRIVATE_KEY as string);

  // We get the contract to deploy
  const Stickers = await ethers.getContractFactory("Stickers");
  const stickers = await Stickers.deploy(uri);

  await stickers.deployed();

  console.log("stickers deployed to:", stickers.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
