import Image from "next/image";
import Link from "next/link";
import { IoCloseCircleOutline } from "react-icons/io5";
import s from "./Cart.module.scss";
function CartItem({ book_name: title, img, vendor, price, qty, id }) {
  const deleteItem = () => {};

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
          <button type="button" onClick={deleteItem} className={s.delete}>
            <IoCloseCircleOutline />
          </button>
        </div>
      </div>
    </div>
  );
}
export default CartItem;
