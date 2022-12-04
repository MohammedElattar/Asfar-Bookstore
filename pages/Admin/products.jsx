import { AwesomeButton } from "react-awesome-button";
import DataTable from "react-data-table-component";
import ImageZoom from "../../components/ImageZoom";
import global from "../../styles/pages/admin/global.module.scss";
import { useAdminContext } from "../../context/AdminContext";
import { tableCustomStyles } from "../../utils/utils";
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

function Products() {
  const { data } = useAdminContext();
  const { products } = data;
  return (
    <>
      <div className={global.wrapper}>
        <div className={global.btnContainer}>
          <AwesomeButton type="secondary">اضافة منتج</AwesomeButton>
        </div>

        <DataTable
          columns={columns}
          data={products}
          pagination
          customStyles={tableCustomStyles}
        />
      </div>
    </>
  );
}
export default Products;

export async function getStaticProps() {
  const props = {
    admin: true,
    title: "المنتجات",
    url: process.env.ADMIN_PRODUCTS,
  };

  return {
    props: props,
  };
}
