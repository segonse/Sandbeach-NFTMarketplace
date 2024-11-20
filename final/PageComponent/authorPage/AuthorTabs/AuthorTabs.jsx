import React, { useState } from "react";
import Image from "next/image";
import { TiArrowSortedDown, TiArrowSortedUp, TiTick } from "react-icons/ti";

import Style from "./AuthorTabs.module.css";

const AuthorTabs = ({
  setListedNFTs,
  setOwnNFTs,
  setLike,
  setFollower,
  setFollowing,
}) => {
  const [openList, setOpenList] = useState(false);
  const [activeBtn, setActiveBtn] = useState(0);
  const [selectedMenu, setSelectedMenu] = useState("Most Recent");

  const listArray = [
    "Most Recent",
    "Created By Admin",
    "Most Appreciated",
    "Most Discussed",
    "Most Viewed",
  ];

  const openDropDownList = () => {
    setOpenList(!openList);
  };
  const openTab = (e) => {
    const btnText = e.target.innerText;

    if (btnText == "Listed NFTs") {
      setListedNFTs(true);
      setOwnNFTs(false);
      setLike(false);
      setFollower(false);
      setFollowing(false);
      setActiveBtn(1);
    } else if (btnText == "Own NFTs") {
      setListedNFTs(false);
      setOwnNFTs(true);
      setLike(false);
      setFollower(false);
      setFollowing(false);
      setActiveBtn(2);
    } else if (btnText == "Liked") {
      setListedNFTs(false);
      setOwnNFTs(false);
      setLike(true);
      setFollower(false);
      setFollowing(false);
      setActiveBtn(3);
    } else if (btnText == "Followers") {
      setListedNFTs(false);
      setOwnNFTs(false);
      setLike(false);
      setFollower(true);
      setFollowing(false);
      setActiveBtn(4);
    } else if (btnText == "Following") {
      setListedNFTs(false);
      setOwnNFTs(false);
      setLike(false);
      setFollower(false);
      setFollowing(true);
      setActiveBtn(5);
    }
  };

  return (
    <div className={Style.AuthorTabs}>
      <div className={Style.AuthorTabs_box}>
        <div className={Style.AuthorTabs_box_left}>
          <div className={Style.AuthorTabs_box_left_btn}>
            <button
              className={`${activeBtn == 1 ? Style.active : ""}`}
              onClick={(e) => openTab(e)}
            >
              Listed NFTs
            </button>
            <button
              className={activeBtn == 2 ? Style.active : ""}
              onClick={(e) => openTab(e)}
            >
              Own NFTs
            </button>
            <button
              className={activeBtn == 3 ? Style.active : ""}
              onClick={(e) => openTab(e)}
            >
              Liked
            </button>
            <button
              className={activeBtn == 4 ? Style.active : ""}
              onClick={(e) => openTab(e)}
            >
              Followers
            </button>
            <button
              className={activeBtn == 5 ? Style.active : ""}
              onClick={(e) => openTab(e)}
            >
              Following
            </button>
          </div>
        </div>

        <div className={Style.AuthorTabs_box_right}>
          <div
            className={Style.AuthorTabs_box_right_para}
            onClick={openDropDownList}
          >
            <p>{selectedMenu}</p>
            {openList ? <TiArrowSortedUp /> : <TiArrowSortedDown />}
          </div>

          {openList && (
            <div className={Style.AuthorTabs_box_right_list}>
              {listArray.map((el, i) => (
                <div
                  key={i + 1}
                  className={Style.AuthorTabs_box_right_list_item}
                  onClick={() => setSelectedMenu(el)}
                >
                  <p>{el}</p>
                  <span>{selectedMenu == el && <TiTick />}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthorTabs;
