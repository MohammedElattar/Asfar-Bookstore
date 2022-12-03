import React, { useState } from "react";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import s from "./Layout.module.scss";
import { BsCart3 } from "react-icons/bs";
import { FaWhatsapp } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import Container from "../Admin/Layout/Sidebar/Container/Container";
import Sidebar from "../Admin/Layout/Sidebar/Sidebar";
function Layout({ children, admin = false, sidebar = true }) {
  const [cartOpen, setCartOpen] = useState(false);

  if (admin)
    if (sidebar) {
      return (
        <>
          <Container>
            <Sidebar />
            {children}
          </Container>
        </>
      );
    } else {
      return children;
    }

  return (
    <>
      <Navbar />
      {children}
      <div className={s.btns}>
        <button
          className={s.cartButton}
          type="button"
          onClick={() => setCartOpen(true)}
        >
          <BsCart3 />
        </button>
        <button className={s.whatsapp} type="button">
          <FaWhatsapp />
        </button>
      </div>
      <div className={`${s.cart} ${cartOpen ? s.cartActive : ""}`}>
        <header>
          <button onClick={() => setCartOpen(false)}>
            <IoCloseSharp />
          </button>
        </header>
        <p className="text-center fs-5">لا توجد منتجات.</p>
      </div>
      <div
        className={`${s.overlay} ${cartOpen ? s.overlayActive : ""}`}
        onClick={() => setCartOpen(false)}
      ></div>

      <Footer />
    </>
  );
}

export default Layout;
