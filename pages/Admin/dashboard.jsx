import Box from "../../components/Admin/Dashboard/Box/Box";
import s from "../../styles/pages/Admin/dashboard.module.scss";
import { FaUser } from "react-icons/fa";
import { SiBookstack } from "react-icons/si";
import { BiCategory } from "react-icons/bi";
import { BsFillPenFill } from "react-icons/bs";
import Head from "next/head";
import cookie from "cookie";
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
  const {
    cookies: { userToken },
  } = ctx.req;
  const props = { admin: true };

  if (!userToken) {
    return {
      redirect: {
        destination: "/admin/login",
        permanent: false,
      },
    };
  }

  const res = await fetch(
    `${process.env.URL}/api/check-login?secretKey=${process.env.SECRET_KEY}&token=${userToken}`
  );
  const { isAdmin } = await res.json();
  if (isAdmin) {
    const res = await fetch(`${process.env.URL}/api/dashboard`);
    const { info } = await res.json();
    props.info = info;
  } else {
    return {
      redirect: {
        destination: "/admin/login",
        permanent: false,
      },
    };
  }
  return {
    props: props,
  };
}
