require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: "0.8.0",
  networks: {
    goerli: {
      url: "https://eth-goerli.alchemyapi.io/v2/wHp8W_3UI_jjc2v7xzjmITHTLqLy999J",
      accounts: [
        "72df6f9eed9559bd31e20521dac94f17226993ac173677289f4b886ade90a8f6",
      ],
    },
  },
};
