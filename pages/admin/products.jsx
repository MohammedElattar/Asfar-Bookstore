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
import Loading from "../../components/Loading";
import { useRouter } from "next/router";
const defaultImg =
  "https://assets.asfar.io/uploads/2022/01/19092920/woocommerce-placeholder-300x300.png";
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
        <div className="d-flex gap-2 flex-wrap">
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
    loading,
    addProductIsActive,
    currentProduct,
    products,
    setAddProductIsActive,
    setCurrentProduct,
    deleteProduct,
    totalRows,
    handlePerRowsChange,
    fetchProducts,
    searchProps,
    handleSearchSubmit,
  } = useProductsPage();

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

        <form onSubmit={handleSearchSubmit} className={s.searchWrapper}>
          <InputControl props={searchProps} label="بحث" />
        </form>

        <DataTable
          columns={columns}
          data={products.map((product) => ({
            ...product,
            setCurrentProduct,
            deleteProduct,
          }))}
          pagination
          customStyles={tableCustomStyles}
          progressPending={loading}
          progressComponent={
            <div>
              <Loading size={60} borderWidth="5px" />
            </div>
          }
          paginationServer
          paginationTotalRows={totalRows}
          onChangeRowsPerPage={handlePerRowsChange}
          onChangePage={fetchProducts}
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
  const [priceProps, setPriceError, setPriceProps] = useInput("");
  const [quantityProps, setQuantityError, setQuantityProps] = useInput("");
  const [image, setImage] = useState(null);
  const [resultMsg, setResultMsg] = useState("");
  const [error, setError] = useState(null);
  const { setData } = useAdminContext();

  const handlePress = async (evt, next) => {
    const check1 = nameProps.value.trim().length <= 4;
    const check2 = writterProps.value.trim().length <= 4;
    const check3 = publisherProps.value.trim().length <= 4;
    const check4 = vendorProps.value.trim().length <= 4;
    const check5 = /^[\d.]{1,}$/.test(priceProps.value.trim());
    const check6 = /^\d{1,}$/.test(quantityProps.value.trim());
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
    if (priceProps.value.trim().length <= 0) {
      setPriceError(true, "رقم واحد علي الاقل");
    } else if (!check5) {
      setPriceError(true, "ارقام فقط");
    }
    if (quantityProps.value.trim().length <= 0) {
      setQuantityError(true, "رقم واحد علي الاقل");
    } else if (!check6) {
      setQuantityError(true, "ارقام فقط");
    }
    if (check1 || check2 || check3 || check4 || !check5 || !check6) {
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
      formData.append("price", priceProps.value);
      formData.append("quantity", quantityProps.value);
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
      console.log(`Create Product Error =>`, err.response.data.data);
      setResultMsg("خطأ!");
      setError(`حدث خطأ اثناء القيام بالعملية`);
      next();
    }
  };

  useEffect(() => {
    [
      setNameProps,
      setWritterProps,
      setPublisherProps,
      setVendorProps,
      setPriceProps,
      setQuantityProps,
    ].forEach((e) =>
      e((prev) => ({ ...prev, error: false, helperText: "", value: "" }))
    );
    setImage(null);
    // eslint-disable-next-line
  }, [addProductIsActive]);

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
        <InputControl label="السعر" props={priceProps} />
        <InputControl label="الكمية" props={quantityProps} />
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
  const [priceProps, setPriceError, setPriceProps] = useInput("");
  const [quantityProps, setQuantityError, setQuantityProps] = useInput("");
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
    const check5 = /^[\d.]{1,}$/.test(priceProps.value.trim());
    const check6 = /^\d{1,}$/.test(quantityProps.value.trim());
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
    if (priceProps.value.trim().length <= 0) {
      setPriceError(true, "رقم واحد علي الاقل");
    } else if (!check5) {
      setPriceError(true, "ارقام فقط");
    }
    if (quantityProps.value.trim().length <= 0) {
      setQuantityError(true, "رقم واحد علي الاقل");
    } else if (!check6) {
      setQuantityError(true, "ارقام فقط");
    }
    if (check1 || check2 || check3 || check4 || !check5 || !check6) {
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
      formData.append("price", priceProps.value);
      formData.append("quantity", quantityProps.value);
      if (image) {
        formData.append("img", image);
      }
      console.log(Object.fromEntries(formData.entries()));

      const res = await apiHttp.post(
        `/v1/books/${currentProduct.id}`,
        formData
      );
      console.log(`Edit Book Response =>`, res);

      const editedBook = res.data.data;

      if (res.data.type === "success" && editedBook) {
        console.log(`Setting Data...`);
        setData((prevData) => ({
          ...prevData,
          data: prevData.data.map((book) => {
            if (book.id == editedBook.id) {
              return editedBook;
            }
            return book;
          }),
        }));
      }

      setResultMsg("تم التعديل");
      setError(null);
      next();
    } catch (err) {
      console.log(`Edit Product Error =>`, err.response.data);
      setResultMsg("خطأ!");
      setError(`حدث خطأ اثناء القيام بالعملية`);
      next();
    }
  };

  useEffect(() => {
    if (!currentProduct) return;
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
    setPriceProps((prev) => ({
      ...prev,
      error: false,
      helperText: "",
      value: String(currentProduct.price) || "",
    }));
    setQuantityProps((prev) => ({
      ...prev,
      error: false,
      helperText: "",
      value: String(currentProduct.quantity) || "",
    }));
    setImage(null);

    // eslint-disable-next-line
  }, [currentProduct]);

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
        <InputControl label="السعر" props={priceProps} />
        <InputControl label="الكمية" props={quantityProps} />
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
          url={currentProduct.img || defaultImg}
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

