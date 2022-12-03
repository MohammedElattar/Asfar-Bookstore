import { AwesomeButton } from "react-awesome-button";
import DataTable from "react-data-table-component";
import ImageZoom from "../../components/ImageZoom";
import Loading from "../../components/Loading";
import s from "../../styles/pages/admin/products.module.scss";
import useSWR from "swr";
import { useEffect, useState } from "react";
import Head from "next/head";

const columns = [
  {
    name: "الرقم التعريفي",
    selector: (product) => product.index,
  },
  {
    name: "الصورة",
    selector: (product) => (
      <ImageZoom
        src={
          product.img ||
          "https://assets.asfar.io/uploads/2022/01/19092920/woocommerce-placeholder-300x300.png"
        }
        alt={product.title}
        width="80"
        height="100"
      />
    ),
  },
  {
    name: "العنوان",
    selector: (product) => product.title,
    wrap: true,
  },
  {
    name: "الكاتب",
    selector: (product) => product.author,
  },
  {
    name: "الناشر",
    selector: (product) => product.publisher || "غير معرف",
  },
  {
    name: "الكاتب",
    selector: (product) => product.writter || "غير معرف",
  },
  {
    name: "البائع",
    selector: (product) => product.vendors?.join("-") || "غير معرف",
  },
];
const customStyles = {
  cells: {
    style: {
      fontSize: "16px",
      paddingTop: "15px",
      paddingBottom: "15px",
    },
  },
  headCells: {
    style: {
      fontSize: "18px",
      fontWeight: "bold",
    },
  },
};

function Products({ products }) {
  const [render, setRender] = useState(false);
  useEffect(() => {
    setRender(true);
  }, []);
  return (
    <>
      <Head>
        <title>المنتجات</title>
      </Head>
      <div className={s.wrapper}>
        <div className={s.btnContainer}>
          <AwesomeButton type="secondary">اضافة منتج</AwesomeButton>
          <AwesomeButton type="secondary">تعديل منتج</AwesomeButton>
        </div>
        {render && (
          <DataTable
            columns={columns}
            data={products}
            pagination
            customStyles={customStyles}
          />
        )}
      </div>
    </>
  );
}
export default Products;

export async function getServerSideProps(ctx) {
  const {
    cookies: { userToken },
  } = ctx.req;
  const props = { admin: true };

  if (!userToken) {
    return {
      redirect: {
        destination: "/admin/login",
        permanent: false,
      },
    };
  }

  const res = await fetch(
    `${process.env.URL}/api/check-login?secretKey=${process.env.SECRET_KEY}&token=${userToken}`
  );
  const { isAdmin } = await res.json();
  if (isAdmin) {
    const res = await fetch(`${process.env.URL}/api/products`);
    const { products } = await res.json();
    props.products = products;
  } else {
    return {
      redirect: {
        destination: "/admin/login",
        permanent: false,
      },
    };
  }
  return {
    props: props,
  };
}
