import { useState } from "react";
import useInput from "../../../hooks/useInput";
import FormLoadingButton from "../../FormLoadingButton/FormLoadingButton";
import InputControl from "../../InputControl/InputControl";
import s from "./EditAddress.module.scss";

const countries = [
  "الجزائر",
  "النمسا",
  "البحرين",
  "بلجيكا",
  "البرازيل",
  "كندا",
  "جمهورية التشيك",
  "الدنمارك",
  "مصر",
  "فنلندا",
  "فرنسا",
  "ألمانيا",
  "اليونان",
  "آيسلندا",
  "الهند",
  "إندونيسيا",
  "العراق",
  "أيرلندا",
  "إيطاليا",
  "اليابان",
  "الأردن",
  "كينيا",
  "الكويت",
  "لبنان",
  "ماليزيا",
  "المغرب",
  "هولندا",
  "نيجيريا",
  "مقدونيا",
  "النرويج",
  "عمان",
  "بولندا",
  "قطر",
  "رومانيا",
  "روسيا",
  "المملكة العربية السعودية",
  "جنوب أفريقيا",
  "إسبانيا",
  "السويد",
  "سويسرا",
  "تونس",
  "تركيا",
  "أوكرانيا",
  "الإمارات العربية المتحدة",
  "المملكة المتحدة",
  "الولايات المتحدة الأمريكية",
];

function EditAddress() {
  const [firstNameProps, setFirstNameError] = useInput();
  const [lastNameProps, setLastNameError] = useInput();
  const [displayNameProps, setDisplayNameError] = useInput();
  const [emailProps, setEmailError] = useInput();
  const [country, setCountryError] = useInput("مصر");
  const [newPasswordProps, setNewPasswordError] = useInput();
  const [confirmPasswordProps, setConfirmPasswordError] = useInput();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <p className={s.subtitle}>
        العناوين التالية سيتم استخدامها في صفحة إتمام الطلب بشكل افتراضي.
      </p>
      <h3 className={s.title}>عنوان الفاتورة</h3>
      {!isEditing ? (
        <div className={s.wrapper}>
          <button
            type="button"
            className={s.addAddress}
            onClick={() => setIsEditing(true)}
          >
            إضافة
          </button>
          <p className={s.noAddress}>لم تقم بإعداد هذا العنوان بعد.</p>
        </div>
      ) : (
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
          <InputControl
            required
            label="العنوان التفصيلي"
            props={displayNameProps}
            placeholder="رقم المنزل واسم الشارع"
          />
          <InputControl
            props={emailProps}
            placeholder="رقم الشقة/الوحدة/علامة بارزة (اختياري لكن مهم)"
          />
          <InputControl required label="المدينة" props={displayNameProps} />
          <InputControl
            select
            options={countries}
            required
            label="الدولة"
            props={country}
          />
          <InputControl
            label="الكود البريدي - Postal/ZIP Code (اختياري)"
            props={displayNameProps}
          />
          <InputControl required label="الإيميل" props={displayNameProps} />
          <InputControl
            required
            label="الهاتف/الجوال"
            props={displayNameProps}
          />
          <InputControl
            placeholder="رقم احتياطي (مهم) لتيسير التواصل"
            label="هاتف بديل (اختياري)"
            props={displayNameProps}
          />
          <FormLoadingButton
            text="حفظ التغييرات"
            className={s.submitBtn}
            loading={loading}
          />
        </form>
      )}
    </>
  );
}

export default EditAddress;
