import { apiHttp, cls, getWebsiteInfo } from "../utils/utils";
import s from "../styles/cart.module.scss";
import { useState } from "react";
import Loading from "../components/Loading";
import { GrFormClose } from "react-icons/gr";
import Link from "next/link";
import { useCartContext } from "../context/CartContext";
import { useEffect } from "react";
import ImageZoom from "../components/ImageZoom";
export default function Cart({ websiteInfo }) {
  const { cart: products, cartLoading } = useCartContext();
  const [loading, setLoading] = useState(false);
  const cartTotal = products
    .map((product) => parseInt(product.price))
    .reduce((a, b) => a + b, 0);

  const notLoading = (
    <div className="container">
      <div className="row">
        <div className="col-8 pe-2 d-flex flex-column gap-4">
          <ProductsTable {...{ products, loading, setLoading }} />
          <CouponArea {...{ loading, setLoading }} />
        </div>
        <div className="col-4 ps-2">
          <CartInfo {...{ cartTotal, loading, setLoading }} />
        </div>
      </div>
    </div>
  );

  return (
    <>
      <main className={s.main}>
        <h2 className={"title fs-1 no-line"}>سلة المشتريات</h2>
        {cartLoading ? <Loading size={60} borderWidth="4px" /> : notLoading}
      </main>
    </>
  );
}

function ProductsTable({ products, loading, setLoading }) {
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
              key={product.slug}
              {...{ ...product, loading, setLoading }}
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
}) {
  const { setCart } = useCartContext();
  const handleDelete = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const res = await apiHttp.delete(process.env.NEXT_PUBLIC_CART, [
        id.toString(),
      ]);
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
        <QtyInput {...{ setLoading, loading, qty, id }} />
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

function CartInfo({ cartTotal, loading, setLoading }) {
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
      <LoadingWrapper loading={loading} />
    </div>
  );
}

function QtyInput({ qty: productQty, id, loading, setLoading }) {
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
