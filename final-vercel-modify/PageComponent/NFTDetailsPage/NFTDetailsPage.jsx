import React from "react";

import { NFTDescription, NFTDetailsImg, NFTTabs } from "./NFTDetails_index";
import Style from "./NFTDetailsPage.module.css";

const NFTDetailsPage = ({ nft }) => {
  return (
    <div className={Style.NFTDetailsPage}>
      <div className={Style.NFTDetailsPage_box}>
        <NFTDetailsImg nft={nft} />
        <NFTDescription nft={nft} />
      </div>
    </div>
  );
};

export default NFTDetailsPage;
