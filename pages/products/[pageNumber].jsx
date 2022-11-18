import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import ActiveLink from "../../components/ActiveLink";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import ProductsGrid from "../../components/ProductsGrid/ProductsGrid";

export default function FindProduct({
    products,
    publishers,
    writters,
    categories,
    query,
    error,
}) {
    useEffect(() => { }, []);

    return (
        <>
            <Head>
                <title>ابحث عن كتاب... – أسفار</title>
            </Head>
            <Navbar />
            <Search />
            <div className="container search-products-result d-flex">
                <SortingTools
                    publishers={publishers}
                    writters={writters}
                    categories={categories}
                />
                <ProductsWrapper products={products} />
            </div>
            <Footer />
        </>
    );
}

function Search() {
    const [text, setText] = useState("");
    const router = useRouter();

    const handleSubmit = (e) => {
        e.preventDefault();
        search(text);
    };
    const search = (text) => {
        if (text) {
            router.query.q = text;
            router.push(router);
        } else {
            delete router.query.q;
            router.push(router);
        }
    };
    const handleChange = (e) => {
        setText(e.target.value);
        search(e.target.value);
    };
    return (
        <div className="py-5 search-container">
            <div className="container">
                <form onSubmit={handleSubmit} className="search">
                    <button type="submit">
                        <FaSearch />
                    </button>
                    <div className="search-input">
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
        <div className="products">
            <header>37,140نتيجة</header>
            <div className="content">
                <ProductsGrid products={products} />
            </div>
            <div className="pagination">
                <ActiveLink href="/products/1">1</ActiveLink>
                <ActiveLink href="/products/2">2</ActiveLink>
                <ActiveLink href="/products/3">3</ActiveLink>
                <ActiveLink href="/products/4">4</ActiveLink>
                <ActiveLink href="/products/5">5</ActiveLink>
                <ActiveLink href="/products/6">6</ActiveLink>
                <ActiveLink href="/products/7">7</ActiveLink>
                <ActiveLink href="/products/8">8</ActiveLink>
                <ActiveLink href="/products/9">9</ActiveLink>
            </div>
        </div>
    );
}

