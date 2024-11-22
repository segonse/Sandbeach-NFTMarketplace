import React, { useEffect, useState, useContext } from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import { useRouter } from "next/router";
import axios from "axios";
import { PinataSDK } from "pinata-web3";

import {
  NFTMarketplaceAddress,
  NFTMarketplaceABI,
  TransferFundsAddress,
  TransferFundsABI,
} from "./constants";

import { UserAPIContext } from "./UserAPIContext";
import { NFTAPIContext } from "./NFTAPIContext";

// TODO: save in env
const pinata = new PinataSDK({
  pinataJwt: process.env.NEXT_PUBLIC_PINITA_JWT,
  pinataGateway: process.env.NEXT_PUBLIC_PINATA_GATEWAY,
});

// Connect with smart contarct by user wallet
const fecthContarct = (signerOrProvider) =>
  new ethers.Contract(
    NFTMarketplaceAddress,
    NFTMarketplaceABI,
    signerOrProvider
  );

const connectingWithSmatContract = async () => {
  try {
    const web3Modal = new Web3Modal.default(); // why .default()??
    const connection = await web3Modal.connect();
    const provider = new ethers.BrowserProvider(connection);
    const signer = await provider.getSigner();
    const contract = fecthContarct(signer);
    return contract;
  } catch (error) {
    console.log(
      "Something went wrong while connecting contract: " + error.message
    );
  }
};

// Tansfer Funds
const fecthTransferFundsContarct = (signerOrProvider) =>
  new ethers.Contract(TransferFundsAddress, TransferFundsABI, signerOrProvider);

const connectToTransferFunds = async () => {
  try {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.BrowserProvider(connection);
    const signer = await provider.getSigner();
    const contract = fecthTransferFundsContarct(signer);
    return contract;
  } catch (error) {
    console.log(
      "Something went wrong while connecting transferFunds contract: ",
      error
    );
  }
};

// Create context
export const NFTMarketplaceContext = React.createContext();

