import React, { useState } from "react";
import {
  FaFilter,
  FaAngleDown,
  FaAngleUp,
  FaWallet,
  FaMusic,
  FaVideo,
  FaImages,
  FaUserAlt,
} from "react-icons/fa";
import { AiFillCloseCircle } from "react-icons/ai";
import { MdVerified } from "react-icons/md";
import { TiTick } from "react-icons/ti";

import Style from "./Filter.module.css";

const Filter = () => {
  const [filter, setFilter] = useState(true);
  const [image, setImage] = useState(true);
  const [video, setVedio] = useState(true);
  const [music, setMusic] = useState(true);

  const openFilter = () => {
    setFilter(!filter);
  };
  const openImage = () => {
    setImage(!image);
  };
  const openVideo = () => {
    setVedio(!video);
  };
  const openMusic = () => {
    setMusic(!music);
  };

  return (
    <div className={Style.filter}>
      <div className={Style.filter_box}>
        <div className={Style.filter_box_left}>
          <button onClick={() => {}}>NFTs</button>
          <button onClick={() => {}}>Arts</button>
          <button onClick={() => {}}>Musics</button>
          <button onClick={() => {}}>Sports</button>
          <button onClick={() => {}}>Photography</button>
        </div>

        <div className={Style.filter_box_right}>
          <div className={Style.filter_box_right_box} onClick={openFilter}>
            <FaFilter />
            <span>Filter</span> {filter ? <FaAngleDown /> : <FaAngleUp />}
          </div>
        </div>
      </div>

      {filter && (
        <div className={Style.filter_box_items}>
          <div className={Style.filter_box_items_box}>
            <div className={Style.filter_box_items_box_item}>
              <FaWallet /> <span>10 ETH</span>
              <AiFillCloseCircle />
            </div>
          </div>

          <div className={Style.filter_box_items_box}>
            <div
              className={Style.filter_box_items_box_item_trans}
              onClick={openImage}
            >
              <FaImages /> <small>Images</small>
              {image ? <AiFillCloseCircle /> : <TiTick />}
            </div>
          </div>

          <div className={Style.filter_box_items_box}>
            <div
              className={Style.filter_box_items_box_item_trans}
              onClick={openVideo}
            >
              <FaVideo /> <small>Videos</small>
              {video ? <AiFillCloseCircle /> : <TiTick />}
            </div>
          </div>

          <div className={Style.filter_box_items_box}>
            <div
              className={Style.filter_box_items_box_item_trans}
              onClick={openMusic}
            >
              <FaMusic /> <small>Musics</small>
              {music ? <AiFillCloseCircle /> : <TiTick />}
            </div>
          </div>

          <div className={Style.filter_box_items_box}>
            <div className={Style.filter_box_items_box_item}>
              <FaUserAlt /> <span>Verified</span>
              <MdVerified />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Filter;
