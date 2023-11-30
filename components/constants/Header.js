import { useRef, useState } from "react";
import { BsBag } from "react-icons/bs";
import Link from "next/link";

import { MdOutlineSearch } from "react-icons/md";
import classes from "./Header.module.scss";
import { useRouter } from "next/router";
import { VscMenu } from "react-icons/vsc";
import { useMediaQuery } from "react-responsive";
import { useSelector } from "react-redux";
import MobileHeader from "../ui/MobileHeader";
import ProfileMenu from "../ui/ProfileMenu";

const Header = () => {
  const router = useRouter();
  const cartQuantity = useSelector((state) => state.cart.totalQuantity);
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
  const showMobileMenuHandler = () => {
    setShowMobileMenu(!showMobileMenu);
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
          <>
            <button className={classes.button} onClick={showMobileMenuHandler}>
              <VscMenu />
            </button>
            {showMobileMenu && <MobileHeader show={showMobileMenuHandler} />}
          </>
        ) : (
          <div className={classes.icons}>
            <Link href="/cart" className={classes.button}>
              <BsBag />
              {cartQuantity !== 0 && (
                <span className={classes.itemCounter}>{cartQuantity}</span>
              )}
            </Link>
            <ProfileMenu />
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
