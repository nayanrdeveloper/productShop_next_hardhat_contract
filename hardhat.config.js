/** @type import('hardhat/config').HardhatUserConfig */
require("@nomiclabs/hardhat-waffle");


module.exports = {
  solidity: "0.8.9",
  defaultNetwork: "ropsten",
  networks: {
    hardhat: {
    },
    ropsten: {
      url: process.env.RPC_PROVIDER,
      accounts: [process.env.PRIVATE_KEY]
    }
  },
};
