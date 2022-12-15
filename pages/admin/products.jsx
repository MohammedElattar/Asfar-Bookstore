import { AwesomeButton, AwesomeButtonProgress } from "react-awesome-button";
import DataTable from "react-data-table-component";
import ImageZoom from "../../components/ImageZoom";
import global from "../../styles/pages/admin/global.module.scss";
import s from "../../styles/pages/admin/products.module.scss";
import { useAdminContext } from "../../context/AdminContext";
import { apiHttp, cls, tableCustomStyles } from "../../utils/utils";
import { useState } from "react";

import Menu from "../../components/Admin/Menu";
import InputControl from "../../components/InputControl/InputControl";
import useInput from "../../hooks/useInput";
import { useEffect } from "react";
import ImagePreview from "../../components/Admin/ImagePreview";
import Loading from "../../components/Loading";
import { useRouter } from "next/router";
import { useRef } from "react";
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
        <div className="d-flex gap-1 flex-wrap">
          <AwesomeButton
            type="secondary"
            size="x-small"
            style={{ height: "35px", width: "100%" }}
            onPress={() => product.setCurrentProduct(product)}
          >
            تعديل
          </AwesomeButton>
          <AwesomeButton
            type="secondary"
            size="x-small"
            style={{ height: "35px", width: "100%" }}
            className={global.deleteButton}
            onPress={() => product.deleteProduct(product)}
          >
            حذف
          </AwesomeButton>
          {/* <AwesomeButton
            type="secondary"
            size="x-small"
            style={{ height: "35px", width: "100%" }}
            onPress={() => product.setAdditionalInfo(product)}
          >
            معلومات اضافية
          </AwesomeButton> */}
        </div>
      );
    },
  },
];

