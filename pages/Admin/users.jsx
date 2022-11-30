import Container from "../../components/Admin/Layout/Sidebar/Container/Container";
import Sidebar from "../../components/Admin/Layout/Sidebar/Sidebar";
import s from "../../styles/pages/admin/users.module.scss";
function products() {
  return (
    <Container>
      <Sidebar />
      <div className={s.wrapper}></div>
    </Container>
  );
}
export default products;

export async function getStaticProps() {
  return {
    props: {
      admin: true,
    },
  };
}
