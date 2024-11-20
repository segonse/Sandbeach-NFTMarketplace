import React from "react";
import Image from "next/image";
import { BsCircleFill } from "react-icons/bs";

import Style from "./Category.module.css";
import images from "@/img";

const Category = () => {
  const CategoryArray = [
    images.creatorbackground1,
    images.creatorbackground10,
    images.creatorbackground11,
    images.creatorbackground2,
    images.creatorbackground4,
    images.creatorbackground5,
  ];

  return (
    <div className={Style.box_category}>
      <div className={Style.category}>
        {CategoryArray.map((el, i) => (
          <div className={Style.category_box} key={i + 1}>
            <div className={Style.category_box_img}>
              <Image
                src={el}
                className={Style.category_box_img_img}
                alt="Backgroud image"
                objectFit="cover"
              />
            </div>

            <div className={Style.category_box_title}>
              <span>
                <BsCircleFill />
              </span>
              <div className={Style.category_box_title_info}>
                <h4>Enterainment</h4>
                <small>1995 NTFs </small>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