function useProductsPage() {
  const {
    data: {
      data: products,
      meta: { total },
    },
    setData,
  } = useAdminContext();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [perPage, setPerPage] = useState(10);
  const [addProductIsActive, setAddProductIsActive] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [searchProps, setSearchError, setSearchProps] = useInput();
  const [searchData, setSearchData] = useState(null);
  const [searchTotal, setSearchTotal] = useState(0);

  const handlePerRowsChange = async (newRows, page) => {
    setLoading(true);

    try {
      const res = await apiHttp.get(`/v1/books?page=${page}&cnt=${newRows}`);
      console.log(`Rows Per Page Change Response =>`, res);
      setData(res.data);
      setLoading(false);
      setPerPage(newRows);
      // router.push(
      //   { pathname: router.pathname, query: { ...router.query, cnt: newRows } },
      //   undefined,
      //   { shallow: true }
      // );
    } catch (err) {
      console.log(`Fetch Rows Error`, err);
    }
  };

  const fetchProducts = async (page) => {
    setLoading(true);
    try {
      const res = await apiHttp.get(`/v1/books?page=${page}&cnt=${perPage}`);
      console.log(`Page Change Response =>`, res);
      setData(res.data);
      setLoading(false);
      console.log(router);
      // router.push(
      //   { pathname: router.pathname, query: { ...router.query, page } },
      //   undefined,
      //   { shallow: true }
      // );
    } catch (err) {
      console.log(`Page Change Error`, err);
    }
  };

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

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    if (searchProps.value.trim().length === 0) {
      setSearchError(true, "قيمة البحث غير صالحة");
      return false;
    }
    try {
      const url = `http://localhost:8000/api/search/books/${searchProps.value}?cnt=${perPage}`;
      console.log(`URL =>`, url);
      const res = await apiHttp.get(url);
      console.log(`Search Response =>`, res);
      setSearchData(res.data.data);
      setSearchTotal(res.data.meta.total);
    } catch (err) {
      console.log(`Search Error =>`, err);
    }
  };
  const clearSearch = (e) => {
    if (e.target.value.length === 0) {
      setSearchError(false);
      setSearchData(null);
      setSearchTotal(null);
    }
  };

  useEffect(() => {
    if (searchProps.value.length === 0) {
      setSearchError(false);
      setSearchData(null);
      setSearchTotal(null);
    }
    // eslint-disable-next-line
  }, [searchProps.value]);

  return {
    loading,
    addProductIsActive,
    currentProduct,
    products: searchData || products,
    setAddProductIsActive,
    setCurrentProduct,
    deleteProduct,
    totalRows: searchTotal && searchData ? searchTotal : total,
    handlePerRowsChange,
    fetchProducts,
    searchProps,
    setSearchError,
    setSearchProps,
    handleSearchSubmit,
  };
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
