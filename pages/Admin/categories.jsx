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
    selector: (row) => {
      const toggle = async () => {
        const { id } = row;
        console.log(`toggling... =>`, id);
      };
      return row.status === "1" ? (
        <div className={[s.statusActive, s.status].join(" ")} onClick={toggle}>
          مفعل
        </div>
      ) : (
        <div
          className={[s.statusDisabled, s.status].join(" ")}
          onClick={toggle}
        >
          غير مفعل
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

  console.log(`categories => `, categories);

  const deleteCategory = async (category) => {
    const confirmed = window.confirm(`سيتم حذف القسم ${category.name} نهائيا!`);
    if (confirmed) {
      try {
        const res = await apiHttp.delete(`/v1/categories/${category.id}`);
        console.log(`Delete Response =>`, res);
        const { type } = res.data;
        if (type === "success") {
          setData((prevData) => ({
            ...prevData,
            data: prevData.data.filter((e) => e.id !== category.id),
          }));
        }
      } catch (err) {
        console.log(`Delete Error =>`, err);
      }
    }
  };

  return (
    <>
      <div className={global.wrapper}>
        <div className={global.btnContainer}>
          <AwesomeButton type="secondary">اضافة قسم</AwesomeButton>
        </div>
        <DataTable
          columns={columns}
          data={categories?.map((e) => ({
            ...e,
            setCurrentCategory,
            deleteCategory,
          }))}
          pagination
          customStyles={tableCustomStyles}
        />
      </div>

      <div
        className={["overlay", currentCategory ? "active" : undefined].join(
          " "
        )}
        onClick={() => setCurrentCategory(null)}
      ></div>

      <EditMenu {...{ currentCategory, setCurrentCategory }} />
    </>
  );
}

function EditMenu({ currentCategory, setCurrentCategory }) {
  const [nameProps, setNameError, setNameProps] = useInput();
  const [resultMsg, setResultMsg] = useState("تم التعديل");
  const { setData } = useAdminContext();

  useEffect(() => {
    setNameProps((prev) => ({ ...prev, value: currentCategory?.name || "" }));
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

      if (res.data.type === "success") {
        setData((prevData) => ({
          ...prevData,
          data: prevData.data.map((category) => {
            if (category.id === currentCategory.id) {
              return res.data.data[0];
            }
            return category;
          }),
        }));
      }

      setResultMsg("تم التعديل");
      next(`hello`);
    } catch (err) {
      console.log(`Error =>`, err);
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
