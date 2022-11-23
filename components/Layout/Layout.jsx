import React from "react";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import s from "./Layout.module.scss";
import { BsCart3 } from "react-icons/bs";
import { FaWhatsapp } from "react-icons/fa";
function Layout({ children }) {
  return (
    <div>
      <Navbar />
      {children}
      <div className={s.btns}>
        <button className={s.cart} type="button">
          <BsCart3 />
        </button>
        <button className={s.whatsapp} type="button">
          <FaWhatsapp />
        </button>
      </div>
      <Footer />
    </div>
  );
}

export default Layout;
