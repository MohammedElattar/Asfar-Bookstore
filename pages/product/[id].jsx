import Head from "next/head";
import { useState } from "react";
import FormLoadingButton from "../../components/FormLoadingButton/FormLoadingButton";
import ImageZoom from "../../components/ImageZoom";
import s from "../../styles/pages/product.module.scss";
import { apiHttp } from "../../utils/utils";
import { defaultImg } from "../../utils/utils";
export default function ProductPage({ product }) {
  console.log(`Product =>`, product);
  return (
    <>
      <Head>
        <title>{product.title}</title>
      </Head>

      <div className="container d-flex gap-4 flex-column flex-md-row py-5">
        <div className={s.img}>
          <ImageZoom src={product.img || defaultImg} alt={product.title} />
        </div>
        <ProductText product={product} />
      </div>

      <AdditionalInfo product={product} />
    </>
  );
}

function ProductText({ product }) {
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    const value = e.target.value;

    if (value > 0) {
      setQty(value);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    try {
      await axios.get(
        `${process.env.NEXT_PUBLIC_API_DOMAIN_PURE}/sanctum/csrf-cookie`,
        {
          withCredentials: true,
        }
      );
      const url = `${process.env.NEXT_PUBLIC_API_DOMAIN_PURE}/api/cart`;
      console.log(`URL =>`, url);
      const res = await apiHttp.post(url, { [product.id]: { qty } });

      console.log(`Pushing Product To Cart Response =>`, res);
    } catch (err) {
      console.log(`Pushing Product To Cart Error =>`, err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className={s.text}>
      <div className={s.title}>{product.title}</div>
      <div className={s.price}>
        {typeof product.price === "number"
          ? `${Math.round(product.price)} EGP`
          : product.price}
      </div>
      <div className={s.greenMessage}>
        اطلب الآن يصل طلبك في:<b> 2 – 5 أيام عمل</b> في مصر و<b>3 – 8 أيام</b>{" "}
        في باقي الدول.
      </div>
      <div className={s.greenMessage}>
        لعملائنا داخل مصر وخارجها: خصم 16% عند السداد بالبطاقات البنكية (فيزا أو
        ماستر) أو آبل باي أو باي بال.
      </div>
      <div className={s.greenMessage}>
        لعملائنا داخل مصر: خصم 8% عند اختيار الدفع عند الاستلام أو المحافظ
        الإلكترونية.
      </div>
      <form className={s.btns} onSubmit={handleSubmit}>
        <input type="number" onChange={handleChange} value={qty} min="1" />
        <FormLoadingButton
          text={`إضافة إلى السلة`}
          className={s.addToCart}
          loading={loading}
        />
      </form>
      {product.vendor ? (
        <div className={s.info}>
          البائع:
          <span>{product.vendor}</span>
        </div>
      ) : null}
      {product.categories ? (
        <div className={s.info}>
          التصنيفات:
          <span>{product.categories.join(", ")}</span>
        </div>
      ) : null}
    </div>
  );
}

function AdditionalInfo({ product }) {
  return (
    <div className="container">
      <div className={s.tabWrapper}>
        <span className={s.tab}>معلومات إضافية</span>
      </div>
      <h3 className={s.additionInfoTitle}>معلومات إضافية</h3>
      <div className={s.additionInfoWrapper}>
        {[
          { key: "الوزن", value: product.weight },
          { key: "ISBN", value: product.isbn },
          { key: "عدد الصفحات", value: product.pages },
          { key: "الناشر", value: product.publisher },
          { key: "الكاتب", value: product.writter },
        ].map(
          ({ key, value }) =>
            value && (
              <div className={s.row} key={key}>
                <span className={s.key}>{key}</span>
                <span className={s.value}>{value}</span>
              </div>
            )
        )}
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  return {
    paths: [{ params: { id: "1" } }, { params: { id: "2" } }],
    fallback: "blocking",
  };
}

export async function getStaticProps(context) {
  const { id } = context.params;
  const notFound = { notFound: true };
  if (!id) return notFound;

  try {
    const res = await apiHttp.get(
      `${process.env.PHP_SERVER_URL}/api/books/${id}`
    );
    const { data } = res.data;
    if ("id" in data) return { props: { product: data } };
  } catch (err) {
    console.log(`Fetch Product Error =>`, err);
    return notFound;
  }
}
