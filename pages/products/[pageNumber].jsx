import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import ActiveLink from "../../components/ActiveLink";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import ProductsGrid from "../../components/ProductsGrid/ProductsGrid";
import useQueryInput from '../../hooks/useQueryInput.js';

export default function FindProduct({
    products,
    publishers,
    writters,
    categories,
    error
}) {
    useEffect(() => {
        console.log(products)
        console.log(error)
    }, []);

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
            router.push({
                pathname: router.pathname,
                query: { ...router.query, q: text }
            },
                undefined,
                { scroll: false }
            )
        } else {
            delete router.query.q
            router.push({
                pathname: router.pathname,
                query: { ...router.query }
            },
                undefined,
                { scroll: false }
            )
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
    const { handleInputChange } = useQueryInput('writters')

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
    const { handleInputChange } = useQueryInput('publishers')
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
                            <input type="checkbox" id={pub.name} onChange={(e) => handleInputChange(e, pub.name)} />
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
    const { handleInputChange } = useQueryInput('categories')
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
                            <input type="checkbox" id={category.name} onChange={(e) => handleInputChange(e, category.name)} />
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
    const { handleInputChange } = useQueryInput('status')
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
                    <input type="checkbox" id="s1" onChange={(e) => handleInputChange(e, 'جديد')} />
                    <label htmlFor="s1">
                        جديد
                        <span>8619</span>
                    </label>
                </div>
                <div className="field">
                    <input type="checkbox" id="s2" onChange={(e) => handleInputChange(e, 'مستعمل')} />
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


export async function getServerSideProps(context) {
    const pageNumber = context.params.pageNumber;
    const url = (await import("url")).default;
    const queryObject = url.parse(context.req.url, true).query;
    const searchString = queryObject.q;
    const writtersString = queryObject.writters;
    const publishersString = queryObject.publishers

    try {
        const productsPromise = import(`../../products/page${pageNumber}.json`);
        const publishersObjectPromise = import("../../products/publishers.json");
        const writtersObjectPromise = import("../../products/writters.json");
        const categoriesObjectPromise = import("../../products/categories.json");
        const props = {}

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

        const publishersObject = await publishersObjectPromise;
        const writtersObject = await writtersObjectPromise;
        const categoriesObject = await categoriesObjectPromise;

        props.products = (await productsPromise).default


        //
        const publishersArray = [];
        for (let pub in publishersObject.default) {
            publishersArray.push({ name: pub, number: publishersObject[pub] });
        }
        props.publishers = publishersArray.sort((a, b) => b.number - a.number)
        //

        //
        const writtersArray = [];
        for (let writter in writtersObject.default) {
            writtersArray.push({ name: writter, number: writtersObject[writter] });
        }
        props.writters = writtersArray.sort((a, b) => b.number - a.number)
        //

        //
        const categoriesArray = [];
        for (let category in categoriesObject.default) {
            categoriesArray.push({
                name: category,
                number: categoriesObject[category],
            });
        }
        props.categories = categoriesArray.sort((a, b) => b.number - a.number)
        //

        if (!pageNumber || searchString) {
            props.products = (await allProducts).map(e => e.value?.default).flat();
        }

        if (searchString) {
            props.products = props.products.filter((e) => e.post_title.includes(searchString))
        }

        const queryWrittersArray = writtersString?.split(',').filter(e => e) || [];
        if (queryWrittersArray.length) {
            props.products = props.products.filter((e) => queryWrittersArray.includes(e.post_author?.display_name))
        }

        const queryPublishersArray = publishersString?.split(',').filter(e => e) || [];
        if (queryPublishersArray.length) {
            props.products = props.products.filter((e) => queryPublishersArray.includes(e?.taxonomies?.wcpv_product_vendors[0]))
        }


        return {
            props
        };
    } catch (err) {
        return {
            props: {
                error: err.message,
            },
        };
    }
}
