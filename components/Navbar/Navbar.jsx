import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { FaSearch, FaBars } from "react-icons/fa";
import styles from "./Navbar.module.scss";
import { IoClose } from "react-icons/io5";
function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const open = () => {
    setIsOpen(true);
  };
  const close = () => {
    setIsOpen(false);
  };
  return (
    <div className={styles.navbar}>
      <div className={styles.container + " container"}>
        {isOpen ? (
          <button
            type="button"
            style={{ fontSize: "30px" }}
            className={styles.toggleMenu}
            onClick={close}
          >
            <IoClose />
          </button>
        ) : (
          <button className={styles.toggleMenu} onClick={open} type="button">
            <FaBars />
          </button>
        )}

        <Link href='/' className={styles.logo}>
          <Image
            src="/images/asfar-logo.png"
            width={130}
            height={40}
            alt="logo"
            priority
          />
        </Link>
        <Link href="/products/1" className={styles.searchBook}>
          <FaSearch />
          ابحث عن كتاب
        </Link>
      </div>
      <ul className={`${styles.menu} ${isOpen ? styles.active : ""}`}>
        <li>
          <Link href={"/"}>الصفحة الرئيسية</Link>
        </li>
        <li>
          <Link href={"/cart"}>سلة المشتريات</Link>
        </li>
        <li>
          <Link href={"/order-services"}>الدعم الفني للطلبات</Link>
        </li>
        <li>
          <Link href='/signup'>عضو جديد؟ سجل الآن!</Link>
        </li>
        <li>
          <Link href='/login'>سجل الدخول</Link>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
