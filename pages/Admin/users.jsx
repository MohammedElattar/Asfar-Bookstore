import Head from "next/head";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
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

function Users({ users }) {
  const [render, setRender] = useState(false);
  useEffect(() => {
    setRender(true);
  }, []);
  return (
    <>
      <Head>
        <title>المستخدمين</title>
      </Head>

      <div className={s.wrapper}>
        {render && (
          <DataTable
            columns={columns}
            data={users}
            pagination
            customStyles={customStyles}
          />
        )}
      </div>
    </>
  );
}
export default Users;

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
    const res = await fetch(`${process.env.URL}/api/users`);
    const { users } = await res.json();
    props.users = users;
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
