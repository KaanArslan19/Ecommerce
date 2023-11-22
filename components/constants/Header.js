import { useRef, useState } from "react";
import { BsBag } from "react-icons/bs";
import Link from "next/link";

import { MdOutlineSearch } from "react-icons/md";
import { VscAccount } from "react-icons/vsc";
import { AiOutlineLogout } from "react-icons/ai";
import classes from "./Header.module.scss";
import Cart from "../cart/Cart";
import { useRouter } from "next/router";
import { VscMenu } from "react-icons/vsc";
import { useMediaQuery } from "react-responsive";
const Header = () => {
  const router = useRouter();
  const [showCart, setShowCart] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const searchInputRef = useRef();
  const [enteredValue, setEnteredValue] = useState("");

  const [searchInputClicked, setSearchInputClicked] = useState(false);
  const isMobile = useMediaQuery({
    query: "(max-width: 768px)",
  });
  const inputChangeHandler = (event) => {
    setEnteredValue(event.target.value);
  };
  const inputClickHandler = () => {
    setSearchInputClicked(!searchInputClicked);
  };
  const searchButtonHandler = () => {
    if (enteredValue.trim() === "") {
      return;
    }
    router.push("/search/" + enteredValue);
    setEnteredValue("");
  };
  const showMobileMenuHandler = () => {};

  const signOutHandler = () => {
    signOut();
  };
  const showCartHandler = () => {
    setShowCart(!showCart);
  };

  return (
    <div className={classes.container}>
      <div className={classes.innerContainer}>
        <div>
          <Link href="/" className={classes.nav__link_item_button}>
            <h1>BrandName</h1>
          </Link>
        </div>

        {isMobile ? (
          <button className={classes.button} onClick={showMobileMenuHandler}>
            <VscMenu />
          </button>
        ) : (
          <div className={classes.icons}>
            <Link href="/auth" className={classes.button}>
              <VscAccount />
            </Link>
            <button onClick={showCartHandler} className={classes.button}>
              <BsBag />
            </button>

            {showCart && <Cart show={showCartHandler} />}
          </div>
        )}
      </div>

      <div className={classes.inputContainer}>
        <input
          type="text"
          maxLength={25}
          ref={searchInputRef}
          value={enteredValue}
          placeholder="Search"
          name="search"
          id="search"
          onChange={inputChangeHandler}
          onClick={inputClickHandler}
          className={classes.input}
        />

        <button onClick={searchButtonHandler} className={classes.searchButton}>
          <MdOutlineSearch />
        </button>
      </div>
    </div>
  );
};

export default Header;
