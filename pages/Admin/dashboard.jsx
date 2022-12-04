import Box from "../../components/Admin/Box/Box";
import s from "../../styles/pages/Admin/dashboard.module.scss";
import { FaUser } from "react-icons/fa";
import { SiBookstack } from "react-icons/si";
import { BiCategory } from "react-icons/bi";
import { BsFillPenFill } from "react-icons/bs";
import { useAdminContext } from "../../context/AdminContext";

export default function Dashboard() {
  const {
    data: { info },
  } = useAdminContext();

  return (
    <>
      <div className={s.wrapper}>
        <Box icon={<FaUser />} title="المستخدمين" value={info?.users} />
        <Box icon={<SiBookstack />} title="المنتجات" value={info?.products} />
        <Box icon={<BiCategory />} title="الاقسام" value={info?.categories} />
        <Box icon={<BsFillPenFill />} title="الكتاب" value={info?.writters} />
      </div>
    </>
  );
}

export async function getStaticProps() {
  const props = {
    admin: true,
    url: process.env.ADMIN_DASHBOARD,
    title: "لوحة التحكم",
  };

  return {
    props: props,
  };
}
