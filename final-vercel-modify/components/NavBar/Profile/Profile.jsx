import React, { useContext } from "react";
import Image from "next/image";
import { FaUserAlt, FaRegImage, FaUserEdit } from "react-icons/fa";
import { MdHelpCenter } from "react-icons/md";
import {
  TbDownloadOff,
  TbDownload,
  TbTransactionBitcoin,
} from "react-icons/tb";

// Internal import
import Style from "./Profile.module.css";
import images from "@/img";
import Link from "next/link";

import { UserAPIContext } from "@/Context/UserAPIContext";

const Profile = ({ currentAccount }) => {
  const { username, isLogged, userPhoto, logout } = useContext(UserAPIContext);

  return (
    <div className={Style.profile}>
      <div className={Style.profile_account}>
        <Image
          src={userPhoto || images.defaultUser}
          alt="profile image"
          width={50}
          height={50}
          className={Style.profile_account_img}
          unoptimized={true}
        />

        <div className={Style.profile_account_info}>
          <p>{isLogged ? username : "Not Login"}</p>
          <small>
            {currentAccount
              ? currentAccount.slice(0, 20) + "..."
              : "Wallet Not Connect"}
          </small>
        </div>
      </div>

      <div className={Style.profile_menu}>
        <div className={Style.profile_menu_one}>
          {/* <Link href={{ pathname: "/author" }}>
            <div className={Style.profile_menu_one_item}>
              <FaUserAlt />
              <p>My Profile</p>
            </div>
          </Link> */}
          <Link href={{ pathname: "/author" }}>
            <div className={Style.profile_menu_one_item}>
              <FaRegImage />
              <p>My Items</p>
            </div>
          </Link>
          <Link href={{ pathname: "/account" }}>
            <div className={Style.profile_menu_one_item}>
              <FaUserEdit />
              <p>Edit Profile</p>
            </div>
          </Link>
        </div>

        <div className={Style.profile_menu_one}>
          <Link href={{ pathname: "/contactus" }}>
            <div className={Style.profile_menu_one_item}>
              <MdHelpCenter />
              <p>Help</p>
            </div>
          </Link>

          <Link href={{ pathname: "/transferFunds" }}>
            <div className={Style.profile_menu_one_item}>
              <TbTransactionBitcoin />
              <p>Transfer</p>
            </div>
          </Link>

          <Link
            href="/aboutus"
            onClick={(e) => {
              logout(e);
            }}
          >
            <div className={Style.profile_menu_one_item}>
              <TbDownload />
              <p>Disconnect</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Profile;
