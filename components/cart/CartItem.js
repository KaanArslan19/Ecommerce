import React from "react";
import { urlFor } from "../../lib/client";
import { MdOutlineCancel, MdAdd, MdRemove } from "react-icons/md";
import classes from "./CartItem.module.scss";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { cartActions } from "@/store/cart-slice";
const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  const addItemHandler = () => {
    dispatch(
      cartActions.addItemToCart({
        id: item.id,
        title: item.title,
        price: item.price,
      })
    );
  };
  const removeItemHandler = () => {
    dispatch(cartActions.removeItemFromCart(item.id));
  };
  const deleteItemHandler = () => {
    dispatch(cartActions.deleteItemFromCart(item.id));
  };
  return (
    <li className={classes.container}>
      <div className={classes.itemContainer}>
        <div className={classes.imgBox}>
          <Image
            src={urlFor(item.image).url()}
            fill="true"
            style={{ objectFit: "contain" }}
            alt={item.title}
            sizes="10vw"
          />
        </div>
        <div className={classes.contentContainer}>
          <header className={classes.itemHeader}>
            <h3>{item.title}</h3>
            <div className={classes.price}>${item.totalPrice}</div>
          </header>
          <div className={classes.numContainer}>
            <div className={classes.details}>
              <button
                className={classes.itemButton}
                onClick={removeItemHandler}
              >
                <MdRemove />
              </button>
              <span>{item.quantity}</span>
              <button className={classes.itemButton} onClick={addItemHandler}>
                <MdAdd className={classes.icon} />
              </button>
            </div>
            <button onClick={deleteItemHandler}>
              <MdOutlineCancel className={classes.icon} />
            </button>
          </div>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
