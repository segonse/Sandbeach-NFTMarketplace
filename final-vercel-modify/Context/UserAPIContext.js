import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { PinataSDK } from "pinata";

const pinata = new PinataSDK({
  pinataJwt: process.env.NEXT_PUBLIC_PINITA_JWT,
  pinataGateway: process.env.NEXT_PUBLIC_PINATA_GATEWAY,
});

export const UserAPIContext = React.createContext();

export const UserAPIProvider = ({ children }) => {
  // const [token, setToken] = useState(localStorage.getItem("firstLogin"));
  const [isLogged, setIsLogged] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const [error, setError] = useState("");
  const [openError, setOpenError] = useState(false);

  const [username, setUsername] = useState("");
  const [userPhoto, setUserPhoto] = useState("");

  const router = useRouter();

  const endPoint = process.env.NEXT_PUBLIC_API_END_POINT_USER;

  const signUp = async (userData) => {
    // const res = await axios.post(endPoint + "signUp", userData);
    try {
      const res = await axios.post(endPoint + "signUp", userData, {
        withCredentials: true,
      });

      if (res.data.status === "success") {
        setIsLogged(true);
        // setIsAdmin(res.data.role === "admin");

        setUsername(res.data.data.user.name);

        if (res.data.data.user.photo) {
          const imageUrl = await getUserPhotoUrl(res.data.data.user.photo);
          setUserPhoto(imageUrl);
        }

        router.push("/");
      }
    } catch (error) {
      error.response
        ? setError(error.response.data.message)
        : setError(error.message);
      setOpenError(true);
    }
  };

  const login = async (userData) => {
    try {
      const res = await axios.post(endPoint + "login", userData, {
        withCredentials: true,
      });

      if (res.data.status === "success") {
        setIsLogged(true);
        // setIsAdmin(res.data.role === "admin");

        setUsername(res.data.data.user.name);

        if (res.data.data.user.photo) {
          const imageUrl = await getUserPhotoUrl(res.data.data.user.photo);
          setUserPhoto(imageUrl);
        }

        // window.location.href = "/"; // 使用这种跳转方式会刷新usestate
        router.push("/");
      }
    } catch (error) {
      error.response
        ? setError(error.response.data.message)
        : setError(error.message);
      setOpenError(true);
    }
  };

  const checkAuthByCookie = async (firstCheck) => {
    try {
      const res = await axios.get(endPoint + "checkAuthByCookie", {
        withCredentials: true,
      });
      if (res.data.status === "success") {
        setIsLogged(true);
        setUsername(res.data.data.user.name);

        if (res.data.data.user.photo) {
          const imageUrl = await getUserPhotoUrl(res.data.data.user.photo);
          setUserPhoto(imageUrl);
        }
      }
    } catch (error) {
      if (!firstCheck) {
        error.response
          ? setError(error.response.data.message)
          : setError(error.message);
        setOpenError(true);
      } else {
        console.log(error.message);
      }
    }
  };

  useEffect(() => {
    checkAuthByCookie(true);
  }, []);

  // Mongo save user photo cid(pinata)
  const uploadUserPhoto = async (image) => {
    try {
      // const formData = new FormData();
      // formData.append("photo", image);

      // await axios.post(endPoint + "uploadUserPhoto", formData, {
      //   headers: {
      //     "Content-Type": "multipart/form-data",
      //   },
      //   withCredentials: true,
      // });

      const upload = await pinata.upload.file(image);

      await axios.patch(
        endPoint + "updateMe",
        { photo: upload.cid },
        {
          withCredentials: true,
        }
      );

      router.push("/");
    } catch (error) {
      error.response
        ? setError(error.response.data.message)
        : setError(error.message);
      setOpenError(true);
    }
  };

  // This function get temporary url by cid
  const getUserPhotoUrl = async (cid) => {
    try {
      const url = await pinata.gateways.createSignedURL({
        cid: cid,
        expires: 1800,
      });

      return url;
    } catch (error) {
      error.response
        ? setError(error.response.data.message)
        : setError(error.message);
      setOpenError(true);
    }
  };

  const logout = async (e) => {
    try {
      e.preventDefault();

      const res = await axios.get(endPoint + "/logout", {
        withCredentials: true,
      });

      if (res.data.status === "success") {
        setIsLogged(false);
        setUsername("");
        setUserPhoto("");
      }

      router.push("/aboutus");
    } catch (error) {
      error.response
        ? setError(error.response.data.message)
        : setError(error.message);
      setOpenError(true);
    }
  };

  const getUserInfoByName = async (name) => {
    try {
      const res = await axios.get(endPoint + "getUserInfoByName/" + name);

      if (res.data.status === "success") {
        return res.data;
      }
    } catch (error) {
      error.response
        ? setError(error.response.data.message)
        : setError(error.message);
      setOpenError(true);
    }
  };

  return (
    <UserAPIContext.Provider
      value={{
        signUp,
        login,
        isLogged,
        username,
        userPhoto,
        uploadUserPhoto,
        error,
        openError,
        setOpenError,
        endPoint,
        checkAuthByCookie,
        logout,
        getUserInfoByName,
        getUserPhotoUrl,
      }}
    >
      {children}
    </UserAPIContext.Provider>
  );
};
