import classes from "./ProfileMenu.module.scss";
import { useState } from "react";
import {
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Spinner,
} from "@material-tailwind/react";
import { VscChevronDown, VscAccount } from "react-icons/vsc";
import { PiChartBarLight } from "react-icons/pi";
import { FiLogOut } from "react-icons/fi";
import Link from "next/link";
import { BsBag } from "react-icons/bs";
import useAuth from "@/hooks/useAuth";
const ProfileMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeMenu = () => setIsMenuOpen(false);
  const { isAdmin, loggedIn, loading } = useAuth();
  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen}>
      <MenuHandler>
        <button className={classes.profileBtn}>
          <VscAccount className={classes.icon} />
          {loggedIn && (
            <VscChevronDown
              strokeWidth={2.5}
              className={`h-3 w-3 transition-transform ${
                isMenuOpen ? "rotate-180" : ""
              }`}
            />
          )}
        </button>
      </MenuHandler>

      {loading ? (
        <Spinner />
      ) : (
        <MenuList className="p-1">
          <Link href="/profile" className={classes.menuItemContainer}>
            <MenuItem onClick={closeMenu} className={classes.menuItem}>
              <VscAccount className={classes.icon} />
              <span>My Profile</span>
            </MenuItem>
          </Link>
          <Link href="/profile/orders" className={classes.menuItemContainer}>
            <MenuItem onClick={closeMenu} className={classes.menuItem}>
              <BsBag className={classes.icon} />
              <span>Orders</span>
            </MenuItem>
          </Link>

          {isAdmin ? (
            <Link href="/dashboard" className={classes.menuItemContainer}>
              <MenuItem onClick={closeMenu} className={classes.menuItem}>
                <PiChartBarLight className={classes.icon} />
                <span>Dashboard</span>
              </MenuItem>
            </Link>
          ) : null}
          <Link href="/" className={classes.menuItemContainer}>
            <MenuItem className={classes.menuItem}>
              <p className="flex items-center gap-2 rounded">
                <FiLogOut />
                <span>Sign Out</span>
              </p>
            </MenuItem>
          </Link>
        </MenuList>
      )}
    </Menu>
  );
};

export default ProfileMenu;
