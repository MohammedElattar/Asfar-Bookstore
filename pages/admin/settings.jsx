import { useState } from "react";
import { AwesomeButton, AwesomeButtonProgress } from "react-awesome-button";
import InputControl from "../../components/InputControl/InputControl";
import { useAdminContext } from "../../context/AdminContext";
import useInput from "../../hooks/useInput";
import global from "../../styles/pages/admin/global.module.scss";
import { isValid } from "email-regexp";
import { apiHttp } from "../../utils/utils";
import ImagePreview from "../../components/Admin/ImagePreview";
export default function Settings() {
  const {
    data: {
      data: { email, logo, phone, title },
    },
    setData,
  } = useAdminContext();
  const [titleProps, setTitleError, setTitleProps] = useInput(title);
  const [emailProps, setEmailError, setEmailProps] = useInput(email);
  const [phoneProps, setPhoneError, setPhoneProps] = useInput(phone);
  const [resultMsg, setResultMsg] = useState("");
  const [image, setImage] = useState(null);

  const validateInputs = () => {
    let valid = true;
    if (!isValid(emailProps.value)) {
      setEmailError(true, "البريد الالكتروني غير صالح!");
      valid = false;
    }
    if (!/^(\d{11}|(([+]{0,1})?(20)\d{10}))$/.test(phoneProps.value)) {
      setPhoneError(true, "الرقم غير صالح!");
      valid = false;
    }
    if (!titleProps.value.trim()) {
      setTitleError(true, "الاسم غير صالح!");
    }
    return valid;
  };
  const handleSubmit = async (e, next) => {
    if (!validateInputs()) {
      setResultMsg("خطأ!");
      next();
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", titleProps.value);
      formData.append("email", emailProps.value);
      formData.append("phone", phoneProps.value);
      if (image) {
        formData.append("logo", image);
      }
      const res = await apiHttp.post(`/v1/settings`, formData);
      console.log(`Settings Response =>`, res);
      setResultMsg("تم التعديل");
      next();
    } catch (err) {
      console.log(`Settings Error =>`, err);
      setResultMsg("خطأ!");
      next();
    }
  };

  return (
    <>
      <div className={global.wrapper}>
        <div
          className="ms-auto p-3 d-flex flex-column gap-3"
          style={{ width: "400px" }}
        >
          <InputControl label={"اسم الموقع"} props={titleProps} />
          <InputControl
            label={"البريد الاكتروني"}
            props={emailProps}
            inputStyle={{ direction: "ltr", textAlign: "right" }}
          />
          <InputControl
            label={"رقم الهاتف"}
            props={phoneProps}
            inputStyle={{ direction: "ltr", textAlign: "right" }}
          />
          <div className="d-flex gap-3 justify-content-between">
            <label
              type="button"
              className="bg-transparent fs-6"
              style={{
                paddingBottom: "2px",
                borderBottom: "1px dotted #000",
                cursor: "pointer",
                height: "fit-content",
              }}
              htmlFor="logo"
            >
              اختيار لوجو
            </label>
            <input
              type="file"
              hidden
              onChange={(e) => setImage(e.target.files[0])}
              id="logo"
            />
            {image ? (
              <ImagePreview
                alt={"preview"}
                file={image}
                style={{
                  maxWidth: "150px",
                  maxHeight: "100px",
                  objectFit: "cover",
                }}
              />
            ) : logo ? (
              <ImagePreview
                alt={"preview"}
                url={logo}
                style={{
                  maxWidth: "150px",
                  maxHeight: "100px",
                  objectFit: "cover",
                }}
              />
            ) : null}
          </div>
          <AwesomeButtonProgress
            onPress={handleSubmit}
            type="secondary"
            loadingLabel="جار الحفظ..."
            resultLabel={resultMsg}
            style={{ width: "fit-content" }}
          >
            حفظ التغييرات
          </AwesomeButtonProgress>
        </div>
      </div>
    </>
  );
}

export async function getStaticProps() {
  const props = {
    admin: true,
    title: "الاعدادات",
    url: process.env.ADMIN_SETTINGS,
  };

  return {
    props: props,
  };
}
