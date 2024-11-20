import React from "react";
import Image from "next/image";
import {
  TiSocialFacebook,
  TiSocialLinkedin,
  TiSocialTwitter,
  TiSocialYoutube,
  TiSocialInstagram,
  TiArrowSortedDown,
  TiArrowSortedUp,
} from "react-icons/ti";
import { RiPlaneFill, RiSendPlaneFill } from "react-icons/ri";

// Internal import
import Style from "./Footer.module.css";
import images from "@/img";
import { Discover, HelpCenter } from "../NavBar/index";

const Footer = () => {
  return (
    <div className={Style.footer}>
      <div className={Style.footer_box}>
        <div className={Style.footer_box_social}>
          <Image src={images.logo} alt="footer logo" width={100} height={100} />
          <p>
            At Sandbeach, we are committed to providing a secure and
            user-friendly NFT trading platform. Explore our diverse range of
            digital assets and discover unique artworks, collectibles, and
            virtual items. Whether you're a collector or a creator, SandBeach is
            the perfect gateway to the world of NFTs. Join us today and embark
            on your journey into the world of digital assets!
          </p>

          <div className={Style.footer_social}>
            <a href="#">
              <TiSocialFacebook />
            </a>
            <a href="#">
              <TiSocialLinkedin />
            </a>
            <a href="#">
              <TiSocialTwitter />
            </a>
            <a href="#">
              <TiSocialYoutube />
            </a>
            <a href="#">
              <TiSocialInstagram />
            </a>
          </div>
        </div>

        <div className={Style.footer_box_discover}>
          <h3>Discover</h3>
          <Discover />
        </div>
        <div className={Style.footer_box_help}>
          <h3>Help Center</h3>
          <HelpCenter />
        </div>

        <div className={Style.subscribe}>
          <h3>Subscribe</h3>
          <div className={Style.subscribe_box}>
            <input type="email" placeholder="Enter your emali"></input>
            <RiSendPlaneFill className={Style.subscribe_box_send} />
          </div>
          <div className={Style.subscribe_box_info}>
            <p>
              Join our mailing list to be the first to know about new NFT
              releases, exclusive artworks, and market trends. Let SandBeach
              Marketplace keep you at the forefront of digital
              collectibles—don't miss a single opportunity!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
