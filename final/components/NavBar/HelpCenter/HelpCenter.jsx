import React from "react";
import Link from "next/link";

// Internal import
import Style from "./HelpCenter.module.css";

const HelpCenter = () => {
  const helpCenter = [
    { name: "About", link: "aboutus" },
    { name: "Contact Us", link: "contactus" },
    { name: "Sign Up", link: "signUp" },
    { name: "LogIn", link: "login" },
    { name: "Subscription", link: "subscription" },
  ];

  return (
    <div className={Style.box}>
      {helpCenter.map((el, i) => (
        <Link href={{ pathname: `${el.link}` }} key={i + 1}>
          <div className={Style.helpCenter}>{el.name}</div>
        </Link>
      ))}
    </div>
  );
};

export default HelpCenter;
