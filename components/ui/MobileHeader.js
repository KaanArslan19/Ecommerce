import classes from "./MobileHeader.module.scss";
import {
  Drawer,
  List,
  ListItem,
  ListItemPrefix,
} from "@material-tailwind/react";

import { VscAccount, VscClose } from "react-icons/vsc";
import { BsBag } from "react-icons/bs";

import { PiChartBarLight } from "react-icons/pi";
import { FiLogOut } from "react-icons/fi";
import Link from "next/link";
import useAuth from "@/hooks/useAuth";
import SignOutButton from "./SignOutButton";

const MobileHeader = ({ show }) => {
  const showCartHandler = () => {
    show();
  };

  const { isAdmin, loggedIn } = useAuth();
  return (
    <Drawer open={open} onClose={showCartHandler}>
      <div className="mb-2 flex items-center justify-between p-4 z-50">
        <h5 className={classes.title}>BrandName</h5>
        <button onClick={showCartHandler}>
          <VscClose strokeWidth={2} className={classes.icon} />
        </button>
      </div>
      <List>
        <Link href="/profile">
          <ListItem onClick={showCartHandler} className={classes.listItem}>
            <ListItemPrefix>
              <VscAccount className={classes.icon} />
            </ListItemPrefix>
            Profile
          </ListItem>
        </Link>
        <Link href="/profile/orders">
          <ListItem onClick={showCartHandler} className={classes.listItem}>
            <ListItemPrefix>
              <BsBag className={classes.icon} />
            </ListItemPrefix>
            Orders
          </ListItem>
        </Link>
        {isAdmin ? (
          <Link href="/dashboard">
            <ListItem onClick={showCartHandler} className={classes.listItem}>
              <ListItemPrefix>
                <PiChartBarLight className={classes.icon} />
              </ListItemPrefix>
              Dashboard
            </ListItem>
          </Link>
        ) : null}

        {loggedIn ? (
          <SignOutButton>
            <ListItem className={classes.listItem}>
              <ListItemPrefix>
                <FiLogOut className={classes.icon} />
              </ListItemPrefix>
              Sign Out
            </ListItem>
          </SignOutButton>
        ) : (
          <div className="flex items-center">
            <Link className="px-4 py-1 flex-1 text-center" href="/auth/signin">
              Sign in
            </Link>
            <Link
              className="bg-primary-color text-white px-4 py-1 rounded flex-1 text-center"
              href="/auth/signup"
            >
              Sign up
            </Link>
          </div>
        )}
      </List>
    </Drawer>
  );
};

export default MobileHeader;
