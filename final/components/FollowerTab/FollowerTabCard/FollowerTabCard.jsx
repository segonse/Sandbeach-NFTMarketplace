import React, { useState } from "react";
import Image from "next/image";
import { MdVerified } from "react-icons/md";
import { TiTick } from "react-icons/ti";

import Style from "./FollowerTabCard.module.css";
import images from "@/img";

const FollowerTabCard = ({ el, i }) => {
  const [following, setFollowing] = useState(false);

  const followMe = () => {
    setFollowing(!following);
  };

  return (
    <div className={Style.followerTabCard}>
      <div className={Style.followerTabCard_rank}>
        <p>
          #{i + 1} <span>🏅</span>
        </p>
      </div>

      <div className={Style.followerTabCard_box}>
        <div className={Style.followerTabCard_box_img}>
          <Image
            src={el.background || images.creatorbackground1}
            alt="profile background"
            className={Style.followerTabCard_box_img_img}
            objectFit="cover"
          />
        </div>

        <div className={Style.followerTabCard_box_profile}>
          <Image
            className={Style.followerTabCard_box_profile_img}
            src={el.user || images.user1}
            alt="profile picture"
          />
        </div>

        <div className={Style.followerTabCard_box_info}>
          <div className={Style.followerTabCard_box_info_name}>
            <h4>
              {el.seller.slice(0, 9)}{" "}
              <span>
                <MdVerified />
              </span>
            </h4>
            <p>{el.total} ETH</p>
          </div>

          <div className={Style.followerTabCard_box_info_following}>
            {following ? (
              <a onClick={followMe}>
                Follow{" "}
                <span>
                  <TiTick />
                </span>
              </a>
            ) : (
              <a onClick={followMe}>Following</a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FollowerTabCard;
