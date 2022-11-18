import Head from "next/head";
import Link from 'next/link';
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import Navbar from "../../components/Navbar/Navbar";
import ProductsGrid from "../../components/ProductsGrid/ProductsGrid";

export default function findProduct({ products, publishers, writters }) {
    console.log(writters);
    return (
        <>
            <Head>
                <title>ابحث عن كتاب... – أسفار</title>
            </Head>
            <Navbar />
            <Search />
            <div className="container search-products-result d-flex">
                <SortingTools publishers={publishers} writters={writters} />
                <ProductsWrapper products={products} />
            </div>
        </>
    );
}

function Search() {
    const [text, setText] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(`submit =>>>`);
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
                            onChange={(e) => setText(e.target.value)}
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
                <Link href='/products/1'>1</Link>
                <Link href='/products/2'>2</Link>
                <Link href='/products/3'>3</Link>
                <Link href='/products/4'>4</Link>
                <Link href='/products/5'>5</Link>
                <Link href='/products/6'>6</Link>
                <Link href='/products/7'>7</Link>
                <Link href='/products/8'>8</Link>
                <Link href='/products/9'>9</Link>
            </div>
        </div>
    );
}

function Writters({ writters }) {
    const [text, setText] = useState("");
    const [expanded, setExpanded] = useState(false)
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
                {
                    writters.filter(e => text ? e.name.includes(text) : true)
                        .slice(0, expanded ? writters.length : 8)
                        .map(writter => (
                            <div className="field" key={writter.name}>
                                <input type="checkbox" id={writter.name} />
                                <label htmlFor={writter.name}>
                                    {writter.name}
                                    <span>{writter.number}</span>
                                </label>
                            </div>
                        ))
                }
            </div>

            <button type='button' className='sort-btn' onClick={() => setExpanded(e => !e)}>{expanded ? 'اقل' : 'المزيد'}</button>

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
                {publishers.filter(e => text ? e.name.includes(text) : true)
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
                {
                    expanded ? 'اقل' : 'المزيد'
                }
            </button>
        </div>
    );
}

function Categories() {
    const [text, setText] = useState("");
    return (
        <div className="wrapper">
            <h3 className="heading">التصنيفات</h3>
            <div className="message">استخدم صندوق البحث لعرض المزيد من التصنيفات</div>
            <form className="search">
                <button type="submit">
                    <FaSearch />
                </button>
                <div className="search-input">
                    <input
                        type="text"
                        placeholder="ابحث…"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                </div>
            </form>
            <div className="field">
                <input type="checkbox" id="s1" />
                <label htmlFor="s1">
                    {" "}
                    شحن للخارج
                    <span>797</span>
                </label>
            </div>
            <div className="field">
                <input type="checkbox" id="s2" />
                <label htmlFor="s2">
                    {" "}
                    شحن للخارج
                    <span>797</span>
                </label>
            </div>
            <div className="field">
                <input type="checkbox" id="s3" />
                <label htmlFor="s3">
                    {" "}
                    شحن للخارج
                    <span>797</span>
                </label>
            </div>
        </div>
    );
}

function Status() {
    const [text, setText] = useState("");
    return (
        <div>
            <h3 className="heading">التصنيفات</h3>
            <div className="message">استخدم صندوق البحث لعرض المزيد من التصنيفات</div>
            <form className="search">
                <button type="submit">
                    <FaSearch />
                </button>
                <div className="search-input">
                    <input
                        type="text"
                        placeholder="ابحث…"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                </div>
            </form>
            <div className="field">
                <input type="checkbox" id="s1" />
                <label htmlFor="s1">
                    {" "}
                    جديد
                    <span>797</span>
                </label>
            </div>
            <div className="field">
                <input type="checkbox" id="s2" />
                <label htmlFor="s2">
                    {" "}
                    مستعمل
                    <span>797</span>
                </label>
            </div>
        </div>
    );
}

function SortingTools({ publishers, writters }) {
    return (
        <div className="sort-wrapper">
            <Writters writters={writters} />
            <Publishers publishers={publishers} />
            <Categories />
            <Status />
        </div>
    );
}

export async function getStaticPaths() {
    return {
        paths: [
            { params: { pageNumber: "1" } },
            { params: { pageNumber: "2" } },
            { params: { pageNumber: "3" } },
            { params: { pageNumber: "4" } },
            { params: { pageNumber: "5" } },
            { params: { pageNumber: "6" } },
            { params: { pageNumber: "7" } },
            { params: { pageNumber: "8" } },
            { params: { pageNumber: "9" } },
        ],
        fallback: false, // can also be true or 'blocking'
    };
}

export async function getStaticProps(context) {
    try {
        const pageNumber = context.params.pageNumber;
        const products = (await import(`../../products/page${pageNumber}.json`))
            .default;

        const publishersObject = (await import("../../products/publishers.json"))
            .default;

        const publishersArray = [];
        for (let pub in publishersObject) {
            publishersArray.push({ name: pub, number: publishersObject[pub] });
        }


        const writtersObject = (await import("../../products/writters.json"))
            .default;

        const writtersArray = [];
        for (let writter in writtersObject) {
            writtersArray.push({ name: writter, number: writtersObject[writter] });
        }

        return {
            props: {
                products,
                publishers: publishersArray.sort((a, b) => b.number - a.number),
                writters: writtersArray.sort((a, b) => b.number - a.number),
            },
        };
    } catch (err) {
        return {
            notFound: true,
        };
    }
}
