import { AwesomeButton } from "react-awesome-button";
import DataTable from "react-data-table-component";
import ImageZoom from "../../components/ImageZoom";
import Loading from "../../components/Loading";
import s from "../../styles/pages/admin/products.module.scss";
import useSWR from "swr";
import { useEffect, useState } from "react";
import Head from "next/head";
import { useAdminContext } from "../../AdminContext";

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

function Products() {
  const { data } = useAdminContext();
  const { products } = data;
  return (
    <>
      <Head>
        <title>المنتجات</title>
      </Head>
      <div className={s.wrapper}>
        <div className={s.btnContainer}>
          <AwesomeButton type="secondary">اضافة منتج</AwesomeButton>
        </div>

        <DataTable
          columns={columns}
          data={products}
          pagination
          customStyles={customStyles}
        />
      </div>
    </>
  );
}
export default Products;

export async function getStaticProps() {
  const props = { admin: true, title: "المنتجات", url: "/api/products" };

  return {
    props: props,
  };
}
