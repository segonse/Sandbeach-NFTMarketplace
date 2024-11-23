import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";
import { FaEthereum, FaUserAlt } from "react-icons/fa";

import Style from "../styles/transferFunds.module.css";
import formStyle from "../PageComponent/AccountPage/Form/Form.module.css";
import images from "@/img";
import { Button, Loader } from "@/components/components_index";

import { NFTMarketplaceContext } from "../Context/NFTMarketplaceContext";

const transferFunds = () => {
  const {
    currentAccount,
    transferEther,
    loading,
    accountBalance,
    transactions,
    getAllTransactions,
  } = useContext(NFTMarketplaceContext);
  const [transferAmount, setTransferAmount] = useState("");
  const [transferAccount, setTransferAccount] = useState("");
  const [message, setMessage] = useState("");
  const [readMessage, setReadMessage] = useState("");
  const [openBox, setOpenBox] = useState(false);

  // const transactions = [1, 2, 3, 4, 5, 6, 7];

  useEffect(() => {
    getAllTransactions();
  }, []);

  return (
    <div className={Style.transfer}>
      <div className={Style.transfer_box}>
        <h1>Tansfer Ether</h1>
        <p>Transfer tokens and write the message you want to send</p>
        <div className={Style.transfer_box_box}>
          <div className={Style.transfer_box_box_left}>
            <Image
              src={images.transfer}
              alt="images"
              style={{ width: "100%", height: "auto", aspectRatio: "1/1" }}
            />
          </div>

          <div className={Style.transfer_box_box_right}>
            <h2>Now you can transfer ether</h2>
            <div className={Style.transfer_box_box_right_info}>
              <p className={Style.transfer_box_box_right_info_desktop}>
                Account: {currentAccount || "Wallet Not Connect"}
              </p>
              <p className={Style.transfer_box_box_right_info_mobile}>
                Account: {currentAccount.slice(1, 25) || "Wallet Not Connect"}{" "}
                {currentAccount && ".."}
              </p>
              <p>Balance: {accountBalance} ETH</p>
            </div>

            {/* Transfer fields */}
            <div className={Style.transfer_box_box_right_box}>
              <div className={formStyle.Form_box_input}>
                <div className={formStyle.Form_box_input_box}>
                  <div className={formStyle.Form_box_input_box_icon}>
                    <FaUserAlt />
                  </div>
                  <input
                    type="text"
                    placeholder="address*"
                    onChange={(e) => setTransferAccount(e.target.value)}
                  />
                </div>
              </div>

              <div className={formStyle.Form_box_input}>
                <div className={formStyle.Form_box_input_box}>
                  <div className={formStyle.Form_box_input_box_icon}>
                    <FaEthereum />
                  </div>
                  <input
                    type="number"
                    placeholder="ETH*"
                    min={1}
                    onChange={(e) => setTransferAmount(e.target.value)}
                  />
                </div>
              </div>

              <div className={formStyle.Form_box_input}>
                <textarea
                  name=""
                  id=""
                  cols="30"
                  rows="6"
                  placeholder="your message in few words"
                  onChange={(e) => setMessage(e.target.value)}
                ></textarea>
              </div>

              {loading ? (
                <Loader />
              ) : (
                <Button
                  btnName="Transfer"
                  handleClick={() =>
                    transferEther(transferAccount, transferAmount, message)
                  }
                  classStyle={Style.button}
                />
              )}
            </div>
          </div>
        </div>

        {/* Transaction History */}
        <h1 className={Style.transfer_box_h1}>Transaction History</h1>
        {/* <p>fdbbsfd bdf afbb rvef sdvb</p> */}

        <div className={Style.transfer_box_history}>
          {transactions.map((el, i) => (
            <div className={Style.transfer_box_history_item} key={i + 1}>
              <Image
                src={images.transferImage}
                alt="image"
                style={{
                  width: "100%",
                  height: "auto",
                  aspectRatio: "1/1",
                }}
                unoptimized={true}
              />

              <div className={Style.transfer_box_history_item_info}>
                <p>
                  <span>Transfer ID:</span> #{i + 1}
                </p>
                <p>
                  <span>Amount:</span> {el.amount}
                </p>
                <p>
                  <span>From:</span> {el.addressFrom.slice(0, 20)}..
                </p>
                <p>
                  <span>To:</span> {el.addressTo.slice(0, 20)}..
                </p>

                <Button
                  btnName="Message"
                  handleClick={() => {
                    setReadMessage(el.message), setOpenBox(true);
                  }}
                  className={Style.readButton}
                />
              </div>
            </div>
          ))}
        </div>

        {openBox == false ? (
          ""
        ) : (
          <div className={Style.messageBox} onClick={() => setOpenBox(false)}>
            <div className={Style.messageBox_box}>
              <h1>Transaction Message</h1>
              <p>{readMessage}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default transferFunds;
