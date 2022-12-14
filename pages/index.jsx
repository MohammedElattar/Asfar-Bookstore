import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { BiArrowBack } from "react-icons/bi";
import { FaBook, FaCcMastercard, FaSearch, FaTruck } from "react-icons/fa";
import CounterBox from "../components/CounterBox/CounterBox";
import ProductsGrid from "../components/ProductsGrid/ProductsGrid";
import Button from "../components/Button/Button";
import { getPage, getProduct } from "../json/products";
import { apiHttp, getWebsiteInfo } from "../utils/utils";

export default function Home({ products, websiteInfo }) {
  return (
    <>
      <Head>
        <title>{`${websiteInfo?.title} - كل كتبك عندنا`}</title>
      </Head>
      <Landing />
      <HelpingTools />
      <Partners />
      <UsedBooksStore />
      <Program />
      <RecentlyArrived products={products?.slice(0, 8)} />
      <MostSalled products={products?.slice(8, 16)} />
    </>
  );
}

function Landing() {
  return (
    <div
      className={`py-5 home-landing`}
      style={{
        backgroundImage: "linear-gradient(135deg, #f7be29, #055250)",
      }}
    >
      <div className={"container d-flex flex-column flex-md-row gap-5 align-items-center h-100"}>
        <div>
          <Image src="/images/landing.png" width={321.5} height={500} alt="Nahdet Masr" />
        </div>
        <div className={"text-white text"}>
          <div className="d-flex align-items-end gap-5">
            <h4>جميع الإصدارات</h4>
          </div>
          <h1 className="fw-bold fs-1">نهضة مصر للصحافة</h1>
          <p className="my-4 fs-5">
            اطلب جميع إصدارات نهضة مصر للصحافة، من أي مكان في العالم تصلك أينما كنت في زمن قياسي.
          </p>
          <Link href="#" className={`landingButton font`}>
            تصفح الإصدارات
            <BiArrowBack className="fs-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}

function HelpingTools() {
  return (
    <div className="py-5 position-relative">
      <h1 className="title">أدوات مساعدة</h1>
      <div className="container">
        <div className="row">
          <div className="col-12 col-sm-6 col-md-4 col-lg-3 p-2">
            <div className="d-flex flex-column align-items-center box">
              <Link href="/ambassadors-program-asfar">
                <FaCcMastercard />
              </Link>
              <Link href="/ambassadors-program-asfar">تسويق بالعمولة</Link>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-md-4 col-lg-3 p-2">
            <div className="d-flex flex-column align-items-center box">
              <Link href="/ambassadors-program-asfar">
                <FaBook />
              </Link>
              <Link href="/ambassadors-program-asfar">وزع إصداراتك</Link>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-md-4 col-lg-3 p-2">
            <div className="d-flex flex-column align-items-center box">
              <Link href="/ambassadors-program-asfar">
                <FaTruck />
              </Link>
              <Link href="/ambassadors-program-asfar">تتبع طلباتك</Link>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-md-4 col-lg-3 p-2">
            <div className="d-flex flex-column align-items-center box">
              <Link href="/ambassadors-program-asfar">
                <FaSearch />
              </Link>
              <Link href="/ambassadors-program-asfar">ابحث عن كتاب</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Partners() {
  return (
    <div className="partners py-5" style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}>
      <h1 className="title">شركاؤنا الناشرون</h1>
      <div className="container">
        <div className="row m-0 justify-content-center gap-2">
          <div className="col-12 col-md-4">
            <CounterBox title="كتاب ومجلة" target={50000} />
          </div>
          <div className="col-12 col-md-4">
            <CounterBox title="دار نشر عربية وأجنبية" target={500} />
          </div>
        </div>
        <Button href={"#"} centered className={"mt-5"}>
          دخول لصفحة الناشرين
        </Button>
      </div>
    </div>
  );
}

function UsedBooksStore() {
  return (
    <div className="py-5 usedBookStore">
      <h1 className="title text-white mb-5">سوق الكتاب المستعمل</h1>
      <div className="container text-center text-white">
        <h3>نوادر الكتب والمجلات القديمة</h3>
        <p className="mt-5 fs-4">
          نتجول في الأسواق ونستقبل الكتب من المكتبات الشخصية ونجمع لك نوادر الإصدارات وقديم الكتب
          بأسعار مخفضة.
        </p>

        <Button color="#f7be29" href={"#"} centered>
          تجول في سوق المستعمل
        </Button>
      </div>
    </div>
  );
}

function Program() {
  return (
    <div className="py-5">
      <h1 className="title">برنامج سفراء</h1>
      <div className="container text-center">
        <h3 className="my-5">اربح من التسويق بالعمولة</h3>
        <p className="fs-4 mx-auto mt-4" style={{ maxWidth: "550px" }}>
          هل لديك جروب أو صفحة على فيسبوك تتخصص في الكتب والمحتوى الثقافي، أو لديك إمكانية الوصول
          لجمهور القراء من خلال متابعيك على حسابك الشخصي في فيسبوك أو موقعك الإلكتروني؟ .. هذا
          البرنامج قد يكون طريقك لتحسين الدخل.
        </p>
        <Button href="ambassadors-program-asfar/" centered className="mt-5">
          اطلع على تفاصيل البرنامج
        </Button>
      </div>
    </div>
  );
}

function RecentlyArrived({ products }) {
  return (
    <div className="py-5">
      <h1 className="title">وصل حديثًا</h1>
      <div className="container products-grid">
        <ProductsGrid products={products} />
      </div>
    </div>
  );
}
function MostSalled({ products }) {
  return (
    <div className="py-5">
      <h1 className="title">الأكثر مبيعًا</h1>
      <div className="container products-grid">
        <ProductsGrid products={products} />
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const products = getPage(5);

  const websiteInfo = await getWebsiteInfo();

  const cartItem = getProduct("searching-for-ferdinan-de-saussure-book");
  cartItem.quantity = 3;

  return {
    props: {
      products,
      websiteInfo,
      cartProducts: [cartItem, cartItem],
    },
    revalidate: 120,
  };
}
