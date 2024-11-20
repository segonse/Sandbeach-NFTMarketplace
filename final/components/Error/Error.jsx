import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";

import Style from "./Error.module.css";
import images from "@/img";

import { NFTMarketplaceContext } from "@/Context/NFTMarketplaceContext";
import { UserAPIContext } from "@/Context/UserAPIContext";
import { NFTAPIContext } from "@/Context/NFTAPIContext";

const Error = () => {
  const { error, setOpenError } = useContext(NFTMarketplaceContext);
  const { error: userError, setOpenError: setUserOpenError } =
    useContext(UserAPIContext);
  const { error: nftError, setOpenError: setNFTOpenError } =
    useContext(NFTAPIContext);

  return (
    <div
      className={Style.Error}
      onClick={() => {
        setOpenError(false);
        setUserOpenError(false);
        setNFTOpenError(false);
      }}
    >
      <div className={Style.Error_box}>
        <div className={Style.Error_box_info}>
          <Image
            className={Style.Error_box_info_img}
            src={images.error}
            alt="error"
            width={250}
            height={250}
            style={{ objectFit: "contain" }}
          />

          <p>{error}</p>
          <p>{userError}</p>
          <p>{nftError}</p>
        </div>
      </div>
    </div>
  );
};

export default Error;
