import React, { useState, useEffect, useContext } from "react";

import Style from "@/styles/author.module.css";
import {
  Banner,
  NFTCardTwo,
} from "@/PageComponent/collectionPage/collection_index";
import { Brand, Title } from "@/components/components_index";
import {
  AuthorProfileCard,
  AuthorTabs,
  AuthorNFTCardBox,
} from "@/PageComponent/authorPage/author_index";
import FollowerTabCard from "@/components/FollowerTab/FollowerTabCard/FollowerTabCard";
import images from "@/img";
import { useRouter } from "next/router";

import { NFTMarketplaceContext } from "@/Context/NFTMarketplaceContext";
const author = () => {
  const popularArray = [
    images.user1,
    images.user2,
    images.user3,
    images.user4,
    images.user5,
    images.user6,
    images.user7,
    images.user8,
  ];

  const [listedNFTs, setListedNFTs] = useState(true);
  const [ownNFTs, setOwnNFTs] = useState(false);
  const [like, setLike] = useState(false);
  const [follower, setFollower] = useState(false);
  const [following, setFollowing] = useState(false);
  const [nfts, setNfts] = useState([]);
  const [myNfts, setMyNfts] = useState([]);
  const [authorAccount, setAuthorAccount] = useState("");
  const [creator, setCreator] = useState("");
  const [creatorPhoto, setCreatorPhoto] = useState("");

  const { fetchMyNFTsOrListedNFTs, currentAccount } = useContext(
    NFTMarketplaceContext
  );

  // @audit Only get user wallet address's NFTs in author page, and if no wallet connected will
  // get error(AuthorNFTCardBox:nfts map)

  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;

    if (currentAccount) {
      fetchMyNFTsOrListedNFTs(
        "fetchItemsListed",
        router.query.wallet || currentAccount
      ).then((items) => {
        setNfts(items);
      });

      fetchMyNFTsOrListedNFTs(
        "fetchMyNFT",
        router.query.wallet || currentAccount
      ).then((items) => {
        setMyNfts(items);
      });
    }

    setAuthorAccount(router.query.wallet);
    setCreator(router.query.creator);
    setCreatorPhoto(router.query.creatorPhoto);
  }, [router.isReady, currentAccount]);

  return (
    <div className={Style.author}>
      <Banner bannerImage={images.creatorbackground2} />
      <AuthorProfileCard
        currentAccount={currentAccount}
        authorAccount={authorAccount}
        creator={creator}
        creatorPhoto={creatorPhoto}
      />
      <AuthorTabs
        setListedNFTs={setListedNFTs}
        setOwnNFTs={setOwnNFTs}
        setLike={setLike}
        setFollower={setFollower}
        setFollowing={setFollowing}
      />
      <AuthorNFTCardBox
        listedNFTs={listedNFTs}
        ownNFTs={ownNFTs}
        like={like}
        follower={follower}
        following={following}
        nfts={nfts}
        myNfts={myNfts}
      />

      <Title
        heading={"Popular creators"}
        paragraph={"Click on music icon and enjoy NFT music or audio"}
      />

      <Brand />
    </div>
  );
};

export default author;
