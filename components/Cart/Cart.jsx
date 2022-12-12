import Link from "next/link";
import { IoCloseSharp } from "react-icons/io5";
import s from "./Cart.module.scss";
import CartItem from "./CartItem";

export default function Cart({ cartOpen, setCartOpen, cartProducts }) {
  const calcTotal = () => {
    return cartProducts
      .map((product) => {
        return parseInt(product.price) * product.quantity;
      })
      .reduce((prev, current) => prev + current, 0);
  };

  return (
    <div className={`${s.cart} ${cartOpen ? s.cartActive : ""}`}>
      <header>
        <button onClick={() => setCartOpen(false)}>
          <IoCloseSharp />
        </button>
      </header>
      {!cartProducts?.length ? (
        <p className="text-center fs-5">لا توجد منتجات.</p>
      ) : (
        <>
          <div className={s.body}>
            <div className={s.products}>
              {cartProducts.map((product) => (
                <CartItem key={product.slug} {...product} />
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
