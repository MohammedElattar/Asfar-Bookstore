import Head from "next/head";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useAdminContext } from "../../AdminContext";
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
  const {
    data: { users },
  } = useAdminContext();
  return (
    <>
      <Head>
        <title>المستخدمين</title>
      </Head>

      <div className={s.wrapper}>
        <DataTable
          columns={columns}
          data={users}
          pagination
          customStyles={customStyles}
        />
      </div>
    </>
  );
}
export default Users;

export async function getStaticProps(ctx) {
  const props = { admin: true, title: "المستخدمين", url: "/api/users" };

  return {
    props: props,
  };
}
