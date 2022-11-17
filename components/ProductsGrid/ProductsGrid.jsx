import Image from "next/image";

function Product(props) {
  return (
    <div className="product">
      <div className="img">
        <img src={props?.images?.thumbnail?.url} alt={props.post_title} />
      </div>
      <div className="info">
        <h3>{props.post_title}</h3>
        <span className="price">40EGP</span>
        <p>
          البائع:{" "}
          {props?.taxonomies?.pa_publisher?.at(0) ||
            props.taxonomies?.wcpv_product_vendors?.at(0)}
        </p>
        <button className="add-to-cart">إضافة إلى السلة</button>
      </div>
    </div>
  );
}

function ProductsGrid({ products }) {
  return (
    <div className="row products-grid">
      {products?.map(({ id, post_title, taxonomies, images }) => (
        <div className="product col-12 col-md-6 col-lg-3 p-3" key={id}>
          <div className="img">
            {images?.thumbnail?.url ? (
              // <img
              //   src={images?.thumbnail?.url?.replace("150x150", "330x452")}
              //   alt={post_title}
              // />
              <Image
                src={images?.thumbnail?.url?.replace("150x150", "330x452")}
                alt={post_title}
                width={200}
                height={350}
              />
            ) : (
              <div
                style={{
                  width: "100%",
                  aspectRatio: "3/4",
                  backgroundColor: "rgba(0, 0, 0, 0.3)",
                }}
              ></div>
            )}
          </div>
          <div className="info">
            <h3 className="product-title">{post_title}</h3>
            <span className="product-price">40EGP</span>
            <p className="product-seller">
              البائع:
              <span>
                {taxonomies?.pa_publisher?.at(0) ||
                  taxonomies?.wcpv_product_vendors?.at(0)}
              </span>
            </p>
            <button className="add-to-cart">إضافة إلى السلة</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductsGrid;
