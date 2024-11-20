import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";

import { Button, Category, Brand } from "@/components/components_index";
import NFTDetailsPage from "@/PageComponent/NFTDetailsPage/NFTDetailsPage";
import { NFTMarketplaceContext } from "@/Context/NFTMarketplaceContext";

// @audit If not the router navigates to this page, will get error due to undefined nft
const NFTDetails = () => {
  const { currentAccount } = useContext(NFTMarketplaceContext);

  const [nft, setNft] = useState({
    image: "",
    tokenId: "",
    name: "",
    owner: "",
    price: "",
    seller: "",
    las: "",
  });

  const router = useRouter();
  useEffect(() => {
    if (!router.isReady) return;
    setNft(router.query);
  }, [router.isReady]);

  return (
    <div>
      <NFTDetailsPage nft={nft} key={nft.tokenId} />
      <Category />
      <Brand />
    </div>
  );
};

export default NFTDetails;
