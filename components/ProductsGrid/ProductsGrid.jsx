import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { apiHttp } from "../../utils/utils";
import Loading from "../Loading";
import s from "./ProductsGrid.module.scss";
function ProductsGrid({ products }) {
  return (
    <div className="row">
      {products?.map((product) => (
        <Product key={product.slug} {...product} />
      ))}
    </div>
  );
}

function Product({ slug, title, img, vendor, id }) {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    if (loading) return;
    setLoading(true);
    try {
      await apiHttp.get(
        `${process.env.NEXT_PUBLIC_API_DOMAIN_PURE}/sanctum/csrf-cookie`
      );
      const res = await apiHttp.post(
        `${process.env.NEXT_PUBLIC_API_DOMAIN_PURE}/api/cart`,
        {
          [id]: {
            qty: 1,
          },
        }
      );
      console.log(`Store Product To Cart Response =>`, res);
    } catch (err) {
      console.log(`Store Product To Cart Error =>`, err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      href={`/product/${slug}`}
      className={`${s.product} col-12 col-md-6 col-lg-3 p-3`}
    >
      <Link className={s.img} href={`/product/${slug}`}>
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
          <Link className={s.productTitle} href={`/product/${slug}`}>
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

export default ProductsGrid;
