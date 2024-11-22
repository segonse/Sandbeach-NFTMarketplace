export const getTopCreators = (nfts) => {
  // 存储最终创作者信息的数组
  const finalCreators = [];

  // 通过reduce函数将NFTs按卖家分类
  const finalResult = nfts.reduce((sellerToNfts, nft) => {
    (sellerToNfts[nft.seller] = sellerToNfts[nft.seller] || []).push(nft);

    return sellerToNfts;
  }, {});

  // 遍历分类后的结果，计算每个卖家的NFTs总价格
  Object.entries(finalResult).forEach(([seller, nfts]) => {
    // 将NFTs的价格转换为数字并累加
    const total = nfts
      .map((nft) => Number(nft.price))
      .reduce((previouValue, currentValue) => previouValue + currentValue, 0);

    // 将卖家及其总销售额添加到最终创作者列表中
    finalCreators.push({
      seller,
      total,
    });
  });

  return finalCreators;
};
