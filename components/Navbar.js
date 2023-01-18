import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import Logo from "./Logo";
import NavItem from "./NavItem";
import styles from '../styles/Home.module.css'

const MENU_LIST = [
  { text: "Home", href: "/" },
  { text: "Pricing", href: "/pricing" },
  { text: "Docs", href: "/contact" },
  { text: "Templates", href: "/contact" },
];
const Navbar = () => {
  const [navActive, setNavActive] = useState(null);
  const [activeIdx, setActiveIdx] = useState(-1);

  return (
    <header>
      <nav className={`nav`}>
        <Link href={"/"}>
            <h1 className={styles.logo}>Meru</h1>
        </Link>
        <div
          onClick={() => setNavActive(!navActive)}
          className={`nav__menu-bar`}
        >
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className={`${navActive ? "active" : ""} nav__menu-list`}>
          {MENU_LIST.map((menu, idx) => (
            <div
              onClick={() => {
                setActiveIdx(idx);
                setNavActive(false);
              }}
              key={menu.text}
            >
              <NavItem active={activeIdx === idx} {...menu} />
            </div>
          ))}
          <Link href = '/develop'className={styles.button}>Dashboard</Link>
        </div>
        
      </nav>
    </header>
  );
};

export default Navbar;