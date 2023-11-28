import classes from "./Footer.module.scss";
import { BiLogoInstagram, BiLogoFacebookSquare, BiPhone } from "react-icons/bi";
import { MdOutlineLocationOn } from "react-icons/md";
import { HiOutlineMail } from "react-icons/hi";
import Link from "next/link";

const Footer = () => {
  return (
    <div className={classes.container}>
      <div className={classes.columnContainer}>
        <h3>BrandName</h3>
        <Link href="/" target="_blank">
          <BiLogoInstagram className={classes.icon} />
        </Link>
        <Link href="/" target="_blank">
          <BiLogoFacebookSquare className={classes.icon} />
        </Link>
      </div>
      <div className={classes.columnContainer}>
        <h3>Info</h3>
        <div className={classes.rowContainer}>
          <MdOutlineLocationOn className={classes.icon} />
          <span>Address</span>
        </div>

        <div className={classes.rowContainer}>
          <BiPhone className={classes.icon} />
          <span>Phone Number</span>
        </div>
        <Link href="" className={classes.rowContainer}>
          <HiOutlineMail className={classes.icon} />
          <span>Mail Address</span>
        </Link>
      </div>
    </div>
  );
};

export default Footer;
