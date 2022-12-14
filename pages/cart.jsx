import Head from "next/head";
import { cls, getWebsiteInfo } from "../utils/utils";
import s from "../styles/cart.module.scss";
import { useState } from "react";
import Message from "../components/Message";
import { useEffect } from "react";
import axios from "axios";
import Loading from "../components/Loading";
import Image from "next/image";
import Link from "next/link";
export default function Cart({ websiteInfo }) {
  const [alerts, setAlerts] = useState([]);
  const { products, loading } = useCart();

  const insertAlert = ({ text, icon, button, color }) => {
    if (!alerts.find((e) => e.text === text)) {
      setAlerts((prev) => [...prev, { text, icon, button, color }]);
    }
  };

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
          <CartInfo />
        </div>
      </div>
    </div>
  );

  return (
    <>
      <Head>
        <title>{`${websiteInfo?.title} - السلة`}</title>
      </Head>
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

function Product({ price, quantity, title, img, slug, vendor }) {
  const total = `${parseInt(price) * quantity} EGP`;
  return (
    <tr className={cls(s.product)}>
      <td className={cls(s.productInfo, "d-flex gap-3 align-items-center ")}>
        <button className={s.delete} type="button">
          x
        </button>
        <Image width={55} height={75} alt={title} src={img} />
        <div style={{ fontSize: "15px" }}>
          <Link href={`/product/${slug}`}>{title}</Link>
          <p>
            البائع:
            {vendor}
          </p>
        </div>
      </td>
      <td>{price}</td>
      <td>{quantity}</td>
      <td>{total}</td>
    </tr>
  );
}

function CartInfo() {
  return (
    <div className={cls(s.cartInfo, s.wrapper)}>
      <h3>إجمالي المشتريات</h3>
      <p className="d-flex align-items-center justify-content-between">
        <span>المجموع</span>
        <span>340.00 EGP</span>
      </p>
      <p className="d-flex align-items-center justify-content-between">
        <span>الشحن</span>
        <span></span>
      </p>
      <p className="d-flex align-items-center justify-content-between">
        <span>الإجمالي</span>
        <span>340.00 EGP</span>
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
      <input type="text" />
      <button>استخدم الكوبون</button>
    </div>
  );
}

function useCart() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState(null);
  const [error, setError] = useState(false);
  const fetchProducts = async () => {
    try {
      const res = await axios.get("/api/cart");
      if (res.data.type === "success") {
        setProducts(res.data.data);
      }
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return { loading, products, error };
}

export async function getStaticProps() {
  const websiteInfo = await getWebsiteInfo();

  return {
    props: {
      websiteInfo,
    },
  };
}
