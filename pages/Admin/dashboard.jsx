import Box from "../../components/Admin/Dashboard/Box/Box";
import s from "../../styles/pages/Admin/dashboard.module.scss";
import { FaUser } from "react-icons/fa";
import { SiBookstack } from "react-icons/si";
import { BiCategory } from "react-icons/bi";
import { BsFillPenFill } from "react-icons/bs";
import Head from "next/head";
import cookie from "cookie";
import axios from "axios";

export default function Dashboard({ info }) {
  return (
    <>
      <Head>
        <title>لوحة التحكم</title>
      </Head>

      <div className={s.wrapper}>
        <Box icon={<FaUser />} title="المستخدمين" value={info?.users} />
        <Box icon={<SiBookstack />} title="المنتجات" value={info?.products} />
        <Box icon={<BiCategory />} title="الاقسام" value={info?.categories} />
        <Box icon={<BsFillPenFill />} title="الكتاب" value={info?.writters} />
      </div>
    </>
  );
}
export async function getServerSideProps(ctx) {
  const props = { admin: true };
  const {
    laravel_session,
    remember_web_59ba36addc2b2f9401580f014c7f58ea4e30989d,
  } = ctx.req.cookies;
  const xsrf = ctx.req.cookies["XSRF-TOKEN"];
  console.log(xsrf);

  // console.log(ctx.req.cookies);

  const config = {
    method: "POST",
    url: "http://localhost:8000/api/dashboard",
    headers: {
      Accept: "application/vnd.api+json",
      "Content-Type": "application/vnd.api+json",
      "X-Requested-With": "XMLHttpRequest",
      // "XSRF-TOKEN": xsrf,
      "Set-Cookie": `laravel_session=${laravel_session}`,
      "X-XSRF-TOKEN":
        "eyJpdiI6Im5icUVXMmt2N2JkWkJYc0ZMbzlFSEE9PSIsInZhbHVlIjoiNDZJWVNNUWxqMzJFOWdEcGxzTGUwUnR1S3pXT2FaQ3hjaEZoOXpka2RHYnhTWGd5SWsrbUFPQXRQUVZWTHZLWmdoN3MvTXRYTDdTY3g1WDRuQzdhSXJXZDVuNXd5czdxQ3BkWDZRM3lOTXM3R1k0cFdiN3BnT2RUQ2gzLzIwd1QiLCJtYWMiOiI5OGQwZjRhYTQwNTgxNzQ3YmExZThlOTc3MzdmNTY1MGU4YmJhNWE2YTMyMjcyMjUwYzk1Njk2NGFjMTZlYzkwIiwidGFnIjoiIn0%3D",
    },
    withCredentials: true,
  };

  axios(config)
    .then((r) => console.log(`zeyad`))
    .catch((err) => console.log(err));

  // console.log(res);

  // if (!userToken) {
  //   return {
  //     redirect: {
  //       destination: "/admin/login",
  //       permanent: false,
  //     },
  //   };
  // }

  // const res = await fetch(
  //   `${process.env.URL}/api/check-login?secretKey=${process.env.SECRET_KEY}&token=${userToken}`
  // );
  // const { isAdmin } = await res.json();
  // if (isAdmin) {
  //   const res = await fetch(`${process.env.URL}/api/dashboard`);
  //   const { info } = await res.json();
  //   props.info = info;
  // } else {
  //   return {
  //     redirect: {
  //       destination: "/admin/login",
  //       permanent: false,
  //     },
  //   };
  // }
  return {
    props: props,
  };
}
