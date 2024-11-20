import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { AiFillFire, AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { MdVerified, MdTimer } from "react-icons/md";
import { TbArrowBigLeftLines, TbArrowBigRightLine } from "react-icons/tb";

// Internal import
import Style from "./BigNFTSlider.module.css";
import images from "@/img";
import Button from "../Button/Button";

const BigNFTSlider = () => {
  // Use state
  const [idNumber, setIdNumber] = useState(0);

  const sliderData = [
    {
      title: "Apes Bunitori Club",
      id: 0,
      name: "Segon",
      collection: "Arts",
      price: "0.005 ETH",
      like: 243,
      userImage: images.user8,
      NFTImage: images.nft_image_1,
      time: {
        days: 1,
        hours: 10,
        minutes: 35,
        seconds: 6,
      },
    },
    {
      title: "Apes Bunitori Club",
      id: 16,
      name: "Frank",
      collection: "Arts",
      price: "0.0012 ETH",
      like: 11,
      userImage: images.user7,
      NFTImage: images.nft_image_2,
      time: {
        days: 14,
        hours: 2,
        minutes: 45,
        seconds: 26,
      },
    },
    {
      title: "Longbow Personnel Carrier",
      id: 232,
      name: "Brian",
      collection: "Digitals",
      price: "0.00007 ETH",
      like: 11,
      userImage: images.user3,
      NFTImage: images.nft_image_3,
      time: {
        days: 21,
        hours: 10,
        minutes: 35,
        seconds: 6,
      },
    },
  ];

  const inc = useCallback(() => {
    if (idNumber < sliderData.length - 1) {
      setIdNumber(idNumber + 1);
    }
  }, [idNumber, sliderData]);

  const dec = useCallback(() => {
    if (idNumber > 0) {
      setIdNumber(idNumber - 1);
    }
  }, [idNumber]);

  // useEffect(() => {
  //   inc();
  // }, []);

  return (
    <div className={Style.bigNFTSlider}>
      <div className={Style.bigNFTSlider_box}>
        <div className={Style.bigNFTSlider_box_left}>
          <h2>
            {sliderData[idNumber].title} #{sliderData[idNumber].id}
          </h2>
          <div className={Style.bigNFTSlider_box_left_creator}>
            <div className={Style.bigNFTSlider_box_left_creator_profile}>
              <Image
                src={sliderData[idNumber].userImage}
                alt="profile image"
                width={50}
                height={50}
                className={Style.bigNFTSlider_box_left_creator_profile_img}
              />
              <div className={Style.bigNFTSlider_box_left_creator_profile_info}>
                <p>Creator</p>
                <h4>
                  {sliderData[idNumber].name}{" "}
                  <span>
                    <MdVerified />
                  </span>
                </h4>
              </div>
            </div>

            <div className={Style.bigNFTSlider_box_left_creator_collection}>
              <AiFillFire
                className={Style.bigNFTSlider_box_left_creator_collection_icon}
              />

              <div
                className={Style.bigNFTSlider_box_left_creator_collection_info}
              >
                <p>Collection</p>
                <h4>{sliderData[idNumber].collection}</h4>
              </div>
            </div>
          </div>

          <div className={Style.bigNFTSlider_box_left_bidding}>
            <div className={Style.bigNFTSlider_box_left_bidding_box}>
              <small>Current Bidding</small>
              <p>
                {sliderData[idNumber].price} <span>$xx,xx</span>
              </p>
            </div>

            <p className={Style.bigNFTSlider_box_left_bidding_box_auction}>
              <MdTimer
                className={Style.bigNFTSlider_box_left_bidding_box_auction_icon}
              />
              <span>Auction Ending in</span>
            </p>

            <div className={Style.bigNFTSlider_box_left_bidding_box_timer}>
              <div
                className={Style.bigNFTSlider_box_left_bidding_box_timer_item}
              >
                <p>{sliderData[idNumber].time.days}</p>
                <span>Days</span>
              </div>
              <div
                className={Style.bigNFTSlider_box_left_bidding_box_timer_item}
              >
                <p>{sliderData[idNumber].time.hours}</p>
                <span>Hours</span>
              </div>
              <div
                className={Style.bigNFTSlider_box_left_bidding_box_timer_item}
              >
                <p>{sliderData[idNumber].time.minutes}</p>
                <span>mins</span>
              </div>
              <div
                className={Style.bigNFTSlider_box_left_bidding_box_timer_item}
              >
                <p>{sliderData[idNumber].time.seconds}</p>
                <span>secs</span>
              </div>
            </div>

            <div className={Style.bigNFTSlider_box_left_bidding_button}>
              <Button btnName="Place" handleClick={() => {}} />
              <Button btnName="View" handleClick={() => {}} />
            </div>

            <div className={Style.bigNFTSlider_box_left_sliderBtn}>
              <TbArrowBigLeftLines
                className={Style.bigNFTSlider_box_left_sliderBtn_icon}
                onClick={dec}
              />

              <TbArrowBigRightLine
                className={Style.bigNFTSlider_box_left_sliderBtn_icon}
                onClick={inc}
              />
            </div>
          </div>
        </div>

        {/*** Right section ***/}
        <div className={Style.bigNFTSlider_box_right}>
          <div className={Style.bigNFTSlider_box_right_box}>
            <Image
              src={sliderData[idNumber].NFTImage}
              alt="NFT image"
              className={Style.bigNFTSlider_box_right_box_img}
            />

            <div className={Style.bigNFTSlider_box_right_box_like}>
              <AiFillHeart />
              <span>{sliderData[idNumber].like}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BigNFTSlider;
