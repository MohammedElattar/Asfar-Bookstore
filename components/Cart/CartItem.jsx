import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";
import { useCartContext } from "../../context/CartContext";
import { apiHttp } from "../../utils/utils";
import s from "./Cart.module.scss";
function CartItem({ book_name: title, img, vendor, price, qty, book_id: id }) {
  const [loading, setLoading] = useState(false);
  const { setCart } = useCartContext();
  const handleDelete = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const res = await apiHttp.delete(process.env.NEXT_PUBLIC_CART, {
        data: [id],
      });
      console.log([id]);

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

  return (
    <div className={s.product}>
      <Link href={`/product/${id}`}>
        <Image src={img} alt={title} width={73} height={100} />
      </Link>
      <div className={s.text}>
        <Link className={s.title} href={`/product/${id}`}>
          {title}
        </Link>
        {vendor ? (
          <p className={s.vendorWrapper}>
            البائع: <span className={s.vendor}>{vendor}</span>
          </p>
        ) : null}
        <div className="d-flex justify-content-between">
          <p className={s.qty}>
            {qty} × {parseInt(price)}
          </p>
          <button type="button" onClick={handleDelete} className={s.delete}>
            <IoCloseCircleOutline />
          </button>
        </div>
      </div>
    </div>
  );
}
export default CartItem;
