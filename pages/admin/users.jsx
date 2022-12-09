import { AwesomeButton, AwesomeButtonProgress } from "react-awesome-button";
import DataTable from "react-data-table-component";
import { isValid } from "email-regexp";
import global from "../../styles/pages/admin/global.module.scss";
import s from "../../styles/pages/admin/users.module.scss";
import { useAdminContext } from "../../context/AdminContext";
import { apiHttp, tableCustomStyles } from "../../utils/utils";
import { useState } from "react";
import Menu from "../../components/Admin/Menu";
import InputControl from "../../components/InputControl/InputControl";
import useInput from "../../hooks/useInput";
import { useEffect } from "react";
import Loading from "../../components/Loading";
import { useRouter } from "next/router";
import { useRef } from "react";

const isTrue = (e) => {
  return e === "true" || e === true;
};
const isFalse = (e) => {
  return e === "false" || e === false;
};

const columns = [
  {
    name: "الرقم التعريفي",
    selector: (user) => user.id,
  },
  {
    name: "الاسم",
    selector: (user) => user.name,
    wrap: true,
  },
  {
    name: "البريد الالكتروني",
    selector: (user) => user.email,
    wrap: true,
  },
  {
    name: "النوع",
    selector: (user) => (
      <span className={user.admin ? s.admin : ""}>
        {user.admin ? "ادمن" : "مستخدم"}
      </span>
    ),
    wrap: true,
  },
  {
    name: "الحالة",
    selector: (user) => (
      <span
        className={[
          global.status,
          isTrue(user.active) ? global.statusActive : global.statusDisabled,
        ]
          .join(" ")
          .trim()}
        onClick={() => user.toggleUser(user)}
      >
        {isTrue(user.active) ? "مفعل" : "غير مفعل"}
      </span>
    ),
    wrap: true,
  },
  {
    name: "الادوات",
    selector: (user) => {
      return (
        <div className="d-flex gap-2 flex-wrap">
          <AwesomeButton
            type="secondary"
            size="small"
            onPress={() => user.setCurrentUser(user)}
          >
            تعديل
          </AwesomeButton>
          <AwesomeButton
            type="secondary"
            size="small"
            className={global.deleteButton}
            onPress={() => user.deleteUser(user)}
          >
            حذف
          </AwesomeButton>
        </div>
      );
    },
  },
];

export default function Users() {
  const {
    loading,
    addUserIsActive,
    setAddUserIsActive,
    currentUser,
    setCurrentUser,
    deleteUser,
    users,
    totalRows,
    handlePerRowsChange,
    fetchUsers,
    searchProps,
    handleSearchKeyUp,
    deleteAll,
    toggleUser,
  } = useUsersPage();

  return (
    <>
      <div className={global.wrapper}>
        <div className={global.btnContainer}>
          <AwesomeButton
            type="secondary"
            onPress={() => setAddUserIsActive(true)}
          >
            اضافة مستخدم
          </AwesomeButton>
          <AwesomeButton
            type="secondary"
            onPress={deleteAll}
            className={global.deleteButton}
          >
            حذف كل المستخدمين
          </AwesomeButton>
        </div>

        <form
          className={global.searchWrapper}
          onSubmit={(e) => e.preventDefault()}
        >
          <InputControl
            props={searchProps}
            label="بحث"
            onKeyUp={handleSearchKeyUp}
          />
        </form>

        <DataTable
          columns={columns}
          data={users?.map((user) => ({
            ...user,
            setCurrentUser,
            deleteUser,
            toggleUser,
          }))}
          pagination
          customStyles={tableCustomStyles}
          progressPending={loading}
          progressComponent={
            <div>
              <Loading size={60} borderWidth="5px" />
            </div>
          }
          paginationServer
          paginationTotalRows={totalRows}
          onChangeRowsPerPage={handlePerRowsChange}
          onChangePage={fetchUsers}
          noDataComponent={<h3>لا يوجد بيانات لعرضها</h3>}
        />
      </div>

      <div
        className={[
          "overlay",
          addUserIsActive || currentUser ? "active" : "",
        ].join(" ")}
        onClick={() => {
          setAddUserIsActive(false);
          setCurrentUser(null);
        }}
      ></div>
      <AddUserMenu {...{ addUserIsActive, setAddUserIsActive }} />
      <EditUserMenu {...{ currentUser, setCurrentUser }} />
    </>
  );
}

