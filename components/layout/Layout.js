import React from "react";
import Navbar from "../constants/Navbar";
import Footer from "../constants/Footer";
import { Fragment } from "react";
import Header from "../constants/Header";
import classes from "./Layout.module.scss";

const Layout = (props) => {
  return (
    <div className={classes.container}>
      <div>
        <Header products={props.products} />
        <Navbar />
        <main className={classes.innerContainer}>{props.children} </main>
      </div>

      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
