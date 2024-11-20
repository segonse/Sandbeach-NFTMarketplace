import React from "react";
import Image from "next/image";

import Style from "./Banner.module.css";

const Banner = ({ bannerImage }) => {
  return (
    <div className={Style.banner}>
      <div className={Style.banner_img}>
        <Image
          src={bannerImage}
          alt="backgroud"
          style={{ objectFit: "cover" }}
          layout="responsive"
        />
      </div>

      <div className={Style.banner_img_mobile}>
        <Image
          src={bannerImage}
          alt="backgroud"
          style={{ objectFit: "cover" }}
          layout="responsive"
        />
      </div>
    </div>
  );
};

export default Banner;
