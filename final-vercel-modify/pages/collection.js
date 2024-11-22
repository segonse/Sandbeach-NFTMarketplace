import React from "react";

import Style from "../styles/collection.module.css";
import images from "@/img";
import {
  Banner,
  CollectionProfile,
  NFTCardTwo,
} from "@/PageComponent/collectionPage/collection_index";
import { Slider, Brand } from "@/components/components_index";
import Filter from "../components/Filter/Filter";

const collection = () => {
  const collectionArray = [
    images.nft_image_1,
    images.nft_image_2,
    images.nft_image_3,
    images.nft_image_1,
    images.nft_image_2,
    images.nft_image_3,
    images.nft_image_1,
    images.nft_image_2,
  ];
  return (
    <div className={Style.collection}>
      <Banner bannerImage={images.creatorbackground5} />
      <CollectionProfile />
      <Filter />
      {/* <NFTCardTwo NFTData={collectionArray} /> */}
      <Slider />
      <Brand />
    </div>
  );
};

export default collection;
