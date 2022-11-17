import Head from "next/head";
import Navbar from "../components/Navbar/Navbar";
import { useEffect } from "react";
import styles from "../styles/index.module.scss";
import Link from "next/link";
import Image from "next/image";
import Layout from "../components/Layout";
import { BiArrowBack } from "react-icons/bi";
import {
  FaArrowLeft,
  FaBook,
  FaCcMastercard,
  FaCreditCard,
  FaSearch,
  FaTruck,
} from "react-icons/fa";
import Seperator from "../components/Seperator/Seperator";
import CounterBox from "../components/CounterBox/CounterBox";

export default function Home() {
  useEffect(() => {
    import("@lottiefiles/lottie-player");
  });

  return (
    <>
      <Head>
        <title>Asfar Bookstore</title>
      </Head>

      <Navbar />

      <Layout>
        <div
          className={`py-5 ${styles.landing}`}
          style={{
            backgroundImage: "linear-gradient(135deg, #f7be29, #055250)",
          }}
        >
          <div
            className={
              "container d-flex flex-column flex-md-row gap-5 align-items-center h-100"
            }
          >
            <div>
              <Image
                src="/images/landing.png"
                width={321.5}
                height={500}
                alt="Nahdet Masr"
              />
            </div>
            <div className={"text-white"}>
              <div className="d-flex align-items-end gap-5">
                <h4>جميع الإصدارات</h4>
                <lottie-player
                  autoplay
                  loop
                  mode="normal"
                  src={"/micky-animation.json"}
                  style={{ width: "200px" }}
                ></lottie-player>
              </div>
              <h1 className="fw-bold fs-1">نهضة مصر للصحافة</h1>
              <p className="my-4 fs-5">
                اطلب جميع إصدارات نهضة مصر للصحافة، من أي مكان في العالم تصلك
                أينما كنت في زمن قياسي.
              </p>
              <Link href="#" className={`${styles.landingButton} font`}>
                تصفح الإصدارات
                <BiArrowBack className="fs-5" />
              </Link>
            </div>
          </div>
        </div>

        <div className="py-5 position-relative">
          <Seperator />
          <h1 className="title">أدوات مساعدة</h1>
          <div className="container">
            <div className="row">
              <div className="col-12 col-sm-6 col-md-4 col-lg-3 p-2">
                <div
                  className={
                    "d-flex flex-column align-items-center p-2 rounded-2 gap-4 bg-gray-400 " +
                    styles.box
                  }
                >
                  <Link href="/ambassadors-program-asfar">
                    <FaCcMastercard />
                  </Link>
                  <Link href="/ambassadors-program-asfar">تسويق بالعمولة</Link>
                </div>
              </div>
              <div className="col-12 col-sm-6 col-md-4 col-lg-3 p-2">
                <div
                  className={
                    "d-flex flex-column align-items-center  rounded-2 gap-4 bg-gray-400 " +
                    styles.box
                  }
                >
                  <Link href="/ambassadors-program-asfar">
                    <FaBook />
                  </Link>
                  <Link href="/ambassadors-program-asfar">وزع إصداراتك</Link>
                </div>
              </div>
              <div className="col-12 col-sm-6 col-md-4 col-lg-3 p-2">
                <div
                  className={
                    "d-flex flex-column align-items-center  rounded-2 gap-4 bg-gray-400 " +
                    styles.box
                  }
                >
                  <Link href="/ambassadors-program-asfar">
                    <FaTruck />
                  </Link>
                  <Link href="/ambassadors-program-asfar">تتبع طلباتك</Link>
                </div>
              </div>
              <div className="col-12 col-sm-6 col-md-4 col-lg-3 p-2">
                <div
                  className={
                    "d-flex flex-column align-items-center rounded-2 gap-4 bg-gray-400 " +
                    styles.box
                  }
                >
                  <Link href="/ambassadors-program-asfar">
                    <FaSearch />
                  </Link>
                  <Link href="/ambassadors-program-asfar">ابحث عن كتاب</Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="partners py-5"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
        >
          <h1 className="title">شركاؤنا الناشرون</h1>
          <div className="container">
            <div className="row m-0 justify-content-center">
              <div className="col-4">
                <CounterBox title="كتاب ومجلة" target={50000} />
              </div>
              <div className="col-4">
                <CounterBox title="دار نشر عربية وأجنبية" target={500} />
              </div>
            </div>
            <Link href="" className="main-btn m-auto mt-5">
              دخول لصفحة الناشرين
              <div className="icon">
                <FaArrowLeft />
              </div>
            </Link>
          </div>
        </div>
      </Layout>
    </>
  );
}

export async function getStaticProps() {
  return {
    props: {},
  };
}
