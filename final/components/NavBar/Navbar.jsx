import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";
import Link from "next/link";

// Import icon
import { MdNotifications } from "react-icons/md";
import { BsSearch } from "react-icons/bs";
import { CgMenuLeft, CgMenuRight } from "react-icons/cg";
import { FiSun, FiMoon } from "react-icons/fi";

// Internal Import
import Style from "./NavBar.module.css";
import { Discover, HelpCenter, Notification, Profile, SideBar } from "./index";
import { Button, Error } from "@/components/components_index";
import images from "@/img";

// Import from smart contract
import { NFTMarketplaceContext } from "@/Context/NFTMarketplaceContext";
import { UserAPIContext } from "@/Context/UserAPIContext";
import { NFTAPIContext } from "@/Context/NFTAPIContext";

const Navbar = () => {
  // UseState components
  const [discover, setDiscover] = useState(false);
  const [help, sethelp] = useState(false);
  const [notification, setNotification] = useState(false);
  const [profile, setProfile] = useState(false);
  const [openSideMenu, setOpenSideMenu] = useState(false);
  const [openDarkMode, setOpenDarkMode] = useState(false);

  const { currentAccount, connectWallet, openError } = useContext(
    NFTMarketplaceContext
  );
  const { openError: userOpenError, userPhoto } = useContext(UserAPIContext);
  const { openError: nftOpenError } = useContext(NFTAPIContext);

  useEffect(() => {
    // Check if the broser has dark mode enabled
    const broswerOpenDark =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;

    // Check if the user has already saved a preference, return string or null
    const savedMode = localStorage.getItem("dark-mode");

    if (savedMode === "false") {
      null;
    } else if (savedMode === "true" || broswerOpenDark == true) {
      document.documentElement.classList.add("dark-mode");
      setOpenDarkMode(true);
    }
  }, []);

  const openDarkModeHandler = () => {
    const isDarkMode = document.documentElement.classList.toggle("dark-mode");
    setOpenDarkMode(isDarkMode);

    localStorage.setItem("dark-mode", isDarkMode);
  };

  const openMenu = (e) => {
    const btnText = e.target.innerText;
    if (btnText == "Discover") {
      if (!discover) {
        setDiscover(true);
        sethelp(false);
        setNotification(false);
        setProfile(false);
      } else {
        setDiscover(false);
      }
    } else if (btnText == "Help Center") {
      if (!help) {
        setDiscover(false);
        sethelp(true);
        setNotification(false);
        setProfile(false);
      } else {
        sethelp(false);
      }
    } else {
      setDiscover(false);
      sethelp(false);
      setNotification(false);
      setProfile(false);
    }
  };

  const openNotification = () => {
    if (!notification) {
      setDiscover(false);
      sethelp(false);
      setNotification(true);
      setProfile(false);
    } else {
      setNotification(false);
    }
  };

  const openProfile = () => {
    if (!profile) {
      setDiscover(false);
      sethelp(false);
      setNotification(false);
      setProfile(true);
    } else {
      setProfile(false);
    }
  };

  const openSideBar = () => {
    if (!openSideMenu) {
      setOpenSideMenu(true);
    } else {
      setOpenSideMenu(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.querySelector(`.${Style.navbar}`);
      if (window.scrollY > 50) {
        navbar.classList.add(
          openDarkMode ? Style.scrolled_dark : Style.scrolled
        );
        navbar.classList.remove(
          openDarkMode ? Style.scrolled : Style.scrolled_dark
        );
      } else {
        navbar.classList.remove(Style.scrolled_dark, Style.scrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [openDarkMode]);

  return (
    <div className={Style.navbar}>
      <div className={Style.navbar_container}>
        <div className={Style.navbar_container_left}>
          <div className={Style.logo}>
            <Link href={"/"}>
              <Image
                src={images.logo}
                alt="NFT Marketplace logo"
                height={100}
                width={100}
              />
            </Link>
          </div>
          <div className={Style.navbar_container_left_box_input}>
            <div className={Style.navbar_container_left_box_input_box}>
              <input type="text" placeholder="search NFT" />
              <BsSearch onClick={() => {}} className={Style.search_icon} />
            </div>
          </div>
        </div>

        {/*** End of navbar left section ***/}

        <div className={Style.navbar_container_right}>
          {/* OpenDark */}
          <div className={Style.navbar_container_right_opendark}>
            {openDarkMode ? (
              <FiSun className={Style.opendark} onClick={openDarkModeHandler} />
            ) : (
              <FiMoon
                className={Style.opendark}
                onClick={openDarkModeHandler}
              />
            )}
          </div>

          {/* Discover Menu */}
          <div className={Style.navbar_container_right_discover}>
            <p onClick={(e) => openMenu(e)}>Discover</p>
            {discover && (
              <div className={Style.navbar_container_right_discover_box}>
                <Discover />
              </div>
            )}
          </div>

          {/* HelpCenter Menu */}
          <div className={Style.navbar_container_right_help}>
            <p onClick={(e) => openMenu(e)}>Help Center</p>
            {help && (
              <div className={Style.navbar_container_right_help_box}>
                <HelpCenter />
              </div>
            )}
          </div>

          {/* Notification */}
          <div className={Style.navbar_container_right_notify}>
            <MdNotifications
              className={Style.notify}
              onClick={() => openNotification()}
            />
            {notification && <Notification />}
          </div>

          {/* Create Button secion */}
          <div className={Style.navbar_container_right_button}>
            {currentAccount == "" ? (
              <Button btnName="Connect" handleClick={connectWallet} />
            ) : (
              <Link href={{ pathname: "uploadNFT" }}>
                <Button btnName="Create" handleClick={() => {}} />
              </Link>
            )}
          </div>

          {/* User profile */}
          <div className={Style.navbar_container_right_profile_box}>
            <div className={Style.navbar_container_right_profile}>
              <Image
                src={userPhoto || images.defaultUser}
                alt="profile"
                height={40}
                width={40}
                onClick={() => openProfile()}
                className={Style.navbar_container_right_profile}
                unoptimized={true}
              />
              {profile && <Profile currentAccount={currentAccount} />}
            </div>
          </div>

          {/* Menu button */}
          <div className={Style.navbar_container_right_menuBtn}>
            <CgMenuRight
              className={Style.menuIcon}
              onClick={() => openSideBar()}
            />
          </div>

          {/* SideBar components(only be displayed (automatically) on mobile devices) */}
          {openSideMenu && (
            <div className={Style.sideBar}>
              <SideBar
                setOpenSideMenu={setOpenSideMenu}
                NFTMarketplaceContext={NFTMarketplaceContext}
              />
            </div>
          )}

          {(openError || userOpenError || nftOpenError) && <Error />}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
