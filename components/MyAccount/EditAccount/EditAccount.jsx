import { useState } from "react";
import useInput from "../../../hooks/useInput";
import FormLoadingButton from "../../FormLoadingButton/FormLoadingButton";
import InputControl from "../../InputControl/InputControl";
import s from "./EditAccount.module.scss";

function EditAccount() {
  const [firstNameProps, setFirstNameError] = useInput();
  const [lastNameProps, setLastNameError] = useInput();
  const [displayNameProps, setDisplayNameError] = useInput();
  const [emailProps, setEmailError] = useInput();
  const [currentPasswordProps, setCurrentPasswordError] = useInput();
  const [newPasswordProps, setNewPasswordError] = useInput();
  const [confirmPasswordProps, setConfirmPasswordError] = useInput();
  const [loading, setLoading] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading((e) => !e);
  };

  return (
    <form className={s.container} onSubmit={handleSubmit}>
      <div className="d-flex gap-4 flex-column flex-md-row">
        <InputControl
          required
          label="الاسم الأول"
          props={firstNameProps}
          style={{ flexGrow: "1" }}
        />
        <InputControl
          required
          label="الاسم الأخير"
          props={lastNameProps}
          style={{ flexGrow: "1" }}
        />
      </div>
      <InputControl required label="اسم العرض" props={displayNameProps} />
      <InputControl required label="البريد الإلكتروني" props={emailProps} />
      <h4 className={s.changePasswordTitle}>تغيير كلمة المرور</h4>
      <InputControl
        label="كلمة المرور الحالية (اترك الحقل فارغاً إذا كنت لا تودّ تغييرها)"
        props={currentPasswordProps}
      />
      <InputControl
        label="كلمة المرور الجديدة (اترك الحقل فارغاً إذا كنت لا تودّ تغييرها)"
        props={newPasswordProps}
      />
      <InputControl
        label="تأكيد كلمة المرور الجديدة"
        props={confirmPasswordProps}
      />
      <FormLoadingButton
        text="حفظ التغييرات"
        className={s.submitBtn}
        loading={loading}
      />
    </form>
  );
}

export default EditAccount;