export default function Products() {
  const {
    data: { data: products, meta },
    setData,
  } = useAdminContext();

  const [loading, setLoading] = useState(false);
  const [perPage, setPerPage] = useState(10);
  const [addProductIsActive, setAddProductIsActive] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [additionalInfo, setAdditionalInfo] = useState(null);
  const [searchProps, setSearchError, setSearchProps] = useInput();
  const [searchData, setSearchData] = useState(null);
  const [searchTotal, setSearchTotal] = useState(0);
  const router = useRouter();
  const waitTime = 500;
  const timer = useRef();
  let total = meta?.total;
  const { data: categories } = useFetchCategories();
  const handlePerRowsChange = async (newRows, page) => {
    setLoading(true);

    try {
      const res = await apiHttp.get(`/v1/books?page=${page}&cnt=${newRows}`);
      console.log(`Rows Per Page Change Response =>`, res);
      setData(res.data);
      setLoading(false);
      setPerPage(newRows);
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

  const search = async (text) => {
    setLoading(true);
    try {
      const url = `http://localhost:8000/api/search/books/${
        text || searchProps.value
      }?cnt=${perPage}`;
      console.log(`URL =>`, url);
      const res = await apiHttp.get(url);
      console.log(`Search Response =>`, res);
      setSearchData(res.data.data);
      setSearchTotal(res.data.meta.total);
    } catch (err) {
      console.log(`Search Error =>`, err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchKeyUp = (e) => {
    const text = e.currentTarget.value;
    console.log(`Text => ${text}`);

    if (timer.current) {
      clearTimeout(timer.current);
    }

    timer.current = setTimeout(() => {
      if (text !== "") {
        search(text);
      } else {
        setSearchError(false);
        setSearchData(null);
        setSearchTotal(null);
      }
    }, waitTime);
  };

  const deleteAll = async () => {
    if (!window.confirm(`سيتم حذف المنتجات نهائيا`)) return;
    setLoading(true);
    try {
      const res = await apiHttp.delete("/v1/books/delete_all");
      console.log(`Delete All Response =>`, res);
      if (res.data.type === "success") {
        setData({ data: [] });
      }
    } catch (err) {
      console.log(`Delete All Error =>`, err);
    } finally {
      setLoading(false);
    }
  };

  const data = searchData || products;
  console.log(`Data =>`, data);

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
          <AwesomeButton
            type="secondary"
            onPress={deleteAll}
            className={global.deleteButton}
          >
            حذف كل المنتجات
          </AwesomeButton>
        </div>

        <form
          className={global.searchWrapper}
          onSubmit={(e) => e.preventDefault()}
        >
          <InputControl
            props={searchProps}
            label="بحث"
            onKeyUp={handleSearchKeyUp}
          />
        </form>

        <DataTable
          columns={columns}
          data={data?.map((product) => ({
            ...product,
            setCurrentProduct,
            deleteProduct,
            setAdditionalInfo,
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
          paginationTotalRows={total || searchTotal}
          onChangeRowsPerPage={handlePerRowsChange}
          onChangePage={fetchProducts}
          noDataComponent={<h3>لا يوجد بيانات لعرضها</h3>}
        />
      </div>

      <div
        className={[
          "overlay",
          addProductIsActive || currentProduct || additionalInfo
            ? "active"
            : "",
        ].join(" ")}
        onClick={() => {
          setAddProductIsActive(false);
          setCurrentProduct(null);
          setAdditionalInfo(null);
        }}
      ></div>
      <AddProductMenu
        {...{ addProductIsActive, setAddProductIsActive, categories }}
      />
      <EditProductMenu {...{ currentProduct, setCurrentProduct, categories }} />
      <AdditionalInfoMenu {...{ additionalInfo, setAdditionalInfo }} />
    </>
  );
}

function AddProductMenu({
  addProductIsActive,
  setAddProductIsActive,
  categories,
}) {
  const [nameProps, setNameError, setNameProps] = useInput("");
  const [writterProps, setWritterError, setWritterProps] = useInput("");
  const [publisherProps, setPublisherError, setPublisherProps] = useInput("");
  const [vendorProps, setVendorError, setVendorProps] = useInput("");
  const [priceProps, setPriceError, setPriceProps] = useInput("");
  const [quantityProps, setQuantityError, setQuantityProps] = useInput("");
  const [categoryProps, setCategoryError, setCategoryProps] = useInput();
  const [image, setImage] = useState(null);
  const [resultMsg, setResultMsg] = useState("");
  const [error, setError] = useState(null);

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
      formData.append("category", categoryProps.value);
      if (image) {
        formData.append("img", image);
      }

      console.log(
        `Form Data To Send =>`,
        Object.fromEntries(formData.entries())
      );

      const res = await apiHttp.post("/v1/books", formData);
      console.log(`Create Book Response =>`, res);

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
    setCategoryProps((e) => ({
      ...e,
      value: categories?.at(0)?.id,
      error: false,
    }));
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
        <InputControl
          label="القسم"
          props={categoryProps}
          style={{ gridColumn: "span 2" }}
          select
          options={categories}
          defaultValue={categories?.data?.at(0)}
        />
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

function EditProductMenu({ currentProduct, setCurrentProduct, categories }) {
  const [nameProps, setNameError, setNameProps] = useInput("");
  const [writterProps, setWritterError, setWritterProps] = useInput("");
  const [publisherProps, setPublisherError, setPublisherProps] = useInput("");
  const [vendorProps, setVendorError, setVendorProps] = useInput("");
  const [priceProps, setPriceError, setPriceProps] = useInput("");
  const [quantityProps, setQuantityError, setQuantityProps] = useInput("");
  const [categoryProps, setCategoryError, setCategoryProps] = useInput("");
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
    setCategoryProps((prev) => ({
      ...prev,
      error: false,
      helperText: "",
      value: currentProduct.category_id || "",
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
        <InputControl
          label="القسم"
          props={categoryProps}
          select
          options={categories}
          style={{ gridColumn: "span 2" }}
        />
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

function AdditionalInfoMenu({ additionalInfo, setAdditionalInfo }) {
  return (
    <Menu
      title="معلومات اضافية"
      className={cls(additionalInfo ? "active" : "", s.menu)}
      onClose={() => setCurrentProduct(false)}
    >
      {[
        { key: "isbn", value: "132456789" },
        { key: "pages", value: "520" },
      ].map((info) => (
        <p key={info.key} className="py-2 fs-5 d-flex justify-content-between">
          <span>{info.key}</span>
          <span>{info.value}</span>
        </p>
      ))}
    </Menu>
  );
}

function useFetchCategories() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await apiHttp.get(`/v1/books/categories`);
        console.log(`Fetch Categories Response =>`, res);
        setData(res.data.data);
      } catch (err) {
        console.log(`Fetch Categories Error =>`, err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return { loading, data };
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
