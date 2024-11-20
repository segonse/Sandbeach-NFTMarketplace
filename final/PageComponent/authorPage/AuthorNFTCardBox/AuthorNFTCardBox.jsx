import React from "react";

import Style from "./AuthorNFTCardBox.module.css";
import images from "@/img";
import { NFTCardTwo } from "@/PageComponent/collectionPage/collection_index";
import FollowerTabCard from "@/components/FollowerTab/FollowerTabCard/FollowerTabCard";

const AuthorNFTCardBox = ({
  listedNFTs,
  ownNFTs,
  like,
  follower,
  following,
  nfts,
  myNfts,
}) => {
  const FollowerTabCardArray = [
    {
      background: images.creatorbackground1,
      user: images.user1,
      seller: "0xce4Fd6e51aad88F6F4ce6aB8827279cffFb94568",
    },
    {
      background: images.creatorbackground2,
      user: images.user2,
      seller: "0xce4Fd6e51aad88F6F4ce6aB8827279cffFb94568",
    },
  ];
  const FollowingTabCardArray = [
    {
      background: images.creatorbackground5,
      user: images.user5,
      seller: "0xce4Fd6e51aad88F6F4ce6aB8827279cffFb94568",
    },
    {
      background: images.creatorbackground6,
      user: images.user6,
      seller: "0xce4Fd6e51aad88F6F4ce6aB8827279cffFb94568",
    },
    {
      background: images.creatorbackground1,
      user: images.user1,
      seller: "0xce4Fd6e51aad88F6F4ce6aB8827279cffFb94568",
    },
    {
      background: images.creatorbackground2,
      user: images.user2,
      seller: "0xce4Fd6e51aad88F6F4ce6aB8827279cffFb94568",
    },
  ];

  return (
    <div className={Style.AuthorNFTCardBox}>
      {listedNFTs && <NFTCardTwo NFTData={nfts} />}
      {ownNFTs && <NFTCardTwo NFTData={myNfts} />}
      {like && <NFTCardTwo NFTData={nfts} />}
      {follower && (
        <div className={Style.AuthorNFTCardBox_box}>
          {FollowerTabCardArray.map((el, i) => (
            <FollowerTabCard el={el} i={i} />
          ))}
        </div>
      )}
      {following && (
        <div className={Style.AuthorNFTCardBox_box}>
          {FollowingTabCardArray.map((el, i) => (
            <FollowerTabCard el={el} i={i} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AuthorNFTCardBox;
