import React, { useState } from "react";
import Image from "next/image";
import { BsImage } from "react-icons/bs";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { MdVerified, MdTimer } from "react-icons/md";
import Link from "next/link";

import Style from "./NFTCardTwo.module.css";
import { LikeProfile } from "@/components/components_index";
import { Loader } from "@/components/components_index";

const NFTCardTwo = ({ NFTData }) => {
  const [like, setLike] = useState(false);
  const [likeInc, setLikeInc] = useState(21);

  const likeNFT = () => {
    if (!like) {
      setLike(true);
      setLikeInc(likeInc + 1);
    } else {
      setLike(false);
      setLikeInc(likeInc - 1);
    }
  };

  return (
    <div>
      {!NFTData || NFTData.length == 0 ? (
        <Loader />
      ) : (
        <div className={Style.NFTCardTwo}>
          {NFTData.map((el, i) => (
            <Link href={{ pathname: "NFT-details", query: el }} key={i + 1}>
              <div className={Style.NFTCardTwo_box}>
                <div className={Style.NFTCardTwo_box_like}>
                  <div className={Style.NFTCardTwo_box_like_box}>
                    <div
                      className={Style.NFTCardTwo_box_like_box_box}
                      onClick={(e) => {
                        e.preventDefault();
                      }}
                    >
                      <BsImage
                        className={Style.NFTCardTwo_box_like_box_box_icon}
                      />
                      <p onClick={likeNFT}>
                        {like ? <AiFillHeart /> : <AiOutlineHeart />}{" "}
                        <span>{likeInc}</span>
                      </p>
                    </div>
                  </div>
                </div>

                <div className={Style.NFTCardTwo_box_img}>
                  <Image
                    src={el.image}
                    alt="NFT"
                    width={500}
                    height={500}
                    style={{ objectFit: "cover" }}
                    className={Style.NFTCardTwo_box_img_img}
                    unoptimized={true}
                  />
                </div>

                <div className={Style.NFTCardTwo_box_info}>
                  <div className={Style.NFTCardTwo_box_info_left}>
                    <LikeProfile />
                    <p>{el.name}</p>
                  </div>
                  <small>4{i + 2}</small>
                </div>

                <div className={Style.NFTCardTwo_box_price}>
                  <div className={Style.NFTCardTwo_box_price_box}>
                    <small>Current Bidding</small>
                    <p>{el.price.slice(0, 7)} ETH</p>
                  </div>
                  <p className={Style.NFTCardTwo_box_price_stock}>
                    {" "}
                    <MdTimer />
                    <span>{i + 1} hours left</span>
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default NFTCardTwo;
