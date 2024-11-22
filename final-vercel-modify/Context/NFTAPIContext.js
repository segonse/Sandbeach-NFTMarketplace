import React, { useEffect, useState, useContext, Children } from "react";
import axios from "axios";

export const NFTAPIContext = React.createContext();

export const NFTAPIProvider = ({ children }) => {
  const [error, setError] = useState("");
  const [openError, setOpenError] = useState(false);

  const endPoint = process.env.NEXT_PUBLIC_API_END_POINT_NFT;

  const createNFT = async (nftData) => {
    try {
      const res = await axios.post(endPoint, nftData, {
        withCredentials: true,
      });

      return res.data;
    } catch (error) {
      setError(error.response.data.message);
      setOpenError(true);
    }
  };

  const createSale = async (url, price) => {
    try {
      const nftName = (await axios.get(url)).data.name;
      const nftId = (await axios.get(endPoint + `getNFTInfoByName/${nftName}`))
        .data.data.nft._id;

      await axios.patch(endPoint + nftId, {
        price: price,
        startDates: Date.now(),
      });
    } catch (error) {
      setError(error.response.data.message);
      setOpenError(true);
    }
  };

  const getNFTInfoByName = async (nftName) => {
    try {
      const res = await axios.get(endPoint + `getNFTInfoByName/${nftName}`);

      return res.data;
    } catch (error) {
      setError(error.response.data.message);
      setOpenError(true);
    }
  };

  return (
    <NFTAPIContext.Provider
      value={{ createNFT, createSale, error, openError, setOpenError,getNFTInfoByName }}
    >
      {children}
    </NFTAPIContext.Provider>
  );
};
