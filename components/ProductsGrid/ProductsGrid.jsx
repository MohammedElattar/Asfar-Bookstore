import Image from "next/image";
import Link from "next/link";
import s from "./ProductsGrid.module.scss";
function ProductsGrid({ products }) {
  return (
    <div className="row">
      {products?.map(({ title, publisher, img, vendors, index, titleEn }) => (
        <Link
          href={`/product/${titleEn}`}
          className={`${s.product} col-12 col-md-6 col-lg-3 p-3`}
          key={index}
        >
          <div className={s.img}>
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
          </div>
          <div
            className={`${s.info} d-flex flex-column justify-content-between`}
          >
            <div>
              <h3 className={s.productTitle}>{title}</h3>
              <p className={s.productSeller}>
                البائع:
                <span>{publisher?.at(0) || vendors?.at(0)}</span>
              </p>
            </div>
            <button className={s.addToCart}>إضافة إلى السلة</button>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default ProductsGrid;
