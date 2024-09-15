const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("NFTMarketplaceModule", (m) => {
  const NFTMarketplace = m.contract("NFTMarketplace");

  return { NFTMarketplace };
});
