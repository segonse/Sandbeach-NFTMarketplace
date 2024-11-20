import React from "react";
import { RiSendPlaneFill } from "react-icons/ri";
import Image from "next/image";

// Internal import
import Style from "./Subscribe.module.css";
import images from "@/img";

const Subscribe = () => {
  return (
    <div className={Style.subscribe}>
      <div className={Style.subscribe_box}>
        <div className={Style.subscribe_box_left}>
          <h2>Stay Ahead with the Latest NFT Drops</h2>
          <p>
            Subscribe to our, exclusive access to new NFT drops and collections,
            stay updated on marketplace features and events. Engage with
            artists, collectors and developers and become part of an active NFT
            community.
          </p>

          <div className={Style.subscribe_box_left_box}>
            <span>01</span>
            <small>Get more discount</small>
          </div>
          <div className={Style.subscribe_box_left_box}>
            <span>02</span>
            <small>Get premium magazinest</small>
          </div>

          <div className={Style.subscribe_box_left_input}>
            <input type="email" placeholder="Enter your email" />
            <RiSendPlaneFill className={Style.subscribe_box_left_input_img} />
          </div>
        </div>

        <div className={Style.subscribe_box_right}>
          <Image
            src={images.update}
            alt="get update"
            layout="responsive"
            style={{ borderRadius: "8%" }}
            className={Style.subscribe_box_right_img}
          />
        </div>
      </div>
    </div>
  );
};

export default Subscribe;
