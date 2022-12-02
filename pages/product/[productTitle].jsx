import mediumZoom from "medium-zoom";
import Head from "next/head";
import { useRef, useState } from "react";
import FormLoadingButton from "../../components/FormLoadingButton/FormLoadingButton";
import ImageZoom from "../../components/ImageZoom";
import { getAll, getProduct } from "../../json/products";
import s from "../../styles/single-product.module.scss";

const additionInfo = [
  { key: "الوزن", value: "0.5 kg" },
  { key: "ISBN", value: "123456789123456" },
  { key: "عدد الصفحات", value: "250" },
  { key: "الناشر", value: "غير معروف" },
  { key: "الكاتب", value: "غير معروف" },
];

export default function ProductPage({ product }) {
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const value = e.target.value;

    if (value > 0) {
      setQty(value);
    }
  };

  const vendor = product.vendor?.at(0);
  const publisher = product.publisher?.at(0);
  return (
    <>
      <Head>
        <title>{product.title}</title>
      </Head>

      <div className="container d-flex gap-4 flex-column flex-md-row py-5">
        <div className={s.img}>
          <ImageZoom src={product.img} alt={product.title} />
        </div>
        <div className={s.text}>
          <div className={s.title}>{product.title}</div>
          <div className={s.price}>400.00 EGP</div>
          <div className={s.greenMessage}>
            اطلب الآن يصل طلبك في:<b> 2 – 5 أيام عمل</b> في مصر و
            <b>3 – 8 أيام</b> في باقي الدول.
          </div>
          <div className={s.greenMessage}>
            لعملائنا داخل مصر وخارجها: خصم 16% عند السداد بالبطاقات البنكية
            (فيزا أو ماستر) أو آبل باي أو باي بال.
          </div>
          <div className={s.greenMessage}>
            لعملائنا داخل مصر: خصم 8% عند اختيار الدفع عند الاستلام أو المحافظ
            الإلكترونية.
          </div>
          <div className={s.btns}>
            <input type="number" onChange={handleChange} value={qty} min="1" />
            <FormLoadingButton
              text={`إضافة إلى السلة`}
              className={s.addToCart}
              loading={loading}
            />
          </div>
          {vendor || publisher ? (
            <div className={s.info}>
              البائع:
              {publisher || vendor}
            </div>
          ) : null}
        </div>
      </div>

      <div className="container">
        <div className={s.tabWrapper}>
          <span className={s.tab}>معلومات إضافية</span>
        </div>
        <h3 className={s.additionInfoTitle}>معلومات إضافية</h3>
        <div className={s.additionInfoWrapper}>
          {additionInfo.map(({ key, value }) => (
            <div className={s.row} key={key}>
              <span className={s.key}>{key}</span>
              <span className={s.value}>{value}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export async function getStaticPaths() {
  const products = getAll();
  return {
    paths: products.map(({ titleEn }) => ({
      params: { productTitle: titleEn + "" },
    })),
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const { productTitle } = context.params;
  const product = getProduct(productTitle);
  return {
    props: { product },
  };
}
