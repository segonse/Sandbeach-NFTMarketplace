import React, { useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { BsImage } from "react-icons/bs";
import Image from "next/image";
import Link from "next/link";

import Style from "./NFTCard.module.css";
import images from "@/img";

const NFTCard = ({ nftData }) => {
  const [like, setLike] = useState(true);

  const likeNft = () => {
    setLike(!like);
  };

  return (
    <div className={Style.NFTCard}>
      {nftData.map((el, i) => (
        <Link href={{ pathname: "/NFT-details", query: el }}>
          <div className={Style.NFTCard_box} key={i + 1}>
            <div className={Style.NFTCard_box_img}>
              <Image
                src={el.image}
                width={500}
                height={500}
                alt="NFT images"
                className={Style.NFTCard_box_img_img}
                unoptimized={true}
              />
            </div>

            <div className={Style.NFTCard_box_update}>
              <div className={Style.NFTCard_box_update_left}>
                <div
                  className={Style.NFTCard_box_update_left_like}
                  onClick={likeNft}
                >
                  {like ? (
                    <AiOutlineHeart />
                  ) : (
                    <AiFillHeart
                      className={Style.NFTCard_box_update_left_like_icon}
                    />
                  )}
                  {""} 22
                </div>
              </div>

              <div className={Style.NFTCard_box_update_right}>
                <div className={Style.NFTCard_box_update_right_info}>
                  <small>Remaining time</small>
                  <p>3h : 15m : 20s</p>
                </div>
              </div>
            </div>

            <div className={Style.NFTCard_box_update_details}>
              <div className={Style.NFTCard_box_update_details_price}>
                <div className={Style.NFTCard_box_update_details_price_box}>
                  <h4>
                    {el.name} #{el.tokenId}
                  </h4>

                  <div
                    className={Style.NFTCard_box_update_details_price_box_box}
                  >
                    <div
                      className={Style.NFTCard_box_update_details_price_box_bid}
                    >
                      <small>Current Bid</small>
                      <p>{el.price}ETH</p>
                    </div>

                    <div
                      className={
                        Style.NFTCard_box_update_details_price_box_stock
                      }
                    >
                      <small>61 in stocks</small>
                    </div>
                  </div>
                </div>
              </div>

              <div className={Style.NFTCard_box_update_details_category}>
                <BsImage />
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default NFTCard;
