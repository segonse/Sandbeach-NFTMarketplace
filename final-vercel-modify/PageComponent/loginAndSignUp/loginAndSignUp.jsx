import React, { useState, useContext } from "react";
import Image from "next/image";

import Style from "./loginAndSignUp.module.css";
import images from "../../img";
import { Button } from "../../components/components_index";

// API IMPORT
import { UserAPIContext } from "@/Context/UserAPIContext";
import login from "@/pages/login";

const loginAndSignUp = ({ isSignUp }) => {
  const [activeBtn, setActiveBtn] = useState(1);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  // console.log(UserAPIContext);
  const { signUp, login } = useContext(UserAPIContext);

  const socialImage = [
    {
      social: images.facebook,
      name: "Continue with Facebook",
    },
    {
      social: images.twitter,
      name: "Continue with twitter",
    },
    {
      social: images.telegram,
      name: "Continue with telegram",
    },
  ];
  return (
    <div className={Style.user}>
      <div className={Style.user_box}>
        <div className={Style.user_box_social}>
          {socialImage.map((el, i) => (
            <div
              key={i + 1}
              onClick={() => setActiveBtn(i + 1)}
              className={`${Style.user_box_social_item} ${
                activeBtn == i + 1 ? Style.active : ""
              }`}
            >
              <Image
                src={el.social}
                alt={el.name}
                width={30}
                height={30}
                className={Style.user_box_social_item_img}
              />
              <p>
                <span>{el.name}</span>
              </p>
            </div>
          ))}
        </div>

        <p className={Style.user_box_or}>OR</p>

        <div className={Style.user_box_input}>
          <div className={Style.user_box_input_box}>
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              placeholder="example@emample.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {isSignUp && (
            <div className={Style.user_box_input_box}>
              <label htmlFor="name" className={Style.user_box_input_box_label}>
                <p>Username</p>
              </label>
              <input
                type="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          )}

          <div className={Style.user_box_input_box}>
            <label
              htmlFor="password"
              className={Style.user_box_input_box_label}
            >
              <p>Password</p>
              {!isSignUp && (
                <p>
                  <a href="#">Forget password</a>
                </p>
              )}
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {isSignUp && (
            <div className={Style.user_box_input_box}>
              <label
                htmlFor="confirm password"
                className={Style.user_box_input_box_label}
              >
                <p>Confirm Password</p>
              </label>
              <input
                type="password"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
              />
            </div>
          )}
        </div>

        <Button
          btnName="Continue"
          classStyle={Style.button}
          handleClick={() => {
            isSignUp
              ? signUp({ email, name, password, passwordConfirm })
              : login({ email, password });
          }}
        />
      </div>
    </div>
  );
};

export default loginAndSignUp;
