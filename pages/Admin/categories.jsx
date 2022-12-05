import DataTable from "react-data-table-component";
import { useAdminContext } from "../../context/AdminContext";
import global from "../../styles/pages/admin/global.module.scss";
import s from "../../styles/pages/admin/categories.module.scss";
import { apiHttp, tableCustomStyles } from "../../utils/utils";
import { AwesomeButton, AwesomeButtonProgress } from "react-awesome-button";
import { useState } from "react";
import Menu from "../../components/Admin/Menu";
import InputControl from "../../components/InputControl/InputControl";
import useInput from "../../hooks/useInput";
import { useEffect } from "react";

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
    name: "الحالة",
    selector: (category) => {
      return (
        <div
          className={[
            category.status === "1" ? s.statusActive : s.statusDisabled,
            s.status,
          ].join(" ")}
          onClick={() => category.toggleCategory(category)}
        >
          {category.status === "1" ? "مفعل" : "غير مفعل"}
        </div>
      );
    },
  },
  {
    name: "تاريخ الانشاء",
    selector: (row) => row.created_at,
  },
  {
    name: "تعديل",
    selector: (category) => {
      return (
        <div className="d-flex gap-2">
          <AwesomeButton
            type="secondary"
            size="small"
            onPress={() => category.setCurrentCategory(category)}
          >
            تعديل
          </AwesomeButton>
          <AwesomeButton
            type="secondary"
            size="small"
            className={s.deleteButton}
            onPress={() => category.deleteCategory(category)}
          >
            حذف
          </AwesomeButton>
        </div>
      );
    },
  },
];

export default function Categories() {
  const {
    data: { data: categories },
    setData,
  } = useAdminContext();

  const [currentCategory, setCurrentCategory] = useState(null);
  const [addCategory, setAddCategory] = useState(false);

  const deleteCategory = async (category) => {
    const confirmed = window.confirm(`سيتم حذف القسم ${category.name} نهائيا!`);
    if (confirmed) {
      try {
        const res = await apiHttp.delete(`/v1/categories/${category.id}`);
        console.log(`Delete Response =>`, res);

        setData((prevData) => ({
          ...prevData,
          data: prevData.data.filter((e) => e.id !== category.id),
        }));
      } catch (err) {
        console.log(`Delete Error =>`, err);
      }
    }
  };

  const toggleCategory = async (category) => {
    const updateCategory = (id) => {
      setData((prevData) => {
        const clone = { ...prevData };
        const category = prevData.data.find((e) => e.id === id);
        if (category.status === "1") category.status = "0";
        else if (category.status === "0") category.status = "1";
        return clone;
      });
    };

    try {
      updateCategory(category.id);
      const res = await apiHttp.put(`/v1/categories/${category.id}`, {
        name: category.name,
        status: category.status === "1" ? "0" : "1",
      });
      console.log(`Toggle Response =>`, res);
    } catch (err) {
      console.log(`Toggle Error =>`, err);
      updateCategory(category.id);
    }
  };

  return (
    <>
      <div className={global.wrapper}>
        <div className={global.btnContainer}>
          <AwesomeButton type="secondary" onPress={() => setAddCategory(true)}>
            اضافة قسم
          </AwesomeButton>
        </div>
        <DataTable
          columns={columns}
          data={categories?.map((e) => ({
            ...e,
            setCurrentCategory,
            deleteCategory,
            toggleCategory,
          }))}
          pagination
          customStyles={tableCustomStyles}
        />
      </div>

      <div
        className={[
          "overlay",
          currentCategory || addCategory ? "active" : "",
        ].join(" ")}
        onClick={() => {
          setCurrentCategory(null);
          setAddCategory(false);
        }}
      ></div>

      <EditMenu {...{ currentCategory, setCurrentCategory }} />
      <AddCategoryMenu {...{ addCategory, setAddCategory }} />
    </>
  );
}

