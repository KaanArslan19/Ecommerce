import Image from "next/image";
import classes from "./ProductDetailsMobile.module.scss";
import { urlFor } from "../../../lib/client";
import { useRef, useState } from "react";
import { MdOutlineArrowDropDown } from "react-icons/md";

const ProductDetailsMobile = ({ products }) => {
  const trigRef = useRef();
  const menuRef = useRef();

  const [openMenu, setOpenMenu] = useState(false);
  const triggerHandler = () => {
    setOpenMenu(true);
    if (openMenu) {
      setOpenMenu(false);
    }
  };
  return (
    <section className={classes.container}>
      <div className={classes.imgBox}>
        <Image
          src={urlFor(products[0].imgUrl[0]).url()}
          fill="true"
          style={{ objectFit: "contain" }}
          alt={products[0].title}
          sizes="100vw"
        />
      </div>

      <h1>{products[0].title}</h1>
      <span>${products[0].price}</span>
      <div className={classes.comboContainer}>
        <select className={classes.combo}>
          <option>Select Size</option>
          <option>XS</option>
          <option>S</option>
          <option>M</option>
          <option>L</option>
          <option>XL</option>
        </select>
      </div>
      <div className={classes.trigger} ref={trigRef} onClick={triggerHandler}>
        <h5> Product Details and Sizing</h5>
        <MdOutlineArrowDropDown
          className={
            openMenu ? [classes.icon + " " + classes.iconActive] : classes.icon
          }
        />
      </div>
      {openMenu && (
        <div className={classes.dropdown} ref={menuRef}>
          <ul>
            <li>Product Features1</li>
            <li>Product Features2</li>
            <li>Product Features3</li>
          </ul>
        </div>
      )}
    </section>
  );
};

export default ProductDetailsMobile;
