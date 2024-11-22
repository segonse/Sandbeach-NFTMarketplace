import React from "react";
import Link from "next/link";

// Internal import
import Style from "./Discover.module.css";

const Discover = () => {
  // Discover navigation menu
  const discover = [
    { name: "Collection", link: "collection" },
    { name: "Search", link: "searchPage" },
    { name: "Author Profile", link: "author" },
    { name: "Account Setting", link: "account" },
    {
      name: "Upload NFT",
      link: "uploadNFT",
    },
    { name: "Connect Wallet", link: "connectWallet" },
    { name: "Blog", link: "blog" },
  ];

  return (
    <div>
      {discover.map((el, i) => (
        <Link href={{ pathname: `${el.link}` }} key={i + 1}>
          <div className={Style.discover}>{el.name}</div>
        </Link>
      ))}
    </div>
  );
};

export default Discover;
