import Image from "next/image";
import Link from 'next/link';

function ProductsGrid({ products, price }) {
  return (
    <div className="row products-grid">
      {products?.map(({ post_id, post_title, taxonomies, images }) => (
        <Link href={`/products/product/${post_id}`} className="product col-12 col-md-6 col-lg-3 p-3" key={post_id}>
          <div className="img">
            {images?.thumbnail?.url ? (
              <Image
                src={images?.thumbnail?.url?.replace("150x150", "330x452")}
                alt={post_title}
                width={200}
                height={350}
              />
            ) : (
              <Image
                src='https://assets.asfar.io/uploads/2022/01/19092920/woocommerce-placeholder-300x300.png'
                alt={post_title}
                width={200}
                height={350}
                style={{
                  width: "100%",
                  aspectRatio: "3/4",
                  backgroundColor: "rgba(0, 0, 0, 0.3)",
                }}
              />
            )}
          </div>
          <div className="info d-flex flex-column justify-content-between">
            <div>
              <h3 className="product-title">{post_title}</h3>
              {
                price ? <span className="product-price">40EGP</span> : null
              }
              <p className="product-seller">
                البائع:
                <span>
                  {taxonomies?.pa_publisher?.at(0) ||
                    taxonomies?.wcpv_product_vendors?.at(0)}
                </span>
              </p>
            </div>
            <button className="add-to-cart">إضافة إلى السلة</button>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default ProductsGrid;
