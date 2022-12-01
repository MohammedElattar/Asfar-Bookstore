import DataTable from "react-data-table-component";
import Container from "../../components/Admin/Layout/Sidebar/Container/Container";
import Sidebar from "../../components/Admin/Layout/Sidebar/Sidebar";
import Loading from "../../components/Loading/Loading";
import useAdminFetch from "../../hooks/useAdminFetch";
import s from "../../styles/pages/admin/users.module.scss";

const columns = [
  {
    name: "الرقم التعريفي",
    selector: (row) => row.id,
  },
  {
    name: "الاسم",
    selector: (row) => row.name,
  },
  {
    name: "الايميل",
    selector: (row) => row.email,
  },
];
const customStyles = {
  cells: {
    style: {
      fontSize: "16px",
      paddingTop: "15px",
      paddingBottom: "15px",
    },
  },
  headCells: {
    style: {
      fontSize: "18px",
      fontWeight: "bold",
    },
  },
};

function Users() {
  const { loading, data } = useAdminFetch("/api/users");

  return (
    <Container>
      <Sidebar />
      <div className={s.wrapper}>
        {loading ? (
          <Loading />
        ) : (
          <DataTable
            columns={columns}
            data={data.users}
            pagination
            customStyles={customStyles}
          />
        )}
      </div>
    </Container>
  );
}
export default Users;

export async function getServerSideProps(ctx) {
  return {
    props: {
      admin: true,
      revalidate: 5,
    },
  };
}
