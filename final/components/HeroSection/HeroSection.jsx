import React, { useContext } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

// Internal import
import Style from "./HeroSection.module.css";
import images from "@/img";
import { Button } from "../components_index";

const HeroSection = () => {
  const router = useRouter();

  return (
    <div className={Style.heroSection}>
      <div className={Style.heroSection_box}>
        <div className={Style.heroSection_box_left}>
          <h1>Discover, Collect, and Trade Unique NFTs 🖼️</h1>
          <p>
            Step into Sandbeach, where digital art and collectibles come to
            life. Explore an ocean of exclusive NFTs and become part of the next
            wave of digital ownership.
          </p>
          <Button
            btnName="Start your search"
            handleClick={() => {
              router.push("/searchPage");
            }}
          />
        </div>

        <div className={Style.heroSection_box_right}>
          <Image
            src={images.hero}
            alt="hero image"
            layout="responsive"
            style={{ borderRadius: "15%" }}
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
