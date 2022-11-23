import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { FaFilter, FaSearch } from "react-icons/fa";
import Pagination from "../../components/Pagination/Pagination";
import ProductsGrid from "../../components/ProductsGrid/ProductsGrid";
import useQueryInput from "../../hooks/useQueryInput.js";
import { getCategories } from "../../json/categories";
import { getAll, getPage } from "../../json/products";
import { getPublishers } from "../../json/publishers";
import { getWritters } from "../../json/writters";
import s from "../../styles/find-product.module.scss";
import url from "url";
import useMediaQuery from "../../hooks/useMediaQuery";

export default function FindProduct({
  publishers,
  writters,
  categories,
  products,
}) {
  // useEffect(() => {
  // }, []);

  return (
    <>
      <Head>
        <title>ابحث عن كتاب... – أسفار</title>
      </Head>
      <Search />
      <div className={`container ${s["search-products-result"]} d-flex`}>
        <SortingTools
          publishers={publishers}
          writters={writters}
          categories={categories}
        />
        <ProductsWrapper products={products} />
      </div>
    </>
  );
}

function Search() {
  const router = useRouter();
  const [text, setText] = useState(router.query?.q || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    search(text);
  };
  const search = (text) => {
    if (text) {
      router.push(
        {
          pathname: router.pathname,
          query: { ...router.query, q: text },
        },
        undefined,
        { scroll: false }
      );
    } else {
      delete router.query.q;
      router.push(
        {
          pathname: router.pathname,
          query: { ...router.query },
        },
        undefined,
        { scroll: false }
      );
    }
  };
  const handleChange = (e) => {
    setText(e.target.value);
    search(e.target.value);
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
              value={text}
              onChange={handleChange}
            />
          </div>
        </form>
      </div>
    </div>
  );
}

