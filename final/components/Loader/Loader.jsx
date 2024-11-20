import React from "react";
import Image from "next/image";

import Style from "./Loader.module.css";
import images from "@/img";

const Loader = () => {
  return (
    <div className={Style.Loader}>
      <div className={Style.Loader_box}>
        <div className={Style.Loader_box_img}>
          <Image
            src={images.loader}
            alt="loader"
            width={200}
            height={200}
            objectFit="cover"
            className={Style.Loader_box_img_img}
          />
        </div>
      </div>
    </div>
  );
};

export default Loader;
