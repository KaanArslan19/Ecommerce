import React from "react";

import { MdOutlineCancel } from "react-icons/md";

import classes from "./CartItem.module.scss";
import Image from "next/image";
const CartItem = () => {
  return (
    <li className={classes.items}>
      <div className={classes.itemContainer}>
        <div className={classes.imageContainer}>
          <Image
            src="/images/body_suit.jpeg"
            width={200}
            height={200}
            alt="dummy"
          />
        </div>
        <div className={classes.contentContainer}>
          <header className={classes.itemHeader}>
            <h3>Title</h3>
            <div className={classes.price}>$Total Price</div>
          </header>
          <div className={classes.numContainer}>
            <div className={classes.details}>
              <button className={classes.itemButton}>-</button>
              <p className={classes.borders}></p>
              <span>QTY</span>
              <p className={classes.borders}></p>

              <button className={classes.itemButton}>+</button>
            </div>
            <MdOutlineCancel />
          </div>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
