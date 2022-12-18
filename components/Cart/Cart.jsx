import Link from "next/link";
import { useState } from "react";
import { useEffect } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { useAuthContext } from "../../context/AuthContext";
import { useCartContext } from "../../context/CartContext";
import { apiHttp, cls } from "../../utils/utils";
import s from "./Cart.module.scss";
import CartItem from "./CartItem";

export default function Cart({ cartOpen, setCartOpen }) {
  const { user } = useAuthContext();
  const { cart: products } = useCartContext();

  const calcTotal = () => {
    return products
      .map((product) => {
        return parseInt(product.price) * product.qty;
      })
      .reduce((prev, current) => prev + current, 0);
  };

  return (
    <div className={cls(s.cart, cartOpen ? s.cartActive : "")}>
      <header>
        <button onClick={() => setCartOpen(false)}>
          <IoCloseSharp />
        </button>
      </header>
      {products.length === 0 ? (
        <p className="text-center fs-5">لا توجد منتجات.</p>
      ) : (
        <>
          <div className={s.body}>
            <div className={s.products}>
              {products.map((product) => (
                <CartItem key={product.id} {...product} />
              ))}
            </div>
          </div>
          <div className={s.total}>المجموع: {calcTotal()} EGP</div>
          <div className={s.btns}>
            <Link href={`/cart`}>عرض السلة</Link>
            <Link href={`/cart/checkout`}>إتمام الطلب</Link>
          </div>
        </>
      )}
    </div>
  );
}
