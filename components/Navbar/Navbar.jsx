import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaSearch, FaBars } from "react-icons/fa";
import styles from "./Navbar.module.scss";
function Navbar() {
  return (
    <div className={styles.navbar}>
      <div className={styles.container + " container"}>
        <button className={styles.toggleMenu} type="button">
          <FaBars />
        </button>

        <div className={styles.logo}>
          <Image
            src="/images/asfar-logo.png"
            width={130}
            height={40}
            alt="logo"
            priority
          />
        </div>
        <Link
          href="/search-book"
          className={styles.searchBook + " text-primary text-decoration-none"}
        >
          <FaSearch />
          ابحث عن كتاب
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
