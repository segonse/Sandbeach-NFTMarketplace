import React from "react";
import Image from "next/image";

import Style from "./LikeProfile.module.css";
import images from "@/img";

const LikeProfile = () => {
  const imageArray = [images.user1, images.user2, images.user3, images.user4];

  return (
    <div className={Style.like}>
      {imageArray.map((el, i) => (
        <div className={Style.like_box} key={i + 1}>
          <Image
            src={el}
            alt="profile image"
            width={15}
            height={15}
            className={Style.like_img}
          />
        </div>
      ))}
    </div>
  );
};

export default LikeProfile;
