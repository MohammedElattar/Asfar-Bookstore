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
  // console.log(ctx.req.cookies);

  const config = {
    method: "POST",
    url: "http://localhost:8000/api/dashboard",
    headers: {
      Accept: "application/vnd.api+json",
      "Content-Type": "application/vnd.api+json",
      // Cookie:ctx.headers.cookie
    },
    withCredentials: true,
  };

  axios(config)
    .then((r) => console.log(`zeyad`))
    .catch((err) => console.log(err));

  // console.log(res);

  if (false) {
    return {
      redirect: {
        destination: "/admin/login",
        permanent: false,
      },
    };
  }

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
