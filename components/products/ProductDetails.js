import Image from "next/image";
import classes from "./ProductDetails.module.scss";
import { useRef, useState } from "react";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { urlFor } from "../../lib/client";
import { useMediaQuery } from "react-responsive";
import ProductDetailsMobile from "./mobile/ProductDetailsMobile";
import { useDispatch } from "react-redux";
import { cartActions } from "@/store/cart-slice";

const ProductDetails = ({ products }) => {
  const [openMenu, setOpenMenu] = useState(false);
  const [activeSize, setActiveSize] = useState(null);
  const [sizeSelected, setSizeSelected] = useState(false);
  const [sizeWarning, setSizeWarning] = useState(false);
  const dispatch = useDispatch();
  const menuRef = useRef();
  const trigRef = useRef();
  const isMobile = useMediaQuery({
    query: "(max-width: 768px)",
  });
  const triggerHandler = () => {
    setOpenMenu(!openMenu);
  };
  const sizeClickHandler = (size) => {
    setActiveSize(size);
    setSizeSelected(true);
  };
  const addToCartHandler = () => {
    if (sizeSelected) {
      setSizeWarning(false);
      dispatch(
        cartActions.addItemToCart({
          id: products[0]._id,
          title: products[0].title,
          price: products[0].price,
          image: products[0].imgUrl[0],
        })
      );
    } else {
      setSizeWarning(true);
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
            <div className={classes.sizesContainer}>
              {products[0].sizes.map((item, index) => (
                <button
                  key={index}
                  className={
                    activeSize === item
                      ? [classes.sizeBtn + " " + classes.sizeBtnActive]
                      : classes.sizeBtn
                  }
                  onClick={() => sizeClickHandler(item)}
                >
                  {item}
                </button>
              ))}
            </div>
            <button
              className={
                sizeSelected
                  ? [classes.addToCartBtn + " " + classes.validBtn]
                  : [classes.addToCartBtn + " " + classes.invalidBtn]
              }
              onClick={addToCartHandler}
            >
              <span>Add To Bag </span>
              <span>{products[0].price}</span>
            </button>
            {sizeWarning && !sizeSelected && (
              <p>Please Select a size to Add the Item to your Bag.</p>
            )}
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