function AddUserMenu({ addUserIsActive, setAddUserIsActive }) {
  const [nameProps, setNameError, setNameProps] = useInput("");
  const [emailProps, setEmailError, setEmailProps] = useInput("");
  const [passwordProps, setPasswordError, setPasswordProps] = useInput("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [resultMsg, setResultMsg] = useState("");
  const [error, setError] = useState(null);
  const { setData } = useAdminContext();

  const handlePress = async (evt, next) => {
    const nameCheck1 = nameProps.value.trim().length <= 4;
    const nameCheck2 = nameProps.value.trim().length >= 25;
    const emailCheck1 = !isValid(emailProps.value);
    const passwordCheck1 = passwordProps.value.length <= 8;
    const passwordCheck2 = passwordProps.value.length >= 25;
    if (nameCheck1) {
      setNameError(true, "الاسم قصير جدا!");
    } else if (nameCheck2) {
      setNameError(true, "الاسم طويل جدا!");
    }
    if (emailCheck1) {
      setEmailError(true, "البريد الالكتروني غير صالح!");
    }
    if (passwordCheck1) {
      setPasswordError(true, "كلمة السر قصيرة جدا!");
    } else if (passwordCheck2) {
      setPasswordError(true, "كلمة السر طويلة جدا!");
    }
    if (
      nameCheck1 ||
      nameCheck2 ||
      emailCheck1 ||
      passwordCheck1 ||
      passwordCheck2
    ) {
      setResultMsg("خطأ!");
      next();
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", nameProps.value);
      formData.append("email", emailProps.value);
      formData.append("password", passwordProps.value);
      formData.append("admin", isAdmin);
      console.log(`Object To Send =>`, Object.fromEntries(formData.entries()));

      const res = await apiHttp.post("/v1/users", formData);
      console.log(`Create User Response =>`, res);

      const newUser = res.data.data;

      if (res.data.type === "success" && newUser) {
        setData((prevData) => {
          const clone = { ...prevData };
          prevData.data.push(newUser);
          return clone;
        });
      }

      setResultMsg("تم الاضافة");
      setError(null);
      next();
    } catch (err) {
      console.log(`Create Product Error =>`, err.response.data.data);
      setResultMsg("خطأ!");
      setError(`حدث خطأ اثناء القيام بالعملية`);
      next();
    }
  };

  useEffect(() => {
    [setNameProps, setPasswordProps, setEmailProps].forEach((e) =>
      e((prev) => ({ ...prev, error: false, helperText: "", value: "" }))
    );
    setIsAdmin(false);
    // eslint-disable-next-line
  }, [addUserIsActive]);

  return (
    <Menu
      title="اضافة منتج"
      className={[addUserIsActive ? "active" : "", s.menu].join(" ").trim()}
      onClose={() => setAddUserIsActive(false)}
    >
      <div className={s.menuBody}>
        <InputControl label="الاسم" props={nameProps} />
        <InputControl label="البريد الالكتروني" props={emailProps} />
        <InputControl label="كلمة السر" props={passwordProps} />
      </div>
      <div className={global.checkBox} style={{ marginTop: "20px" }}>
        <input
          type="checkbox"
          id="admin"
          checked={isAdmin}
          onChange={(e) => setIsAdmin(e.target.checked)}
        />
        <label htmlFor="admin">ادمن</label>
      </div>

      {!!error && (
        <p
          style={{
            margin: "10px 0",
            color: "#b90000",
            fontSize: "18px",
            fontWeight: "500",
          }}
        >
          {error}
        </p>
      )}

      <AwesomeButtonProgress
        type="primary"
        onPress={handlePress}
        resultLabel={resultMsg}
        loadingLabel="جاري التحميل..."
        style={{ marginTop: "20px" }}
      >
        اضافة المستخدم
      </AwesomeButtonProgress>
    </Menu>
  );
}

function EditUserMenu({ currentUser, setCurrentUser }) {
  const [nameProps, setNameError, setNameProps] = useInput("");
  const [emailProps, setEmailError, setEmailProps] = useInput("");
  const [passwordProps, setPasswordError, setPasswordProps] = useInput("");
  const [isActive, setIsActive] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [resultMsg, setResultMsg] = useState("");
  const [error, setError] = useState(null);
  const { setData } = useAdminContext();

  const handlePress = async (evt, next) => {
    console.log(`clicked`);
    if (!currentUser) {
      setResultMsg("خطأ!");
      next();
      return;
    }
    const nameCheck1 = nameProps.value.trim().length <= 4;
    const nameCheck2 = nameProps.value.trim().length >= 25;
    const emailCheck1 = !isValid(emailProps.value);
    const passwordCheck1 =
      passwordProps.value.length <= 8 && passwordProps.value.length > 0;
    const passwordCheck2 = passwordProps.value.length >= 25;
    if (nameCheck1) {
      setNameError(true, "الاسم قصير جدا!");
    } else if (nameCheck2) {
      setNameError(true, "الاسم طويل جدا!");
    }
    if (emailCheck1) {
      setEmailError(true, "البريد الالكتروني غير صالح!");
    }
    if (passwordCheck1) {
      setPasswordError(true, "كلمة السر قصيرة جدا!");
    } else if (passwordCheck2) {
      setPasswordError(true, "كلمة السر طويلة جدا!");
    }
    if (
      nameCheck1 ||
      nameCheck2 ||
      emailCheck1 ||
      passwordCheck1 ||
      passwordCheck2
    ) {
      setResultMsg("خطأ!");
      next();
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", nameProps.value);
      formData.append("email", emailProps.value);
      formData.append("admin", isAdmin);
      formData.append("active", isActive);
      if (passwordProps.value) {
        formData.append("password", passwordProps.value);
      }
      console.log(`Object To Send =>`, Object.fromEntries(formData.entries()));

      const res = await apiHttp.put(`/v1/user/${currentUser.id}`, formData);
      console.log(`Edit Book Response =>`, res);

      const editedUser = res.data.data;

      if (res.data.type === "success" && editedUser) {
        setData((prevData) => ({
          ...prevData,
          data: prevData.data.map((book) => {
            if (book.id == editedUser.id) {
              return editedUser;
            }
            return book;
          }),
        }));
      }

      setResultMsg("تم التعديل");
      setError(null);
      next();
    } catch (err) {
      console.log(`Edit Product Error =>`, err);
      setResultMsg("خطأ!");
      setError(`حدث خطأ اثناء القيام بالعملية`);
      next();
    }
  };

  useEffect(() => {
    if (!currentUser) return;
    setNameProps((prev) => ({
      ...prev,
      error: false,
      helperText: "",
      value: currentUser.name || "",
    }));
    setEmailProps((prev) => ({
      ...prev,
      error: false,
      helperText: "",
      value: currentUser.email || "",
    }));
    setPasswordProps((prev) => ({
      ...prev,
      error: false,
      helperText: "",
      value: "",
    }));
    setIsActive(currentUser.active);
    setIsAdmin(currentUser.admin);
    // eslint-disable-next-line
  }, [currentUser]);

  return (
    <Menu
      title="تعديل منتج"
      className={[currentUser ? "active" : "", s.menu].join(" ").trim()}
      onClose={() => setCurrentUser(false)}
    >
      <div className={s.menuBody}>
        <InputControl label="الاسم" props={nameProps} />
        <InputControl label="البريد الالكتروني" props={emailProps} />
        <InputControl label="كلمة السر" props={passwordProps} />
      </div>
      <div className={global.checkBox} style={{ marginTop: "20px" }}>
        <input
          type="checkbox"
          id="admin"
          value={isAdmin}
          onChange={(e) => setIsAdmin(e.target.checked)}
        />
        <label htmlFor="admin">ادمن</label>
      </div>
      <div className={global.checkBox}>
        <input
          type="checkbox"
          id="active"
          value={isActive}
          onChange={(e) => setIsActive(e.target.checked)}
        />
        <label htmlFor="active">نشط</label>
      </div>

      {!!error && (
        <p
          style={{
            margin: "10px 0 0",
            color: "#b90000",
            fontSize: "18px",
            fontWeight: "500",
          }}
        >
          {error}
        </p>
      )}

      <AwesomeButtonProgress
        type="primary"
        onPress={handlePress}
        resultLabel={resultMsg}
        loadingLabel="جاري التحميل..."
        style={{ marginTop: "20px" }}
      >
        تعديل المستخدم
      </AwesomeButtonProgress>
    </Menu>
  );
}

function useUsersPage() {
  const {
    data: { data: users, meta },
    setData,
  } = useAdminContext();

  const [loading, setLoading] = useState(false);
  const [perPage, setPerPage] = useState(10);
  const [addUserIsActive, setAddUserIsActive] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [searchProps, setSearchError, setSearchProps] = useInput();
  const [searchData, setSearchData] = useState(null);
  const [searchTotal, setSearchTotal] = useState(0);
  const router = useRouter();
  const waitTime = 500;
  const timer = useRef();
  let total = meta?.total;

  const handlePerRowsChange = async (newRows, page) => {
    setLoading(true);

    try {
      const res = await apiHttp.get(`/v1/users?page=${page}&cnt=${newRows}`);
      console.log(`Rows Per Page Change Response =>`, res);
      setData(res.data);
      setLoading(false);
      setPerPage(newRows);
    } catch (err) {
      console.log(`Fetch Rows Error`, err);
    }
  };

  const fetchUsers = async (page) => {
    setLoading(true);
    try {
      const res = await apiHttp.get(`/v1/users?page=${page}&cnt=${perPage}`);
      console.log(`Page Change Response =>`, res);
      setData(res.data);
      setLoading(false);
    } catch (err) {
      console.log(`Page Change Error`, err);
    }
  };

  const deleteUser = async (user) => {
    const confirmed = window.confirm(`سيتم مسح ${user.name} نهائيا`);
    if (confirmed) {
      try {
        const res = await apiHttp.delete(`/v1/users/${user.id}`);
        console.log(`Delete Response =>`, res);

        if (res.data.type === "success") {
          setData((prev) => {
            const clone = { ...prev };
            clone.data = clone.data.filter((e) => e.id !== user.id);
            return clone;
          });
        }
      } catch (err) {
        console.log(`Delete Error =>`, err);
      }
    }
  };

  const search = async (text) => {
    setLoading(true);
    try {
      const url = `http://localhost:8000/api/search/users/${
        text || searchProps.value
      }?cnt=${perPage}`;
      console.log(`URL =>`, url);
      const res = await apiHttp.get(url);
      console.log(`Search Response =>`, res);
      setSearchData(res.data.data);
      setSearchTotal(res.data.meta.total);
    } catch (err) {
      console.log(`Search Error =>`, err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchKeyUp = (e) => {
    const text = e.currentTarget.value;
    console.log(`Text => ${text}`);

    if (timer.current) {
      clearTimeout(timer.current);
    }

    timer.current = setTimeout(() => {
      if (text !== "") {
        search(text);
      } else {
        setSearchError(false);
        setSearchData(null);
        setSearchTotal(null);
      }
    }, waitTime);
  };

  const deleteAll = async () => {
    if (!window.confirm(`سيتم حذف المستخدمين نهائيا`)) return;
    setLoading(true);
    try {
      const res = await apiHttp.delete("/v1/users/delete_all");
      console.log(`Delete All Response =>`, res);
      if (res.data.type === "success") {
        setData({ data: [] });
      }
    } catch (err) {
      console.log(`Delete All Error =>`, err);
    } finally {
      setLoading(false);
    }
  };

  const toggleUser = async (user) => {
    let active;
    const updateUser = (id) => {
      setData((prevData) => ({
        ...prevData,
        data: prevData.data.map((user) => {
          if (user.id === id) {
            if (isTrue(user.active)) {
              active = "false";
              user.active = "false";
            } else {
              active = "true";
              user.active = "true";
            }
            return user;
          }
          return user;
        }),
      }));
    };

    try {
      updateUser(user.id);
      const res = await apiHttp.patch(`/v1/users/${user.id}`, {
        active,
      });
      console.log(`Toggle Response =>`, res);
    } catch (err) {
      console.log(`Toggle Error =>`, err);
      updateUser(user.id);
    }
  };

  return {
    loading,
    addUserIsActive,
    setAddUserIsActive,
    currentUser,
    setCurrentUser,
    users: searchData || users,
    deleteUser,
    totalRows: searchTotal && searchData ? searchTotal : total,
    handlePerRowsChange,
    fetchUsers,
    searchProps,
    handleSearchKeyUp,
    deleteAll,
    toggleUser,
  };
}

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
