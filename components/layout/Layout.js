import React from "react";
import Navbar from "../constants/Navbar";
import { Fragment } from "react";
import Header from "../constants/Header";
import classes from "./Layout.module.scss";

const Layout = (props) => {
  return (
    <Fragment>
      <Header products={props.products} />
      <Navbar />
      <main className={classes.innerContainer}>{props.children} </main>
    </Fragment>
  );
};

export default Layout;
