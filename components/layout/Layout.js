import React from "react";
import Navbar from "../constants/Navbar";
import Footer from "../constants/Footer";
import Header from "../constants/Header";
import classes from "./Layout.module.scss";
import Notification from "../ui/Notification";

const Layout = (props) => {
  return (
    <div className={classes.container}>
      <div>
        <Header products={props.products} />
        <Navbar />
        <main className={classes.innerContainer}>{props.children} </main>
        <Notification />
      </div>

      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
