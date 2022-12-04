import DataTable from "react-data-table-component";
import { useAdminContext } from "../../context/AdminContext";
import global from "../../styles/pages/admin/global.module.scss";
import s from "../../styles/pages/admin/categories.module.scss";
import { tableCustomStyles } from "../../utils/utils";
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
      return row.active ? (
        <div className={[s.statusActive, s.status].join(" ")}>مفعل</div>
      ) : (
        <div className={[s.statusDisabled, s.status].join(" ")}>غير مفعل</div>
      );
    },
  },
  {
    name: "تعديل",
    selector: (category) => {
      const deleteCategory = async () => {
        const confirmed = window.confirm(`سيتم حذف القسم نهائيا!`);
      };

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
            onPress={deleteCategory}
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
    data: { categories },
  } = useAdminContext();

  const [editMenuActive, setEditMenuActive] = useState(false);

  const [currentCategory, setCurrentCategory] = useState(null);

  return (
    <>
      <div className={global.wrapper}>
        <div className={global.btnContainer}>
          <AwesomeButton type="secondary">اضافة قسم</AwesomeButton>
        </div>
        <DataTable
          columns={columns}
          data={categories.map((e) => ({ ...e, setCurrentCategory }))}
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
  useEffect(() => {
    setNameProps((prev) => ({ ...prev, value: currentCategory?.name || "" }));
  }, [currentCategory, setNameProps]);

  const handlePress = (evt, next) => {
    if (!nameProps.value.trim()) {
      setNameError(true, "!يرجي ادخال اسم صالح");
      setResultMsg("!خطأ");
      next();
      return;
    }

    setTimeout(() => {
      setResultMsg("تم التعديل");
      next(`hello`);
    }, 1000);
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
