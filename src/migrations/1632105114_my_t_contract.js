const myTContract = artifacts.require("../contracts/myTContract.sol");

module.exports = function (deployer) {
  deployer.deploy(myTContract);
};
