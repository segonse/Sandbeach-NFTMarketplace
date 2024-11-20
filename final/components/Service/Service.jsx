import React from "react";
import Image from "next/image";

// Internal import
import Style from "./Service.module.css";
import images from "@/img";

const Service = () => {
  return (
    <div className={Style.service}>
      <div className={Style.service_box}>
        <div className={Style.service_box_item}>
          <Image
            src={images.service1}
            alt="Fliter & Discover"
            width={150}
            height={150}
            style={{ borderRadius: "8%" }}
          />
          <p className={Style.service_box_item_step}>
            <span>Step 1</span>
          </p>
          <h3>Fliter & Discover</h3>
          <p></p>
        </div>

        <div className={Style.service_box_item}>
          <Image
            src={images.service2}
            alt="Fliter & Discover"
            width={150}
            height={150}
            style={{ borderRadius: "8%" }}
          />
          <p className={Style.service_box_item_step}>
            <span>Step 2</span>
          </p>
          <h3>Signup & Login</h3>
          <p></p>
        </div>

        <div className={Style.service_box_item}>
          <Image
            src={images.service3}
            alt="Connect Wallet"
            width={150}
            height={150}
            style={{ borderRadius: "8%" }}
          />
          <p className={Style.service_box_item_step}>
            <span>Step 3</span>
          </p>
          <h3>Connect Wallet</h3>
          <p></p>
        </div>

        <div className={Style.service_box_item}>
          <Image
            src={images.service4}
            alt="Start Trading"
            width={150}
            height={150}
            style={{ borderRadius: "8%" }}
          />
          <p className={Style.service_box_item_step}>
            <span>Step 4</span>
          </p>
          <h3>Start Trading</h3>
          <p></p>
        </div>
      </div>
    </div>
  );
};

export default Service;
