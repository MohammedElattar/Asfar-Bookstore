import DataTable from "react-data-table-component";
import { useAdminContext } from "../../context/AdminContext";
import global from "../../styles/pages/admin/global.module.scss";
import { tableCustomStyles } from "../../utils/utils";

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

function Users() {
  const {
    data: { users },
  } = useAdminContext();
  return (
    <>
      <div className={global.wrapper}>
        <DataTable
          columns={columns}
          data={users}
          pagination
          customStyles={tableCustomStyles}
        />
      </div>
    </>
  );
}
export default Users;

export async function getStaticProps() {
  const props = {
    admin: true,
    title: "المستخدمين",
    url: process.env.ADMIN_USERS,
  };

  return {
    props: props,
  };
}
