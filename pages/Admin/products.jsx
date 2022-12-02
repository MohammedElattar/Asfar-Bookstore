import Image from "next/image";
import DataTable from "react-data-table-component";
import Container from "../../components/Admin/Layout/Sidebar/Container/Container";
import Sidebar from "../../components/Admin/Layout/Sidebar/Sidebar";
import ImageZoom from "../../components/ImageZoom";
import Loading from "../../components/Loading/Loading";
import useAdminFetch from "../../hooks/useAdminFetch";
import s from "../../styles/pages/admin/products.module.scss";

const columns = [
  {
    name: "الرقم التعريفي",
    selector: (product) => product.index,
  },
  {
    name: "الصورة",
    selector: (product) => (
      // <Image
      //   src={
      //     product.img ||
      //     "https://assets.asfar.io/uploads/2022/01/19092920/woocommerce-placeholder-300x300.png"
      //   }
      //   alt={product.title}
      //   width={60}
      //   height={80}
      // />
      <ImageZoom
        src={
          product.img ||
          "https://assets.asfar.io/uploads/2022/01/19092920/woocommerce-placeholder-300x300.png"
        }
        alt={product.title}
        width="60"
        height="80"
      />
    ),
  },
  {
    name: "العنوان",
    selector: (product) => product.title,
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
  const { data, loading } = useAdminFetch("/api/products");
  console.log(`data`, data);
  return (
    <Container>
      <Sidebar />
      <div className={s.wrapper}>
        {loading ? (
          <Loading />
        ) : (
          <DataTable
            columns={columns}
            data={data.products}
            pagination
            customStyles={customStyles}
          />
        )}
      </div>
    </Container>
  );
}
export default Products;

export async function getStaticProps() {
  return {
    props: {
      admin: true,
    },
  };
}
