import { AwesomeButton, AwesomeButtonProgress } from "react-awesome-button";
import DataTable from "react-data-table-component";
import ImageZoom from "../../components/ImageZoom";
import global from "../../styles/pages/admin/global.module.scss";
import s from "../../styles/pages/admin/products.module.scss";
import { useAdminContext } from "../../context/AdminContext";
import { apiHttp, cls, tableCustomStyles, defaultImg } from "../../utils/utils";
import { useState } from "react";
import Menu from "../../components/Admin/Menu";
import InputControl, {
  SelectInput,
} from "../../components/InputControl/InputControl";
import useInput from "../../hooks/useInput";
import { useEffect } from "react";
import ImagePreview from "../../components/Admin/ImagePreview";
import Loading from "../../components/Loading";
import { useRouter } from "next/router";
import { useRef } from "react";

const columns = [
  {
    name: "الرقم التعريفي",
    selector: (product) => product.id,
  },
  {
    name: "الصورة",
    selector: (product) => (
      <ImageZoom
        src={product.img || defaultImg}
        style={{ objectFit: "cover" }}
        alt={product.title}
        width="80"
        height="100"
      />
    ),
  },
  {
    name: "الاسم",
    selector: (product) => product.title,
    wrap: true,
  },
  {
    name: "الناشر",
    selector: (product) => product.publisher || "غير معرف",
    wrap: true,
  },
  {
    name: "الكاتب",
    selector: (product) => product.writter || "غير معرف",
    wrap: true,
  },
  {
    name: "البائع",
    selector: (product) => product.vendor,
    wrap: true,
  },
  {
    name: "القسم",
    selector: (product) => product.category,
    wrap: true,
  },
  {
    name: "السعر",
    selector: (product) => Number(product.price).toFixed(2),
    wrap: true,
    wrap: true,
  },
  {
    name: "الكمية",
    selector: (product) => product.quantity,
    wrap: true,
  },
  {
    name: "الادوات",
    selector: (product) => {
      return (
        <div className="d-flex gap-1 flex-wrap">
          <AwesomeButton
            type="secondary"
            size="x-small"
            style={{ height: "35px", width: "100%" }}
          >
            تعديل
          </AwesomeButton>
          <AwesomeButton
            type="secondary"
            size="x-small"
            style={{ height: "35px", width: "100%" }}
            className={global.deleteButton}
          >
            حذف
          </AwesomeButton>
        </div>
      );
    },
  },
];

export default function Products() {
  const {
    data: { data: products, meta: { total } = {} },
    setData,
  } = useAdminContext();

  return (
    <>
      <div className={global.wrapper}>
        <DataTable
          columns={columns}
          pagination
          customStyles={tableCustomStyles}
          progressComponent={
            <div>
              <Loading size={60} borderWidth="5px" />
            </div>
          }
          paginationServer
          paginationTotalRows={total}
          noDataComponent={<h3>لا يوجد بيانات لعرضها</h3>}
        />
      </div>
    </>
  );
}

export async function getStaticProps() {
  const props = {
    admin: true,
    title: "المنتجات",
    url: process.env.NEXT_PUBLIC_ADMIN_ORDERS,
  };

  return {
    props: props,
  };
}
