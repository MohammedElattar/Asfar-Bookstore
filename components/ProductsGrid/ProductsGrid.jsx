import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCartContext } from "../../context/CartContext";
import { apiHttp } from "../../utils/utils";
import Loading from "../Loading";
import s from "./ProductsGrid.module.scss";
export default function ProductsGrid({ products }) {
  return (
    <div className="row">
      {products?.map((product) => (
        <Product key={product.id} {...product} />
      ))}
    </div>
  );
}

function Product({ slug, title, img, vendor, id }) {
  const [loading, setLoading] = useState(false);
  const { reloadCart } = useCartContext();
  const handleClick = async () => {
    if (loading) return;
    setLoading(true);
    try {
      await apiHttp.get(process.env.NEXT_PUBLIC_CSRF);
      const res = await apiHttp.post(process.env.NEXT_PUBLIC_CART, {
        [id]: {
          qty: 1,
        },
      });
      reloadCart();
      console.log(`Store Product To Cart Response =>`, res);
    } catch (err) {
      console.log(`Store Product To Cart Error =>`, err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`${s.product} col-12 col-md-6 col-lg-3 p-3`}>
      <Link className={s.img} href={`/product/${id}`}>
        {img ? (
          <Image src={img} alt={title} width={200} height={350} />
        ) : (
          <Image
            src="https://assets.asfar.io/uploads/2022/01/19092920/woocommerce-placeholder-300x300.png"
            alt={title}
            width={200}
            height={350}
          />
        )}
      </Link>
      <div className={`${s.info} d-flex flex-column justify-content-between`}>
        <div>
          <Link className={s.productTitle} href={`/product/${id}`}>
            {title}
          </Link>
          <p className={s.productSeller}>
            البائع:
            <span>{vendor}</span>
          </p>
        </div>
        <button className={s.addToCart} type="button" onClick={handleClick}>
          {loading ? (
            <div className="d-flex justify-content-center">
              <Loading />
            </div>
          ) : (
            `إضافة إلى السلة`
          )}
        </button>
      </div>
    </div>
  );
}
