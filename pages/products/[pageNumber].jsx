import Head from "next/head";
import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useState } from "react";
import { FaFilter, FaSearch } from "react-icons/fa";
import Pagination from "../../components/Pagination/Pagination";
import ProductsGrid from "../../components/ProductsGrid/ProductsGrid";
import { getCategories } from "../../json/categories";
import { getPage, getPagesPaths } from "../../json/products";
import { getPublishers } from "../../json/publishers";
import { getWritters } from "../../json/writters";
import s from "../../styles/pages/products.module.scss";
import useMediaQuery from "../../hooks/useMediaQuery";
import { apiHttp } from "../../utils/utils";

const Context = createContext();

export default function FindProduct({
  publishers,
  writters,
  categories,
  pageProducts,
}) {
  console.log(pageProducts);
  const [searchText, setSearchText] = useState("");
  const router = useRouter();
  const [products, setProducts] = useState(pageProducts);

  const searchForProducts = async () => {
    const res = await fetch(`/api/search?q=${searchText}`);
    const data = await res.json();
    setProducts(data.products);
  };

  useEffect(() => {
    if (searchText.trim()) {
      searchForProducts();
    } else {
      setProducts(pageProducts);
    }
    // eslint-disable-next-line
  }, [searchText, router.query.pageNumber]);

  const contextValue = {
    searchText,
    setSearchText,
    products,
    setProducts,
  };

  return (
    <>
      <Head>
        <title>ابحث عن كتاب... – أسفار</title>
      </Head>
      <Context.Provider value={contextValue}>
        <Search />
        <div className={`container ${s["search-products-result"]} d-flex`}>
          <SortingTools
            publishers={publishers}
            writters={writters}
            categories={categories}
          />
          <ProductsWrapper />
        </div>
      </Context.Provider>
    </>
  );
}

function Search() {
  const { searchText, setSearchText } = useContext(Context);

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className={`py-5 ${s["search-container"]}`}>
      <div className="container">
        <form onSubmit={handleSubmit} className={s.search}>
          <button type="submit">
            <FaSearch />
          </button>
          <div className={s["search-input"]}>
            <input
              type="text"
              placeholder="ابحث عن كتاب، كاتب، دار نشر..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
        </form>
      </div>
    </div>
  );
}

function ProductsWrapper() {
  const { products } = useContext(Context);

  return (
    <div className={s.products}>
      {/* <header>37,140نتيجة</header> */}
      {products?.length ? (
        <>
          <div className={s.content}>
            <ProductsGrid products={products} />
          </div>
          <Pagination max={50} />
        </>
      ) : (
        <p className="text-center fs-2" style={{ color: "#777" }}>
          لا توجد نتائج
        </p>
      )}
    </div>
  );
}

function SortSection({ title, message, data }) {
  const [text, setText] = useState("");
  const [expanded, setExpanded] = useState(false);
  const handleInputChange = () => {};
  return (
    <div className={s.wrapper}>
      <h3 className={s.heading}>{title}</h3>
      {!!message && <div className={s.message}>{message}</div>}
      <div className={s["search-input"]}>
        <input
          type="text"
          placeholder="ابحث…"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <div className={s["fields"]}>
        {data
          ?.filter((e) => (text ? e.name.includes(text) : true))
          .slice(0, expanded ? data.length : 8)
          .map(({ name, number }) => (
            <div className={s["field"]} key={name}>
              <input
                type="checkbox"
                id={name}
                onChange={(e) => handleInputChange(e, name)}
              />
              <label htmlFor={name}>
                {name}
                <span>{number}</span>
              </label>
            </div>
          ))}
      </div>

      {data.length > 8 && (
        <button
          className={s["sort-btn"]}
          type="button"
          onClick={() => setExpanded((e) => !e)}
        >
          {expanded ? "اقل" : "المزيد"}
        </button>
      )}
    </div>
  );
}

function SortingTools({ publishers, writters, categories }) {
  const [isActive, setActive] = useState(false);
  const isSmallDevice = useMediaQuery("(max-width: 992px)");
  return (
    <>
      <div className={`${s["sort-wrapper"]} ${isActive ? s.active : ""}`}>
        <SortSection
          data={writters}
          title="الكتّاب"
          message="استخدم صندوق البحث لعرض المزيد من الكتاب"
        />
        <SortSection
          data={publishers}
          title="الناشرين"
          message="استخدم صندوق البحث لعرض المزيد من الناشرين"
        />
        <SortSection
          data={categories}
          title="التصنيفات"
          message="استخدم صندوق البحث لعرض المزيد من التصنيفات"
        />
        <SortSection
          data={[
            { name: "جديد", number: 786 },
            { name: "مستعمل", number: 120 },
          ]}
          title="الحالة"
        />
      </div>
      {isSmallDevice && (
        <button
          type="button"
          className={`${s.filterButton} ${isActive ? "" : s.buttonActive}`}
          onClick={() => setActive(true)}
        >
          <FaFilter />
          تصفية النتائج
        </button>
      )}
      <div
        className={`${s.overlay} ${isActive ? s.overlayActive : ""}`}
        onClick={() => setActive(false)}
      ></div>
    </>
  );
}

export async function getStaticPaths() {
  const paths = getPagesPaths();

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { pageNumber } }) {
  if (!pageNumber) {
    return { notFound: true };
  }
  const res = await apiHttp.get(
    `${process.env.PHP_SERVER_URL}/api/books?page=${pageNumber}`
  );
  if (!res.data.data?.length) {
    return { notFound: true };
  }
  const writters = getWritters();
  const publishers = getPublishers();
  const categories = getCategories();
  return {
    props: {
      pageProducts: res.data.data,
      writters,
      publishers,
      categories,
    },
  };
}
