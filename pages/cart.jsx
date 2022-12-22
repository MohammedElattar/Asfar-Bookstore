import { apiHttp, cls, getWebsiteInfo } from "../utils/utils";
import s from "../styles/cart.module.scss";
import { useState } from "react";
import Loading from "../components/Loading";
import { GrFormClose } from "react-icons/gr";
import Link from "next/link";
import { useCartContext } from "../context/CartContext";
import { useEffect } from "react";
import ImageZoom from "../components/ImageZoom";
import Message from "../components/Message";
import { BiWindow } from "react-icons/bi";
import { BsCheck } from "react-icons/bs";
import useAlerts from "../hooks/useAlerts";

//

//

//

export default function Cart() {
  const { cart: products, loading: cartLoading } = useCartContext();
  const [loading, setLoading] = useState(false);
  const { alerts, insertAlert } = useAlerts();

  return (
    <>
      <main className={s.main}>
        <h2 className={"title fs-1 no-line"}>سلة المشتريات</h2>
        <div className="container">
          <div className={s.alerts}>
            {alerts.map((alert) => (
              <Message {...alert} key={alert.text} />
            ))}
          </div>
          {cartLoading ? (
            <Loading size={60} borderWidth="4px" />
          ) : products.length === 0 ? (
            <>
              <Message
                icon={
                  <BiWindow style={{ color: "#1e85be", fontSize: "20px" }} />
                }
                text={`سلة مشترياتك فارغة حاليًا.`}
              />
              <Link href={`/products/1`} className={s.returnToShopBtn}>
                العودة إلى المتجر
              </Link>
            </>
          ) : (
            <div className="row">
              <div className="col-8 pe-2 d-flex flex-column gap-4">
                <ProductsTable
                  {...{ products, loading, setLoading, insertAlert }}
                />
                <CouponArea {...{ loading, setLoading }} />
              </div>
              <div className="col-4 ps-2">
                <CartInfo {...{ loading, setLoading }} />
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}

function ProductsTable({ products, loading, setLoading, insertAlert }) {
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
            <Product
              key={product.book_id || product.slug}
              {...{ ...product, loading, setLoading, insertAlert }}
            />
          ))}
        </tbody>
      </table>
      <LoadingWrapper loading={loading} />
    </div>
  );
}

function Product({
  price,
  qty,
  book_name: title,
  img,
  book_id: id,
  vendor,
  setLoading,
  loading,
  insertAlert,
}) {
  const { setCart } = useCartContext();
  const handleDelete = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const res = await apiHttp.delete(process.env.NEXT_PUBLIC_CART, {
        data: [id],
      });

      console.log(`Delete Response =>`, res);
      if (res.status === 200) {
        setCart((prev) => prev.filter((product) => product.book_id !== id));
      }
    } catch (err) {
      console.log(`Delete Error =>`, err);
    } finally {
      setLoading(false);
    }
  };

  const total = `${parseInt(price) * qty} EGP`;
  return (
    <tr className={cls(s.product)}>
      <td className={cls(s.productInfo, "d-flex gap-3 align-items-center ")}>
        <button className={s.delete} type="button" onClick={handleDelete}>
          <GrFormClose />
        </button>
        <ImageZoom
          src={img}
          alt={title}
          style={{ width: "60px", height: "80px" }}
        />
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
      <td>
        <QtyInput {...{ setLoading, loading, qty, id, insertAlert }} />
      </td>
      <td>{total}</td>
    </tr>
  );
}

function LoadingWrapper({ loading }) {
  return (
    <div className={cls(s.loading, loading ? s.loadingActive : "")}>
      <div className={cls(s.loadingWrapper)}>
        <span></span>
        <span style={{ animationDelay: "300ms" }}></span>
        <span style={{ animationDelay: "600ms" }}></span>
      </div>
    </div>
  );
}

function CartInfo({ loading, setLoading }) {
  const { cart } = useCartContext();
  const cartTotal = cart
    .map((product) => parseInt(product.price) * product.qty)
    .reduce((a, b) => a + b, 0);
  const shippingFee = 50;
  return (
    <div className={cls(s.cartInfo, s.wrapper)}>
      <h3>إجمالي المشتريات</h3>
      <p className="d-flex align-items-center justify-content-between">
        <span>المجموع</span>
        <span>{cartTotal} EGP</span>
      </p>
      <p className="d-flex align-items-center justify-content-between">
        <span>الشحن</span>
        <span>{shippingFee} EGP</span>
      </p>
      <p className="d-flex align-items-center justify-content-between">
        <span>الإجمالي</span>
        <span>{cartTotal + shippingFee} EGP</span>
      </p>
      <Link href="/checkout" className={s.submitOrder} type="button">
        انتقل إلى صفحة إتمام الطلب
      </Link>
      <LoadingWrapper loading={loading} />
    </div>
  );
}

function QtyInput({ qty: productQty, id, loading, setLoading, insertAlert }) {
  const { setCart } = useCartContext();
  const [qty, setQty] = useState(productQty);
  const maxQty = 20;

  const updateQty = async (qty) => {
    if (loading) return;
    setLoading(true);
    try {
      const res = await apiHttp.post(process.env.NEXT_PUBLIC_CART, {
        [id]: { qty },
      });
      console.log(`Update Qty Response =>`, res);
      if (res.status === 200) {
        setCart((prev) =>
          prev.map((product) => {
            if (product.book_id == id) {
              return { ...product, qty };
            }
            return product;
          })
        );
        insertAlert.success("تم تحديث سلة المشتريات.", { overwrite: true });
      }
    } catch (err) {
      console.log(`Update Qty Error =>`, err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const newQty = e.target.value;
    if (+newQty <= maxQty && newQty >= 1) {
      setQty(newQty);
      updateQty(newQty);
    }
  };

  useEffect(() => {
    setQty(productQty);
  }, [productQty]);

  return (
    <div className={cls(s.qtyInput)}>
      <input
        type="number"
        onChange={handleChange}
        value={qty}
        min={1}
        max={20}
      />
    </div>
  );
}

function CouponArea({ loading }) {
  return (
    <div className={cls(s.couponArea, s.wrapper, "d-flex gap-2")}>
      <div className={cls("flex-grow-1", s.couponInput)}>
        <input type="text" className="w-100 h-100" />
      </div>
      <button className={s.couponBtn} type="button">
        استخدم الكوبون
      </button>
      <LoadingWrapper loading={loading} />
    </div>
  );
}

export async function getStaticProps() {
  const websiteInfo = await getWebsiteInfo();

  return {
    props: {
      title: `${websiteInfo?.title} - سلة المشتريات`,
    },
  };
}
