import React from "react";
import classes from "./Cart.module.scss";
import Link from "next/link";

import { BsChevronLeft } from "react-icons/bs";
import CartItem from "./CartItem";
import PrimaryButton from "../ui/PrimaryButton";
import { HiOutlineShoppingBag } from "react-icons/hi";

const Cart = (props) => {
  const showCartHandler = () => {
    props.show();
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.container}>
        <div className={classes.cartTop}>
          <button className={classes.topButton} onClick={showCartHandler}>
            <BsChevronLeft />
            <span className={classes.heading}>Your Cart</span>
            <span className={classes.numberOfItems}>({10} items)</span>
          </button>
        </div>
        <div className={classes.cartMiddle}>
          <div className={classes.emptyCart}>
            <HiOutlineShoppingBag className={classes.shoppingBagIcon} />
            <h3> Your Shopping bag is empty </h3>

            <Link href="/">
              <PrimaryButton type="button" onClick={showCartHandler}>
                Continue Shopping
              </PrimaryButton>
            </Link>
          </div>
          <div className={classes.productContainer}>
            <CartItem />
          </div>
        </div>

        <div className={classes.cartBottom}>
          <div className={classes.totalPrice}>
            <h3>Subtotal: </h3>
            <h3>$ Total Price will be Here</h3>
          </div>
          <div className={classes.buttonContainer}>
            <PrimaryButton type="button">Pay with Stripe</PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
