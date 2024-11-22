import React, { useState, useCallback, useContext } from "react";
import Image from "next/image";
import { useDropzone } from "react-dropzone";

import Style from "@/styles/account.module.css";
import images from "@/img";
import Form from "@/PageComponent/AccountPage/Form/Form";

import { UserAPIContext } from "@/Context/UserAPIContext";

const account = () => {
  const [fileUrl, setFileUrl] = useState(null);

  const { uploadUserPhoto, userPhoto } = useContext(UserAPIContext);

  const onDrop = useCallback(async (acceptedFile) => {
    await uploadUserPhoto(acceptedFile[0]);
    setFileUrl(acceptedFile[0].path);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "images/*",
    maxSize: 5000000,
  });

  const imageUrl = images.user1.src;

  return (
    <div className={Style.account}>
      <div className={Style.account_info}>
        <h1>Profile settings</h1>
        <p>
          You can set preferred display name, create your profile URL and manage
          other personal settings.
        </p>
      </div>

      <div className={Style.account_box}>
        <div className={Style.account_box_img} {...getRootProps()}>
          <input {...getInputProps()} />
          <Image
            src={userPhoto || images.defaultUser}
            alt="account upload"
            width={150}
            height={150}
            className={Style.account_box_img_img}
            unoptimized={true}
          />
          <p className={Style.account_box_img_para}>Change Image</p>
        </div>

        <div className={Style.account_box_form}>
          <Form />
        </div>
      </div>
    </div>
  );
};

export default account;
