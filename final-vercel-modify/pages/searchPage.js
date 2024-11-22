import React, { useContext, useState, useEffect } from "react";

import Style from "@/styles/searchPage.module.css";
import { Slider, Brand } from "@/components/components_index";
import { SearchBar } from "@/PageComponent/SearchPage/SearchPage_index";
import Filter from "@/components/Filter/Filter";
import {
  NFTCardTwo,
  Banner,
} from "@/PageComponent/collectionPage/collection_index";
import images from "@/img";
import { Loader } from "@/components/components_index";

import { NFTMarketplaceContext } from "@/Context/NFTMarketplaceContext";

const searchPage = () => {
  const { fetchNFTs } = useContext(NFTMarketplaceContext);
  const [nfts, setNfts] = useState([]);
  const [nftsCopy, setNftsCopy] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchNFTs().then((items) => {
      if (items) {
        setNfts(items.reverse());
        setNftsCopy(items);
      }
    });
  }, []);

  const onHandleSearch = (value) => {
    const filteredNFTs = nfts.filter(({ name }) =>
      name.toLowerCase().includes(value.toLowerCase())
    );

    filteredNFTs.length === 0 ? setNfts(nftsCopy) : setNfts(filteredNFTs);
  };

  const onClearSearch = () => {
    if (nfts.length && nftsCopy.length) {
      setNfts(nftsCopy);
    }
  };

  return (
    <div className={Style.searchPage}>
      <Banner bannerImage={images.creatorbackground6} />
      <SearchBar
        onHandleSearch={onHandleSearch}
        onClearSearch={onClearSearch}
      />
      <Filter />
      {nfts.length == 0 ? <Loader /> : <NFTCardTwo NFTData={nfts} />}

      <Slider />
      <Brand />
    </div>
  );
};

export default searchPage;
