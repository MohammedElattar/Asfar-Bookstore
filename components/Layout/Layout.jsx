import React, { useState } from "react";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import s from "./Layout.module.scss";
import { BsCart3 } from "react-icons/bs";
import { FaWhatsapp } from "react-icons/fa";
import Sidebar from "../Admin/Layout/Sidebar/Sidebar";
import RequireAdmin from "../Admin/RequireAdmin/RequireAdmin";
import { useAdminContext } from "../../context/AdminContext";
import Loading from "../Loading";
import Cart from "../Cart/Cart";
function Layout({ children, admin = false, sidebar = true, websiteInfo, cartProducts, ...props }) {
  const [cartOpen, setCartOpen] = useState(false);
  const { loading } = useAdminContext();
  if (admin) {
    if (sidebar) {
      return (
        <RequireAdmin {...props}>
          <div className={s.container}>
            <Sidebar />
            {loading ? (
              <div className={s.loadingContainer}>
                <Loading size={60} borderWidth="5px" />
              </div>
            ) : (
              children
            )}
          </div>
        </RequireAdmin>
      );
    } else {
      return children;
    }
  }

  return (
    <>
      <Navbar {...websiteInfo} />
      {children}
      <div className={s.btns}>
        <button className={s.cartButton} type="button" onClick={() => setCartOpen(true)}>
          <BsCart3 />
        </button>
        <button className={s.whatsapp} type="button">
          <FaWhatsapp />
        </button>
      </div>
      <Cart {...{ cartOpen, setCartOpen, cartProducts }} />
      <div
        className={`${s.overlay} ${cartOpen ? s.overlayActive : ""}`}
        onClick={() => setCartOpen(false)}
      ></div>

      <Footer {...websiteInfo} />
    </>
  );
}

export default Layout;
