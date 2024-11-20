import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Image from "next/image";

import Style from "@/styles/resellToken.module.css";
import formStyle from "@/PageComponent/AccountPage/Form/Form.module.css";
import { Button } from "@/components/components_index";

import { NFTMarketplaceContext } from "@/Context/NFTMarketplaceContext";

const resellToken = () => {
  const router = useRouter();
  const { id, tokenURI } = router.query;

  const { createSale } = useContext(NFTMarketplaceContext);

  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");

  const fetchNFT = async () => {
    if (!tokenURI) return;

    const { data } = await axios.get(tokenURI);
    setImage(data.image);
  };

  useEffect(() => {
    fetchNFT();
  }, [id]);

  const resell = async () => {
    if (!price) {
      return alert("Enter Price");
    }

    try {
      await createSale(tokenURI, price, true, id);
      router.push("/author");
    } catch (error) {
      console.log("Error while reselling NFT: ", error);
    }
  };

  return (
    <div className={Style.resellToken}>
      <div className={Style.resellToken_box}>
        <h1>Resell Your Token, Set Price</h1>
        <div className={formStyle.Form_box_input}>
          <label htmlFor="name">Price</label>
          <input
            type="number"
            min={0.005}
            step="0.001"
            placeholder="resell price"
            className={formStyle.Form_box_input_userName}
            onChange={(e) => setPrice(e.target.value)}
            value={price}
          />
        </div>

        <div className={Style.resellToken_box_image}>
          {image && (
            <Image
              src={image}
              alt="nft"
              width={400}
              height={400}
              unoptimized={true}
            />
          )}
        </div>

        <div className={formStyle.Form_box_btn}>
          <Button btnName="Resell NFT" handleClick={resell} />
        </div>
      </div>
    </div>
  );
};

export default resellToken;
