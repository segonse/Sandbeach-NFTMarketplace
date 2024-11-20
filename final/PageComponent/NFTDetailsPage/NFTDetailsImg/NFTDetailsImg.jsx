import React, { useState, useEffect } from "react";
import Image from "next/image";
import { BsImage } from "react-icons/bs";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";

import Style from "./NFTDetailsImg.module.css";
import images from "@/img";

const NFTDetailsImg = ({ nft }) => {
  const [description, setDescription] = useState(true);
  const [details, setDetails] = useState(true);
  const [like, setLike] = useState(false);

  const likeNFT = () => {
    setLike(!like);
  };
  const openDescription = () => {
    setDescription(!description);
  };
  const openDetails = () => {
    setDetails(!details);
  };

  return (
    <div className={Style.NFTDetailsImg}>
      <div className={Style.NFTDetailsImg_box}>
        <div className={Style.NFTDetailsImg_box_NFT}>
          <div className={Style.NFTDetailsImg_box_NFT_like}>
            <BsImage className={Style.NFTDetailsImg_box_NFT_like_icon} />
            <p onClick={likeNFT}>
              {like ? (
                <AiFillHeart
                  className={Style.NFTDetailsImg_box_NFT_like_icon}
                />
              ) : (
                <AiOutlineHeart
                  className={Style.NFTDetailsImg_box_NFT_like_icon}
                />
              )}
              <span>23</span>
            </p>
          </div>

          <div className={Style.NFTDetailsImg_box_NFT_img}>
            <Image
              src={nft.image}
              width={500}
              height={500}
              className={Style.NFTDetailsImg_box_NFT_img_img}
              alt="NFT image"
              style={{ objectFit: "cover" }}
              unoptimized={true}
            />
          </div>
        </div>

        <div
          className={Style.NFTDetailsImg_box_description}
          onClick={openDescription}
        >
          <p>Description</p>
          {description ? <TiArrowSortedUp /> : <TiArrowSortedDown />}
        </div>

        {description && (
          <div className={Style.NFTDetailsImg_box_description_box}>
            <p>{nft.description}</p>
          </div>
        )}

        <div className={Style.NFTDetailsImg_box_details} onClick={openDetails}>
          <p>Details</p>
          {details ? <TiArrowSortedUp /> : <TiArrowSortedDown />}
        </div>

        {details && (
          <div className={Style.NFTDetailsImg_box_details_box}>
            <small>2000 x 2000 px.IMAGE(685KB)</small>
            <p>
              <small>Contract Address</small>
              <br></br>
              {nft.seller}
            </p>
            <p>
              <small>Token ID </small>
              {nft.tokenId}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NFTDetailsImg;
