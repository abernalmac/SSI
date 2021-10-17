var Over18Claim = artifacts.require("./Over18Claim.sol");

module.exports = function(deployer) {
  deployer.deploy(Over18Claim);
};