function EditMenu({ currentCategory, setCurrentCategory }) {
  const [nameProps, setNameError, setNameProps] = useInput();
  const [resultMsg, setResultMsg] = useState("تم التعديل");
  const { setData } = useAdminContext();

  useEffect(() => {
    setNameProps((prev) => ({
      ...prev,
      value: currentCategory?.name || "",
      error: false,
      helperText: "",
    }));
  }, [currentCategory, setNameProps]);

  const handlePress = async (evt, next) => {
    if (!nameProps.value.trim()) {
      setNameError(true, "!يرجي ادخال اسم صالح");
      setResultMsg("!خطأ");
      next();
      return;
    } else if (nameProps.value === currentCategory.name) {
      setNameError(true, "يرجي ادخال اسم مختلف!");
      setResultMsg("!خطأ");
      next();
      return;
    }

    try {
      console.log(`Name =>`, nameProps.value);
      const res = await apiHttp.put(`/v1/categories/${currentCategory.id}`, {
        name: nameProps.value,
        status: currentCategory.status,
      });

      console.log(`Response =>`, res);

      setData((prevData) => ({
        ...prevData,
        data: prevData.data.map((category) => {
          if (category.id === currentCategory.id) {
            return res.data.data[0];
          }
          return category;
        }),
      }));

      setResultMsg("تم التعديل");
      next();
    } catch (err) {
      console.log(`Error =>`, err);
      const [reason] = err?.response?.data?.data?.errors?.name;
      if (reason === "Name is already in use") {
        setNameError(true, "الاسم مستخدم بالفعل!");
      } else if (
        reason === "Name must have arabic or english characters only"
      ) {
        setNameError(
          true,
          "الاسم يجب ان يحتوي علي حروف عربية او انجليزية فقط."
        );
      }
      setResultMsg("!خطأ");
      next();
    }
  };

  return (
    <Menu
      title="تعديل قسم"
      className={currentCategory ? "active" : ""}
      onClose={() => setCurrentCategory(null)}
    >
      <InputControl props={nameProps} label="اسم القسم" />
      <AwesomeButtonProgress
        type="primary"
        style={{ marginTop: "40px" }}
        onPress={handlePress}
        loadingLabel="جار التحميل..."
        resultLabel={resultMsg}
      >
        تعديل القسم
      </AwesomeButtonProgress>
    </Menu>
  );
}

function AddCategoryMenu({ addCategory, setAddCategory }) {
  const [nameProps, setNameError, setNameProps] = useInput();
  const [resultMsg, setResultMsg] = useState("تم الاضافة");
  const { setData } = useAdminContext();

  useEffect(() => {
    setNameProps((prev) => ({
      ...prev,
      value: "",
      error: false,
      helperText: "",
    }));
  }, [addCategory, setNameProps]);

  const handlePress = async (evt, next) => {
    if (!nameProps.value.trim()) {
      setNameError(true, "!يرجي ادخال اسم صالح");
      setResultMsg("!خطأ");
      next();
      return;
    }

    try {
      const res = await apiHttp.post("/v1/categories", {
        name: nameProps.value,
        status: "1",
      });
      console.log(`Create Success =>`, res);

      if (res.data.original.type === "success" && res.data.original.data) {
        setData((prev) => {
          const clone = { ...prev };
          clone.data.push(res.data.original.data);
          return clone;
        });
      }

      setResultMsg("تم الاضافة");
      next();
    } catch (err) {
      const [reason] = err?.response?.data?.data?.errors?.name;
      if (reason === "Name is already in use") {
        setNameError(true, "الاسم مستخدم بالفعل!");
      } else if (
        reason === "Name must have arabic or english characters only"
      ) {
        setNameError(
          true,
          "الاسم يجب ان يحتوي علي حروف عربية او انجليزية فقط."
        );
      }
      console.log(`Create Error =>`, err);
      setResultMsg("!خطأ");
      next();
    }
  };

  return (
    <Menu
      title="اضافة قسم"
      className={addCategory ? "active" : ""}
      onClose={() => setAddCategory(false)}
    >
      <InputControl props={nameProps} label="اسم القسم" />
      <AwesomeButtonProgress
        type="primary"
        style={{ marginTop: "40px" }}
        onPress={handlePress}
        loadingLabel="جار التحميل..."
        resultLabel={resultMsg}
      >
        اضافة القسم
      </AwesomeButtonProgress>
    </Menu>
  );
}

export async function getStaticProps() {
  const props = {
    admin: true,
    url: process.env.ADMIN_CATEGORIES,
    title: "الاقسام",
  };
  return {
    props,
  };
}
