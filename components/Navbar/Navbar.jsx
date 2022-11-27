import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaSearch, FaBars } from "react-icons/fa";
import styles from "./Navbar.module.scss";
import { IoClose } from "react-icons/io5";
import { auth } from "../../utils/firebase.js";
import { signOut } from "firebase/auth";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const user = useSelector((state) => state.user.user);
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

        <Link href="/" className={styles.logo}>
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
      {user ? (
        <MenuWithUser isOpen={isOpen} close={close} user={user} />
      ) : (
        <MenuWithoutUser isOpen={isOpen} close={close} />
      )}
    </div>
  );
}

function MenuWithUser({ isOpen, user, close }) {
  const router = useRouter();

  const signout = () => {
    signOut(auth);
    close();
    router.reload();
  };

  return (
    <ul
      className={`${styles.menu} ${isOpen ? styles.active : ""}`}
      onClick={close}
    >
      <li>
        <Link href="/">الصفحة الرئيسية</Link>
      </li>
      <li>
        <Link href="/my-account">مرحبًا {user?.name}</Link>
      </li>
      <li>
        <Link href="/cart">سلة المشتريات</Link>
      </li>
      <li>
        <Link href="/my-account">حسابي</Link>
      </li>
      <li>
        <Link href="/order-services">الدعم الفني للطلبات</Link>
      </li>
      <li>
        <Link href="/my-account/orders">الطلبات</Link>
      </li>
      <li>
        <Link href="/my-account/edit-address">عناويني</Link>
      </li>
      <li>
        <Link href="/" onClick={signout}>
          سجل الخروج
        </Link>
      </li>
    </ul>
  );
}
function MenuWithoutUser({ isOpen, close }) {
  return (
    <ul
      className={`${styles.menu} ${isOpen ? styles.active : ""}`}
      onClick={close}
    >
      <li>
        <Link href="/">الصفحة الرئيسية</Link>
      </li>
      <li>
        <Link href="/cart">سلة المشتريات</Link>
      </li>
      <li>
        <Link href="/order-services">الدعم الفني للطلبات</Link>
      </li>
      <li>
        <Link href="/signup">عضو جديد؟ سجل الآن!</Link>
      </li>
      <li>
        <Link href="/login">سجل الدخول</Link>
      </li>
    </ul>
  );
}

export default Navbar;
