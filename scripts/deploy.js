const hre = require('hardhat');
async function main() {

    console.log(hre.ethers)
    const Ecommerce = await hre.ethers.getContractFactory("ecommerce");
    const ecommerce = await Ecommerce.deploy();
    await ecommerce.deployed();
  console.log(`Contract are deployed on ${ecommerce.address}`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
