import Link from "next/link";
import classes from "./Navbar.module.scss";
const NavItems = [
  { name: "New Arrivals", url: "/new-arrivals" },
  { name: "Ready to Wear", url: "/ready-to-wear" },
  { name: "Community", url: "/community" },
];

const Navbar = () => {
  return (
    <div className={classes.container}>
      <ul className={classes.nav__link_menu}>
        <div className={classes.nav__link_dropdown}>
          {NavItems.map((item, index) => (
            <li key={index}>
              <Link href={item.url} className={classes.nav__link_item_button}>
                {item.name}
              </Link>
            </li>
          ))}
        </div>
      </ul>
    </div>
  );
};

export default Navbar;
