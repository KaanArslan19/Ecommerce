import Image from "next/image";
import classes from "./ProductDetails.module.scss";
import { useRef, useState } from "react";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { urlFor } from "../../lib/client";
import { useMediaQuery } from "react-responsive";
import ProductDetailsMobile from "./mobile/ProductDetailsMobile";

const ProductDetails = ({ products }) => {
  const [openMenu, setOpenMenu] = useState(false);
  const menuRef = useRef();
  const trigRef = useRef();
  const isMobile = useMediaQuery({
    query: "(max-width: 768px)",
  });
  const triggerHandler = () => {
    setOpenMenu(true);
    if (openMenu) {
      setOpenMenu(false);
    }
  };

  return (
    <>
      {isMobile ? (
        <ProductDetailsMobile products={products} />
      ) : (
        <section className={classes.container}>
          <div className={classes.left}>
            <h1>{products[0].title}</h1>
            <span>${products[0].price}</span>
          </div>
          <div className={classes.imgBox}>
            <Image
              src={urlFor(products[0].imgUrl[0]).url()}
              fill="true"
              style={{ objectFit: "contain" }}
              alt={products[0].title}
              sizes="100vw"
            />
          </div>
          <div className={classes.right}>
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
            <div
              className={classes.trigger}
              ref={trigRef}
              onClick={triggerHandler}
            >
              <h5> Product Details and Sizing</h5>
              <MdOutlineArrowDropDown
                className={
                  openMenu
                    ? [classes.icon + " " + classes.iconActive]
                    : classes.icon
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
          </div>
        </section>
      )}
    </>
  );
};

export default ProductDetails;