// Create context provider
// User interact
export const NFTMarketplaceProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [error, setError] = useState("");
  const [openError, setOpenError] = useState(false);
  const [accountBalance, setAccountBalance] = useState("");

  const router = useRouter();

  const { isLogged, endPoint, username } = useContext(UserAPIContext);
  const { createNFT: createNFTAPI, createSale: createSaleAPI } =
    useContext(NFTAPIContext);

  const checkIfWalletConnected = async () => {
    try {
      if (!window.ethereum)
        return setOpenError(true), setError("Please install wallet");

      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });

      if (accounts.length) {
        setCurrentAccount(accounts[0]);

        const provider = new ethers.BrowserProvider(window.ethereum);
        const getBalance = await provider.getBalance(accounts[0]);
        setAccountBalance(ethers.formatEther(getBalance));
      } else {
        // setOpenError(true);
        // setError("No Account Found");
        console.log("No Account Found");
      }
    } catch (error) {
      // setError("Something went wrong while check if wallet connected");
      // setOpenError(true);
      console.log(
        "Something went wrong while check if wallet connected: " + error.message
      );
    }
  };

  const handleAccountsChanged = (accounts) => {
    if (accounts.length === 0) {
      console.log("Wallet disconnected");
      setCurrentAccount("");
    } else {
      setCurrentAccount(accounts[0]);
    }
  };

  useEffect(() => {
    if (currentAccount) {
      console.log("Current Account: ", currentAccount);
    }
  }, [currentAccount]);

  // The page that imported this file will automatically check if the wallet is connected when mounted
  useEffect(() => {
    checkIfWalletConnected();

    if (typeof window.ethereum !== "undefined") {
      window.ethereum.on("accountsChanged", handleAccountsChanged);
    }

    return () => {
      if (typeof window.ethereum !== "undefined") {
        window.ethereum.removeListener(
          "accountsChanged",
          handleAccountsChanged
        );
      }
    };
  }, []);

  useEffect(() => {
    const updateWallet = async () => {
      try {
        if (isLogged && currentAccount) {
          await axios.patch(
            endPoint + "updateMe",
            {
              recentWalletAddress: currentAccount,
              historyWalletAddress: currentAccount,
            },
            { withCredentials: true }
          );
        }
      } catch (error) {
        console.error("Failed to update wallet address:" + error);
      }
    };

    updateWallet();
  }, [isLogged, currentAccount]);

  const connectWallet = async () => {
    try {
      if (!window.ethereum) return console.log("Install Metamask");

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setCurrentAccount(accounts[0]);
      // window.location.reload();
    } catch (error) {
      setError(
        "Something went wrong while connecting wallet: " + error.message
      );
      setOpenError(true);
    }
  };

  // Upload media file
  const uploadToIPFS = async (file) => {
    try {
      const upload = await pinata.upload.file(file);
      const url = `https://aqua-immense-possum-858.mypinata.cloud/ipfs/${upload.IpfsHash}`;
      return url;
    } catch (error) {
      setError("Error while uploading to IPFS: " + error.message);
      setOpenError(true);
    }
  };

  const createNFT = async (name, price, image, description, router) => {
    if (!name || !description || !price || !image)
      return setError("Data missing"), setOpenError(true);

    // const data = JSON.stringify({ name, description, image });

    // upload NFT json file
    try {
      const upload = await pinata.upload.json({ name, description, image });
      const url = `https://aqua-immense-possum-858.mypinata.cloud/ipfs/${upload.IpfsHash}`;

      await createNFTAPI({
        name,
        price,
        URI: url,
        description,
        creator: username,
        creatorWallet: currentAccount,
      });
      await createSale(url, price);
    } catch (error) {
      setError("Error while creating NFT: " + error.message);
      setOpenError(true);
    }
  };

  const createSale = async (url, formInputPrice, isReselling, id) => {
    try {
      const price = ethers.parseUnits(formInputPrice, "ether");

      const contract = await connectingWithSmatContract();
      const listingPrice = await contract.getListingPrice();

      const transaction = !isReselling
        ? await contract.createTokenAndMarketItem(url, price, {
            value: listingPrice.toString(),
          })
        : await contract.resellToken(id, price, {
            value: listingPrice.toString(),
          });

      await transaction.wait();
      console.log(transaction);

      await createSaleAPI(url, formInputPrice);

      router.push("/searchPage");
    } catch (error) {
      setError("Error while creating sale: " + error.message);
      setOpenError(true);
    }
  };

  const fetchNFTs = async (formInput, fileUrl, router) => {
    try {
      const provider = new ethers.JsonRpcProvider();
      const contract = fecthContarct(provider);

      const data = await contract.getMarketItems();

      const items = await Promise.all(
        data.map(
          async ({ tokenId, seller, owner, price: unformattedPrice }) => {
            const tokenURI = await contract.tokenURI(tokenId);

            const {
              data: { image, name, description },
            } = await axios.get(tokenURI);
            const price = ethers.formatEther(unformattedPrice.toString());

            return {
              price,
              tokenId: Number(tokenId),
              seller,
              owner,
              image,
              name,
              description,
              tokenURI,
            };
          }
        )
      );

      return items;
    } catch (error) {
      setError("Error while fetching NFTs: " + error.message);
      setOpenError;
    }
  };

  // useEffect(() => {
  //   fetchNFTs();
  // }, []);

  const fetchMyNFTsOrListedNFTs = async (type, address) => {
    try {
      const contract = await connectingWithSmatContract();

      const data =
        type == "fetchItemsListed"
          ? await contract.getMyMarketItems(address)
          : await contract.getMyToken(address);

      const items = await Promise.all(
        data.map(
          async ({ tokenId, seller, owner, price: unformattedPrice }) => {
            const tokenURI = await contract.tokenURI(tokenId);

            const {
              data: { image, name, description },
            } = await axios.get(tokenURI);
            const price = ethers.formatEther(unformattedPrice.toString());

            return {
              price,
              tokenId: Number(tokenId),
              seller,
              owner,
              image,
              name,
              description,
              tokenURI,
            };
          }
        )
      );

      return items;
    } catch (error) {
      setError("Error while fetching Listed NFTs: " + error.message);
      setOpenError(true);
    }
  };

  const buyNFT = async (nft) => {
    try {
      const contract = await connectingWithSmatContract();
      const price = ethers.parseEther(nft.price.toString());

      const transaction = await contract.createMarketSale(nft.tokenId, {
        value: price,
      });

      await transaction.wait();
      router.push("/author");
    } catch (error) {
      setError("Error while buying NFT: " + error.message);
      setOpenError(true);
    }
  };

  // -------------------------------------------------------------
  // --- TRANSFER FUNDS
  const [transactionCount, setTransactionCount] = useState("second");
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);

  const transferEther = async (address, ether, message) => {
    try {
      if (currentAccount) {
        const contract = await connectToTransferFunds();

        const unFormattedPrice = ethers.parseEther(ether);

        // FIRST METHOD TO TRANSFER FUND
        await ethereum.request({
          method: "eth_sendTransaction",
          params: [
            {
              from: currentAccount,
              to: address,
              value: unFormattedPrice.toString(16),
              // gas: "0x5208",
            },
          ],
        });

        const transaction = await contract.addDataToBlockchain(
          address,
          unFormattedPrice,
          message
        );

        setLoading(true);
        await transaction.wait();
        setLoading(false);

        const transactionCount = await contract.getTransactionCount();
        console.log(transactionCount);
        setTransactionCount(Number(transactionCount));
        window.location.reload();
      }
    } catch (error) {
      console.log("Error while transfer ether: " + error.message);
    }
  };

  const getAllTransactions = async () => {
    try {
      if (ethereum) {
        const contract = await connectToTransferFunds();

        const avaliableTransaction = await contract.getAllTransactions();

        const readTransaction = avaliableTransaction.map((transaction) => {
          return {
            addressTo: transaction.receiver,
            addressFrom: transaction.sender,
            timestamp: new Date(
              Number(transaction.timestamp) * 1000
            ).toLocaleString(),
            message: transaction.message,
            amount: ethers.formatEther(transaction.amount),
          };
        });

        setTransactions(readTransaction);
      } else {
        console.log("Ethereum object doesn't exist");
      }
    } catch (error) {
      console.log("Error while get all transactions: " + error.message);
    }
  };

  return (
    <NFTMarketplaceContext.Provider
      value={{
        connectWallet,
        uploadToIPFS,
        createNFT,
        fecthContarct,
        fetchMyNFTsOrListedNFTs,
        buyNFT,
        fetchNFTs,
        createSale,
        setOpenError,
        openError,
        error,
        currentAccount,
        transferEther,
        loading,
        accountBalance,
        transactions,
        getAllTransactions,
      }}
    >
      {children}
    </NFTMarketplaceContext.Provider>
  );
};
