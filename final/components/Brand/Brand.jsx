import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";

import Style from "./Brand.module.css";
import images from "@/img";
import Button from "../Button/Button";

const Brand = () => {
  const router = useRouter();

  return (
    <div className={Style.Brand}>
      <div className={Style.Brand_box}>
        <div className={Style.Brand_box_left}>
          <Image
            src={images.logo}
            alt="brand logo"
            width={100}
            height={100}
            // layout="responsive"
          />
          <h1>Discover NFTs and Earn Crypto with Sandbeach</h1>
          <p>Inspiring Creativity: A Leader in the Digital Art Revolution</p>

          <div className={Style.Brand_box_left_btn}>
            <Button
              btnName="Create"
              handleClick={() => {
                router.push("/uploadNFT");
              }}
            />
            <Button
              btnName="Discover"
              handleClick={() => {
                router.push("/searchPage");
              }}
            />
          </div>
        </div>
        <div className={Style.Brand_box_right}>
          <Image
            src={images.earn}
            alt="brand logo"
            width={800}
            height={600}
            layout="responsive"
          />
        </div>
      </div>
    </div>
  );
};

export default Brand;
