import { AwesomeButton, AwesomeButtonProgress } from "react-awesome-button";
import DataTable from "react-data-table-component";
import ImageZoom from "../../components/ImageZoom";
import global from "../../styles/pages/admin/global.module.scss";
import s from "../../styles/pages/admin/products.module.scss";
import { useAdminContext } from "../../context/AdminContext";
import { apiHttp, tableCustomStyles } from "../../utils/utils";
import { useState } from "react";

import Menu from "../../components/Admin/Menu";
import InputControl from "../../components/InputControl/InputControl";
import useInput from "../../hooks/useInput";
import { useEffect } from "react";
import ImagePreview from "../../components/Admin/ImagePreview";
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
  },
  {
    name: "الكاتب",
    selector: (product) => product.writter || "غير معرف",
  },
  {
    name: "البائع",
    selector: (product) => product.vendor,
  },
  {
    name: "الادوات",
    selector: (product) => {
      return (
        <div className="d-flex gap-2">
          <AwesomeButton
            type="secondary"
            size="small"
            onPress={() => product.setCurrentProduct(product)}
          >
            تعديل
          </AwesomeButton>
          <AwesomeButton
            type="secondary"
            size="small"
            className={global.deleteButton}
            onPress={() => product.deleteProduct(product)}
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
    data: { data: products },
    setData,
  } = useAdminContext();
  // const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [addProductIsActive, setAddProductIsActive] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  // const fetchProducts = () => {};

  // const handlePerRowsChange = () => {};

  // const handlePageChange = () => {};

  // useEffect(() => {
  //   fetchProducts();
  // }, []);

  const deleteProduct = async (product) => {
    const confirmed = window.confirm(`سيتم مسح ${product.title} نهائيا`);
    if (confirmed) {
      try {
        const res = await apiHttp.delete(`/v1/books/${product.id}`);
        console.log(`Delete Response =>`, res);

        if (res.data.type === "success") {
          setData((prev) => {
            const clone = { ...prev };
            clone.data = clone.data.filter((e) => e.id !== product.id);
            return clone;
          });
        }
      } catch (err) {
        console.log(`Delete Error =>`, err);
      }
    }
  };

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
          data={products.map((product) => ({
            ...product,
            setCurrentProduct,
            deleteProduct,
          }))}
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
        className={[
          "overlay",
          addProductIsActive || currentProduct ? "active" : "",
        ].join(" ")}
        onClick={() => {
          setAddProductIsActive(false);
          setCurrentProduct(null);
        }}
      ></div>
      <AddProductMenu {...{ addProductIsActive, setAddProductIsActive }} />
      <EditProductMenu {...{ currentProduct, setCurrentProduct }} />
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
    if (check1 || check2 || check3 || check4) {
      setResultMsg("خطأ!");
      next();
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", nameProps.value);
      formData.append("writter", writterProps.value);
      formData.append("publisher", publisherProps.value);
      formData.append("vendor", vendorProps.value);
      if (image) {
        formData.append("img", image);
      }

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

  useEffect(() => {
    [setNameProps, setWritterProps, setPublisherProps, setVendorProps].forEach(
      (e) => e((prev) => ({ ...prev, error: false, helperText: "", value: "" }))
    );
    setImage(null);
  }, [
    addProductIsActive,
    setNameProps,
    setPublisherProps,
    setVendorProps,
    setWritterProps,
  ]);

  return (
    <Menu
      title="اضافة منتج"
      className={[addProductIsActive ? "active" : "", s.menu].join(" ").trim()}
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

      {!!image && (
        <ImagePreview
          file={image}
          width={80}
          height={100}
          alt={"image preview"}
          className={s.imagePreview}
        />
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

function EditProductMenu({ currentProduct, setCurrentProduct }) {
  const [nameProps, setNameError, setNameProps] = useInput("");
  const [writterProps, setWritterError, setWritterProps] = useInput("");
  const [publisherProps, setPublisherError, setPublisherProps] = useInput("");
  const [vendorProps, setVendorError, setVendorProps] = useInput("");
  const [image, setImage] = useState(null);
  const [resultMsg, setResultMsg] = useState("");
  const [error, setError] = useState(null);
  const { setData } = useAdminContext();

  const handlePress = async (evt, next) => {
    if (!currentProduct) return;
    const check1 = nameProps.value.trim().length <= 4;
    const check2 = writterProps.value.trim().length <= 4;
    const check3 = publisherProps.value.trim().length <= 4;
    const check4 = vendorProps.value.trim().length <= 4;
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
    if (check1 || check2 || check3 || check4) {
      setResultMsg("خطأ!");
      next();
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", nameProps.value);
      formData.append("writter", writterProps.value);
      formData.append("publisher", publisherProps.value);
      formData.append("vendor", vendorProps.value);
      if (image) {
        formData.append("img", image);
      }

      const res = await apiHttp.post(
        `/v1/books/${currentProduct.id}`,
        formData
      );
      console.log(`Edit Book Response =>`, res);

      const editedBook = res.data;

      if (res.data.type === "success" && editedBook) {
        console.log(`Setting Data...`);
        setData((prevData) => {
          const clone = { ...prevData };
          prevData.data = prevData.data.map((product) => {
            if (product.id === editedBook.id) {
              return editedBook;
            }
            return product;
          });
          return clone;
        });
      }

      setResultMsg("تم التعديل");
      setError(null);
      next();
    } catch (err) {
      console.log(`Edit Product Error =>`, err);
      setResultMsg("خطأ!");
      setError(`حدث خطأ اثناء القيام بالعملية`);
      next();
    }
  };

  useEffect(() => {
    if (currentProduct) {
      setNameProps((prev) => ({
        ...prev,
        error: false,
        helperText: "",
        value: currentProduct.title || "",
      }));
      setWritterProps((prev) => ({
        ...prev,
        error: false,
        helperText: "",
        value: currentProduct.writter || "",
      }));
      setPublisherProps((prev) => ({
        ...prev,
        error: false,
        helperText: "",
        value: currentProduct.publisher || "",
      }));
      setVendorProps((prev) => ({
        ...prev,
        error: false,
        helperText: "",
        value: currentProduct.vendor || "",
      }));
    }
  }, [
    currentProduct,
    setNameProps,
    setPublisherProps,
    setVendorProps,
    setWritterProps,
  ]);

  return (
    <Menu
      title="تعديل منتج"
      className={[currentProduct ? "active" : "", s.menu].join(" ").trim()}
      onClose={() => setCurrentProduct(false)}
    >
      <div className={s.menuBody}>
        <InputControl label="اسم المنتج" props={nameProps} />
        <InputControl label="اسم الكاتب" props={writterProps} />
        <InputControl label="اسم الناشر" props={publisherProps} />
        <InputControl label="اسم البائع" props={vendorProps} />
      </div>
      <div className={s.fileWrapper}>
        <label htmlFor="editImage">اختيار صورة</label>
        <span>{image?.name}</span>
        <input
          type="file"
          id="editImage"
          accept="image/*"
          hidden
          onChange={(e) => {
            console.log(e.target.files);
            setImage(e.target.files[0]);
          }}
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

      {!!currentProduct && (
        <ImagePreview
          url={currentProduct.img}
          file={image}
          width={80}
          height={100}
          alt={"image preview"}
          className={s.imagePreview}
        />
      )}

      <AwesomeButtonProgress
        type="primary"
        onPress={handlePress}
        resultLabel={resultMsg}
        loadingLabel="جاري التحميل..."
      >
        تعديل المنتج
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