function ProductsWrapper({ products }) {
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

function Writters({ writters }) {
  const [text, setText] = useState("");
  const [expanded, setExpanded] = useState(false);
  const { handleInputChange } = useQueryInput("writters");

  return (
    <div className={s.wrapper}>
      <h3 className={s.heading}>الكتّاب</h3>
      <div className={s.message}>استخدم صندوق البحث لعرض المزيد من الكتاب</div>
      <div className={s["search-input"]}>
        <input
          type="text"
          placeholder="ابحث…"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <div className={s["fields"]}>
        {writters
          ?.filter((e) => (text ? e.name.includes(text) : true))
          .slice(0, expanded ? writters.length : 8)
          .map((writter) => (
            <div className={s["field"]} key={writter.name}>
              <input
                type="checkbox"
                id={writter.name}
                onChange={(e) => handleInputChange(e, writter.name)}
              />
              <label htmlFor={writter.name}>
                {writter.name}
                <span>{writter.number}</span>
              </label>
            </div>
          ))}
      </div>

      <button
        type="button"
        className={s["sort-btn"]}
        onClick={() => setExpanded((e) => !e)}
      >
        {expanded ? "اقل" : "المزيد"}
      </button>
    </div>
  );
}

function Publishers({ publishers }) {
  const [text, setText] = useState("");
  const [expanded, setExpanded] = useState(false);
  const { handleInputChange } = useQueryInput("publishers");
  return (
    <div className={s.wrapper}>
      <h3 className={s.heading}>الناشرين</h3>
      <div className={s.message}>
        استخدم صندوق البحث لعرض المزيد من الناشرين
      </div>
      <div className={s["search-input"]}>
        <input
          type="text"
          placeholder="ابحث…"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <div className={s.fields}>
        {publishers
          ?.filter((e) => (text ? e.name.includes(text) : true))
          .slice(0, expanded ? publishers.length : 8)
          .map((pub) => (
            <div className={s.field} key={pub.name}>
              <input
                type="checkbox"
                id={pub.name}
                onChange={(e) => handleInputChange(e, pub.name)}
              />
              <label htmlFor={pub.name}>
                {pub.name}
                <span>{pub.number}</span>
              </label>
            </div>
          ))}
      </div>
      <button
        className={s["sort-btn"]}
        type="button"
        onClick={() => setExpanded((e) => !e)}
      >
        {expanded ? "اقل" : "المزيد"}
      </button>
    </div>
  );
}

function Categories({ categories }) {
  const [text, setText] = useState("");
  const [expanded, setExpanded] = useState(false);
  const { handleInputChange } = useQueryInput("categories");
  return (
    <div className={s.wrapper}>
      <h3 className={s.heading}>التصنيفات</h3>
      <div className={s.message}>
        استخدم صندوق البحث لعرض المزيد من التصنيفات
      </div>
      <div className={s["search-input"]}>
        <input
          type="text"
          placeholder="ابحث…"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <div className={s["fields"]}>
        {categories
          ?.filter((e) => (text ? e.name.includes(text) : true))
          .slice(0, expanded ? categories.length : 8)
          .map((category) => (
            <div className={s["field"]} key={category.name}>
              <input
                type="checkbox"
                id={category.name}
                onChange={(e) => handleInputChange(e, category.name)}
              />
              <label htmlFor={category.name}>
                {category.name}
                <span>{category.number}</span>
              </label>
            </div>
          ))}
      </div>
      <button
        className={s["sort-btn"]}
        type="button"
        onClick={() => setExpanded((e) => !e)}
      >
        {expanded ? "اقل" : "المزيد"}
      </button>
    </div>
  );
}

function Status() {
  const [text, setText] = useState("");
  const { handleInputChange } = useQueryInput("status");
  return (
    <div className={s.wrapper}>
      <h3 className={s.heading}>الحالة</h3>

      <div className={s["search-input"]}>
        <input
          type="text"
          placeholder="ابحث…"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <div className={s["fields"]}>
        <div className={s["field"]}>
          <input
            type="checkbox"
            id="s1"
            onChange={(e) => handleInputChange(e, "جديد")}
          />
          <label htmlFor="s1">
            جديد
            <span>8619</span>
          </label>
        </div>
        <div className={s["field"]}>
          <input
            type="checkbox"
            id="s2"
            onChange={(e) => handleInputChange(e, "مستعمل")}
          />
          <label htmlFor="s2">
            مستعمل
            <span>222</span>
          </label>
        </div>
      </div>
    </div>
  );
}

function SortingTools({ publishers, writters, categories }) {
  const [isActive, setActive] = useState(false);
  const isSmallDevice = useMediaQuery("(max-width: 992px)");
  return (
    <>
      <div className={`${s["sort-wrapper"]} ${isActive ? s.active : ""}`}>
        <Writters writters={writters} />
        <Publishers publishers={publishers} />
        <Categories categories={categories} />
        <Status />
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

export async function getServerSideProps(context) {
  const queryObject = url.parse(context.req.url, true).query;
  const page = queryObject.pageNumber;
  const searchString = queryObject.q;
  const writtersArray = queryObject.writters?.split(",").filter((e) => e) || [];
  const publishersArray =
    queryObject.publishers?.split(",").filter((e) => e) || [];

  try {
    const props = {};

    props.publishers = getPublishers();
    props.writters = getWritters();
    props.categories = getCategories();

    if (searchString || writtersArray.length || publishersArray.length) {
      const all = getAll();
      const filtered = all
        .filter((e) => (searchString ? e.title.includes(searchString) : true))
        .filter((e) =>
          writtersArray.length ? writtersArray.includes(e.writter?.at(0)) : true
        )
        .filter((e) =>
          publishersArray.length
            ? publishersArray.includes(e.publisher?.at(0)) ||
              publishersArray.includes(e.vendors?.at(0))
            : true
        );
      props.products = filtered;
    } else {
      const pageProducts = getPage(page);
      if (!pageProducts) {
        return {
          notFound: true,
        };
      }
      props.products = pageProducts;
    }

    return {
      props,
    };
  } catch (err) {
    console.error(err);
    return {
      props: {},
    };
  }
}
