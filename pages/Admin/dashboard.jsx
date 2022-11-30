import Box from "../../components/Admin/Dashboard/Box/Box";
import Sidebar from "../../components/Admin/Layout/Sidebar/Sidebar";
import s from "../../styles/pages/Admin/dashboard.module.scss";
import { FaUser } from "react-icons/fa";
import { SiBookstack } from "react-icons/si";
import { BiCategory } from "react-icons/bi";
import { BsFillPenFill } from "react-icons/bs";
import Container from "../../components/Admin/Layout/Sidebar/Container/Container";
export default function Dashboard() {
  return (
    <Container>
      <Sidebar />
      <div className={s.wrapper}>
        <Box icon={<FaUser />} title="المستخدمين" value={51} />
        <Box icon={<SiBookstack />} title="المنتجات" value={753} />
        <Box icon={<BiCategory />} title="الاقسام" value={56} />
        <Box icon={<BsFillPenFill />} title="الكتاب" value={231} />
      </div>
    </Container>
  );
}

export async function getStaticProps() {
  return {
    props: {
      admin: true,
    },
  };
}
