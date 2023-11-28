import React from "react";
import classes from "./Cart.module.scss";
import Link from "next/link";

import { BsChevronLeft } from "react-icons/bs";
import CartItem from "./CartItem";
import PrimaryButton from "../ui/PrimaryButton";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { useSelector } from "react-redux";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const cartQuantity = useSelector((state) => state.cart.totalQuantity);
  return (
    <div className={classes.wrapper}>
      <div className={classes.container}>
        <div className={classes.cartTop}>
          <button className={classes.topButton}>
            <BsChevronLeft />
            <span className={classes.heading}>Your Cart</span>
            <span className={classes.numberOfItems}>
              ({cartQuantity} items)
            </span>
          </button>
        </div>
        <div className={classes.cartMiddle}>
          {cartQuantity === 0 && (
            <div className={classes.emptyCart}>
              <HiOutlineShoppingBag className={classes.shoppingBagIcon} />
              <h3> Your Shopping bag is empty </h3>

              <Link href="/">
                <PrimaryButton type="button">Continue Shopping</PrimaryButton>
              </Link>
            </div>
          )}
          <ul className={classes.productContainer}>
            {cartItems.map((item) => (
              <CartItem
                key={item.id}
                item={{
                  id: item.id,
                  title: item.title,
                  image: item.image,
                  quantity: item.quantity,
                  totalPrice: item.totalPrice,
                  price: item.price,
                }}
              />
            ))}
          </ul>
        </div>

        {cartQuantity !== 0 && (
          <div className={classes.cartBottom}>
            <div className={classes.totalPrice}>
              <h3>Subtotal: </h3>
              <h3>$ Total Price will be Here</h3>
            </div>
            <div className={classes.buttonContainer}>
              <PrimaryButton type="button">Pay with Stripe</PrimaryButton>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
