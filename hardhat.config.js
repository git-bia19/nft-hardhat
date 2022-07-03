require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require("dotenv").config();

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

task("deploy", "Deploy the smart contracts", async(taskArgs, hre) => {

  const Artwork = await hre.ethers.getContractFactory("Artwork");
  const artwork = await Artwork.deploy("Artwork Contract", "ART");

  await artwork.deployed();

  /*await hre.run("verify:verify", {
    address: artwork.address,
    constructorArguments: [
      "Artwork Contract",
      "ART"
    ]
  })*/

});

task("verifycontract","verify contract", async(taskArgs,hre) => {
await hre.run("verify:verify", {
  address: "0xD27ef638c6E1ee144245548aD67CE22A47Ae6A0a",
  constructorArguments: [
    "Artwork Contract",
    "ART"],
  });
});


module.exports = {
  solidity: "0.8.4",
  networks: {
    mumbai: {
      url: "https://matic-mumbai.chainstacklabs.com",
      accounts: [
        process.env.PRIVATE_KEY,
      ]
    }
  },
  etherscan: {
    apiKey: process.env.POLYGONSCAN_KEY,
  }
};