import React, { useState, useEffect, useContext } from "react";

// Internal import
import Style from "@/styles/index.module.css";
import {
  HeroSection,
  Service,
  BigNFTSlider,
  Subscribe,
  Title,
  Category,
  Filter,
  NFTCard,
  Collection,
  FollowerTab,
  AudioLive,
  Slider,
  Brand,
  Video,
} from "@/components/components_index";
import { Loader } from "@/components/components_index";
import { getTopCreators } from "@/PageComponent/TopCreators/TopCreators";

// Import contract data
import { NFTMarketplaceContext } from "@/Context/NFTMarketplaceContext";

const Home = () => {
  const { fetchNFTs } = useContext(NFTMarketplaceContext);
  const [nfts, setNfts] = useState([]);
  const [nftsCopy, setNftsCopy] = useState([]);

  const creators = getTopCreators(nfts);

  useEffect(() => {
    fetchNFTs().then((items) => {
      if (items) {
        setNfts(items.reverse());
        setNftsCopy(items);
      }
    });
  }, []);

  return (
    <div className={Style.homePage}>
      <HeroSection />
      <Service />
      <BigNFTSlider />

      <Title
        heading="Audio Collection"
        paragraph="Discover the most outstanding NFTs in all topics of life"
      />
      <AudioLive />

      {creators.length == 0 ? (
        <Loader />
      ) : (
        <FollowerTab TopCreators={creators} />
      )}

      {/* <Title
        heading="Explore NFTs video"
        paragraph="Click on play icon and enjoy NFTs video"
      /> */}
      <Slider />

      <Collection />

      <Title
        heading="Featured NFTs"
        paragraph="Discover the most outstanding NFTs in all topics of life"
      />
      <Filter />

      {nfts.length == 0 ? <Loader /> : <NFTCard nftData={nfts} />}

      <Title
        heading="Browser by category"
        paragraph="Explore the NFTs in the most featured categories"
      />
      <Category />

      <Subscribe />
      <Brand />
      {/* <Video /> */}
    </div>
  );
};

export default Home;
