import { cls, getWebsiteInfo } from "../utils/utils";
import s from "../styles/cart.module.scss";
import { useState } from "react";
import Message from "../components/Message";
import Loading from "../components/Loading";
import Image from "next/image";
import Link from "next/link";
import { useCartContext } from "../context/CartContext";
import { useMemo } from "react";
export default function Cart({ websiteInfo }) {
  const [alerts, setAlerts] = useState([]);
  const { cart: products, loading } = useCartContext();

  const insertAlert = (alert) => {
    if (!alerts.find((e) => e.text === alert.text)) {
      setAlerts((prev) => [...prev, ...alert]);
    }
  };

  const cartTotal = useMemo(
    () =>
      products
        .map((product) => parseInt(product.price))
        .reduce((a, b) => a + b, 0),
    [products]
  );

  const notLoading = (
    <div className="container">
      <div className={cls(s.alerts)}>
        {alerts.map((alert, idx) => (
          <Message key={idx} {...alert} />
        ))}
      </div>
      <div className="row">
        <div className="col-8 pe-2 d-flex flex-column gap-4">
          <ProductsTable products={products} />
          <CouponArea />
        </div>
        <div className="col-4 ps-2">
          <CartInfo {...{ cartTotal }} />
        </div>
      </div>
    </div>
  );

  return (
    <>
      <main className={s.main}>
        <h2 className={"title fs-1 no-line"}>سلة المشتريات</h2>
        {loading ? <Loading size={60} borderWidth="4px" /> : notLoading}
      </main>
    </>
  );
}

function ProductsTable({ products }) {
  return (
    <div className={cls(s.wrapper, s.productsTable)}>
      <table>
        <thead>
          <tr>
            <th>المنتج</th>
            <th>السعر</th>
            <th>الكمية</th>
            <th>المجموع</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <Product key={product.slug} {...product} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Product({ price, qty, book_name: title, img, id, vendor }) {
  const total = `${parseInt(price) * qty} EGP`;
  return (
    <tr className={cls(s.product)}>
      <td className={cls(s.productInfo, "d-flex gap-3 align-items-center ")}>
        <button className={s.delete} type="button">
          x
        </button>
        <Image width={55} height={75} alt={title} src={img} />
        <div style={{ fontSize: "15px" }}>
          <Link href={`/product/${id}`}>{title}</Link>
          {vendor ? (
            <p>
              البائع:
              {vendor}
            </p>
          ) : null}
        </div>
      </td>
      <td>{price}</td>
      <td>{qty}</td>
      <td>{total}</td>
    </tr>
  );
}

function CartInfo({ cartTotal }) {
  return (
    <div className={cls(s.cartInfo, s.wrapper)}>
      <h3>إجمالي المشتريات</h3>
      <p className="d-flex align-items-center justify-content-between">
        <span>المجموع</span>
        <span>{cartTotal} EGP</span>
      </p>
      <p className="d-flex align-items-center justify-content-between">
        <span>الشحن</span>
        <span></span>
      </p>
      <p className="d-flex align-items-center justify-content-between">
        <span>الإجمالي</span>
        <span>{cartTotal} EGP</span>
      </p>
      <button className={s.submitOrder} type="button">
        انتقل إلى صفحة إتمام الطلب
      </button>
    </div>
  );
}

function CouponArea() {
  return (
    <div className={cls(s.couponArea, s.wrapper, "d-flex gap-2")}>
      <div className={cls("flex-grow-1", s.couponInput)}>
        <input type="text" className="w-100 h-100" />
      </div>
      <button className={s.couponBtn} type="button">
        استخدم الكوبون
      </button>
    </div>
  );
}

export async function getStaticProps() {
  const websiteInfo = await getWebsiteInfo();

  return {
    props: {
      title: `${websiteInfo?.title} - السلة`,
    },
  };
}