function Writters({ writters }) {
    const [text, setText] = useState("");
    const [expanded, setExpanded] = useState(false);
    const [checked, setChecked] = useState([]);
    const router = useRouter();

    const handleInputChange = (e, text) => {
        if (e.target.checked) {
            setChecked((s) => [...s, text]);
        } else {
            setChecked((s) => s.filter((e) => e !== text));
        }
    };

    useEffect(() => {
        if (checked.length) {
            router.query.writters = checked.toString();
            router.push(router);
        } else {
            delete router.query.writters;
            router.push(router);
        }
    }, [checked.toString()]);

    return (
        <div className="wrapper">
            <h3 className="heading">الكتّاب</h3>
            <div className="message">استخدم صندوق البحث لعرض المزيد من الكتاب</div>
            <div className="search-input">
                <input
                    type="text"
                    placeholder="ابحث…"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
            </div>
            <div className="fields">
                {writters
                    ?.filter((e) => (text ? e.name.includes(text) : true))
                    .slice(0, expanded ? writters.length : 8)
                    .map((writter) => (
                        <div className="field" key={writter.name}>
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
                className="sort-btn"
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
    return (
        <div className="wrapper">
            <h3 className="heading">الناشرين</h3>
            <div className="message">استخدم صندوق البحث لعرض المزيد من الناشرين</div>
            <div className="search-input">
                <input
                    type="text"
                    placeholder="ابحث…"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
            </div>
            <div className="fields">
                {publishers
                    ?.filter((e) => (text ? e.name.includes(text) : true))
                    .slice(0, expanded ? publishers.length : 8)
                    .map((pub) => (
                        <div className="field" key={pub.name}>
                            <input type="checkbox" id={pub.name} />
                            <label htmlFor={pub.name}>
                                {pub.name}
                                <span>{pub.number}</span>
                            </label>
                        </div>
                    ))}
            </div>
            <button
                className="sort-btn"
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
    return (
        <div className="wrapper">
            <h3 className="heading">التصنيفات</h3>
            <div className="message">استخدم صندوق البحث لعرض المزيد من التصنيفات</div>
            <div className="search-input">
                <input
                    type="text"
                    placeholder="ابحث…"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
            </div>
            <div className="fields">
                {categories
                    ?.filter((e) => (text ? e.name.includes(text) : true))
                    .slice(0, expanded ? categories.length : 8)
                    .map((category) => (
                        <div className="field" key={category.name}>
                            <input type="checkbox" id={category.name} />
                            <label htmlFor={category.name}>
                                {category.name}
                                <span>{category.number}</span>
                            </label>
                        </div>
                    ))}
            </div>
            <button
                className="sort-btn"
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
    return (
        <div>
            <h3 className="heading">الحالة</h3>

            <div className="search-input">
                <input
                    type="text"
                    placeholder="ابحث…"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
            </div>
            <div className="fields">
                <div className="field">
                    <input type="checkbox" id="s1" />
                    <label htmlFor="s1">
                        جديد
                        <span>8619</span>
                    </label>
                </div>
                <div className="field">
                    <input type="checkbox" id="s2" />
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
    return (
        <div className="sort-wrapper">
            <Writters writters={writters} />
            <Publishers publishers={publishers} />
            <Categories categories={categories} />
            <Status />
        </div>
    );
}

// export async function getStaticPaths() {
//     return {
//         paths: [
//             { params: { pageNumber: "1" } },
//             { params: { pageNumber: "2" } },
//             { params: { pageNumber: "3" } },
//             { params: { pageNumber: "4" } },
//             { params: { pageNumber: "5" } },
//             { params: { pageNumber: "6" } },
//             { params: { pageNumber: "7" } },
//             { params: { pageNumber: "8" } },
//             { params: { pageNumber: "9" } },
//         ],
//         fallback: false,
//     };
// }

export async function getServerSideProps(context) {
    const pageNumber = context.params.pageNumber;
    const url = (await import("url")).default;
    const queryObject = url.parse(context.req.url, true).query;
    const searchString = queryObject.q;
    const writtersString = queryObject.writters;

    try {
        const productsPromise = import(`../../products/page${pageNumber}.json`);
        const publishersObjectPromise = import("../../products/publishers.json");
        const writtersObjectPromise = import("../../products/writters.json");
        const categoriesObjectPromise = import("../../products/categories.json");

        let allProducts =
            Promise.allSettled([
                import("../../products/page1.json"),
                import("../../products/page2.json"),
                import("../../products/page3.json"),
                import("../../products/page4.json"),
                import("../../products/page5.json"),
                import("../../products/page6.json"),
                import("../../products/page7.json"),
                import("../../products/page8.json"),
                import("../../products/page9.json"),
            ])

        let products = (await productsPromise).default;
        const publishersObject = await publishersObjectPromise;
        const writtersObject = await writtersObjectPromise;
        const categoriesObject = await categoriesObjectPromise;

        const publishersArray = [];
        for (let pub in publishersObject.default) {
            publishersArray.push({ name: pub, number: publishersObject[pub] });
        }

        const writtersArray = [];
        for (let writter in writtersObject.default) {
            writtersArray.push({ name: writter, number: writtersObject[writter] });
        }

        const categoriesArray = [];
        for (let category in categoriesObject.default) {
            categoriesArray.push({
                name: category,
                number: categoriesObject[category],
            });
        }

        if (searchString) {
            products = (await allProducts).map(e => e.value?.default).flat().filter((e) => e.post_title.includes(searchString));
        }

        return {
            props: {
                products: products,
                publishers: publishersArray.sort((a, b) => b.number - a.number),
                writters: writtersArray.sort((a, b) => b.number - a.number),
                categories: categoriesArray.sort((a, b) => b.number - a.number),
                query: queryObject,
            },
        };
    } catch (err) {
        return {
            props: {
                error: err.message,
            },
        };
    }
}
