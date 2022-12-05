import { AwesomeButton, AwesomeButtonProgress } from "react-awesome-button";
import DataTable from "react-data-table-component";
import ImageZoom from "../../components/ImageZoom";
import global from "../../styles/pages/admin/global.module.scss";
import s from "../../styles/pages/admin/products.module.scss";
import { useAdminContext } from "../../context/AdminContext";
import { apiHttp, tableCustomStyles } from "../../utils/utils";
import { useState } from "react";
import { useEffect } from "react";
import Menu from "../../components/Admin/Menu";
import InputControl from "../../components/InputControl/InputControl";
import useInput from "../../hooks/useInput";
const columns = [
  {
    name: "الرقم التعريفي",
    selector: (product) => product.id,
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
    name: "الناشر",
    selector: (product) => product.publisher || "غير معرف",
  },
  {
    name: "الكاتب",
    selector: (product) => product.writter || "غير معرف",
  },
  {
    name: "البائع",
    selector: (product) => product.vendor,
  },
];

export default function Products() {
  const {
    data: { data: products },
  } = useAdminContext();
  // const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [addProductIsActive, setAddProductIsActive] = useState(false);

  const fetchProducts = () => {};

  const handlePerRowsChange = () => {};

  const handlePageChange = () => {};

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <div className={global.wrapper}>
        <div className={global.btnContainer}>
          <AwesomeButton
            type="secondary"
            onPress={() => setAddProductIsActive(true)}
          >
            اضافة منتج
          </AwesomeButton>
        </div>

        <DataTable
          columns={columns}
          data={products}
          pagination
          customStyles={tableCustomStyles}
          // progressPending={loading}
          // paginationServer
          // paginationTotalRows={totalRows}
          // onChangeRowsPerPage={handlePerRowsChange}
          // onChangePage={handlePageChange}
          noDataComponent={<h3>لا يوجد بيانات لعرضها</h3>}
        />
      </div>

      <div
        className={["overlay", addProductIsActive ? "active" : ""].join(" ")}
        onClick={() => setAddProductIsActive(false)}
      ></div>
      <AddProductMenu {...{ addProductIsActive, setAddProductIsActive }} />
    </>
  );
}

function AddProductMenu({ addProductIsActive, setAddProductIsActive }) {
  const [nameProps, setNameError, setNameProps] = useInput("");
  const [writterProps, setWritterError, setWritterProps] = useInput("");
  const [publisherProps, setPublisherError, setPublisherProps] = useInput("");
  const [vendorProps, setVendorError, setVendorProps] = useInput("");
  const [image, setImage] = useState(null);
  const [resultMsg, setResultMsg] = useState("");
  const [error, setError] = useState(null);
  const { setData } = useAdminContext();

  const handlePress = async (evt, next) => {
    const check1 = nameProps.value.trim().length <= 4;
    const check2 = writterProps.value.trim().length <= 4;
    const check3 = publisherProps.value.trim().length <= 4;
    const check4 = vendorProps.value.trim().length <= 4;
    const check5 = !image;
    if (check1) {
      setNameError(true, "الاسم قصير جدا!");
    }
    if (check2) {
      setWritterError(true, "الاسم قصير جدا!");
    }
    if (check3) {
      setPublisherError(true, "الاسم قصير جدا!");
    }
    if (check4) {
      setVendorError(true, "الاسم قصير جدا!");
    }
    if (check5) {
      setError(`يرجي ادخال صورة!`);
    }
    if (check1 || check2 || check3 || check4 || check5) {
      setResultMsg("خطأ!");
      next();
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", nameProps.value);
      formData.append("writter", writterProps.value);
      formData.append("publisher", publisherProps.value);
      formData.append("img", image);
      formData.append("vendor", vendorProps.value);

      const res = await apiHttp.post("/v1/books", formData);
      console.log(`Create Book Response =>`, res);

      const [newBook] = res.data.data;

      if (res.data.type === "success" && newBook) {
        setData((prevData) => {
          const clone = { ...prevData };
          prevData.data.push(newBook);
          return clone;
        });
      }

      setResultMsg("تم الاضافة");
      setError(null);
      next();
    } catch (err) {
      console.log(`Create Product Error =>`, err);
      setResultMsg("خطأ!");
      setError(`حدث خطأ اثناء القيام بالعملية`);
      next();
    }
  };

  return (
    <Menu
      title="اضافة منتج"
      className={addProductIsActive ? "active" : ""}
      onClose={() => setAddProductIsActive(false)}
    >
      <div className={s.menuBody}>
        <InputControl label="اسم المنتج" props={nameProps} />
        <InputControl label="اسم الكاتب" props={writterProps} />
        <InputControl label="اسم الناشر" props={publisherProps} />
        <InputControl label="اسم البائع" props={vendorProps} />
      </div>
      <div className={s.fileWrapper}>
        <label htmlFor="image">اختيار صورة</label>
        <span>{image?.name}</span>
        <input
          type="file"
          id="image"
          accept="image/*"
          hidden
          onChange={(e) => setImage(e.target.files[0])}
        />
      </div>

      {!!error && (
        <p
          style={{
            margin: "10px 0",
            color: "#b90000",
            fontSize: "18px",
            fontWeight: "500",
          }}
        >
          {error}
        </p>
      )}

      <AwesomeButtonProgress
        type="primary"
        onPress={handlePress}
        resultLabel={resultMsg}
        loadingLabel="جاري التحميل..."
      >
        اضافة المنتج
      </AwesomeButtonProgress>
    </Menu>
  );
}

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
