import { useState } from "react";
import { AwesomeButtonProgress } from "react-awesome-button";
import InputControl from "../../components/InputControl/InputControl";
import { useAdminContext } from "../../context/AdminContext";
import useInput from "../../hooks/useInput";
import global from "../../styles/pages/admin/global.module.scss";
import s from "../../styles/pages/admin/settings.module.scss";
import { isValid } from "email-regexp";
import { apiHttp } from "../../utils/utils";
import ImagePreview from "../../components/Admin/ImagePreview";
export default function Settings() {
  const {
    data: {
      data: {
        email,
        logo,
        phone,
        title,
        support,
        facebook,
        whatsapp,
        telegram,
        instagram,
      },
    },
    setData,
  } = useAdminContext();
  const [titleProps, setTitleError, setTitleProps] = useInput(title);
  const [emailProps, setEmailError, setEmailProps] = useInput(email);
  const [phoneProps, setPhoneError, setPhoneProps] = useInput(phone);
  // const [supportProps, setSupportError, setSupportProps] = useInput(support);
  const [facebookProps, setFacebookError, setFacebookProps] =
    useInput(facebook);
  const [whatsappProps, setWhatsappError, setWhatsappProps] =
    useInput(whatsapp);
  const [telegramProps, setTelegramError, setTelegramProps] =
    useInput(telegram);
  const [instagramProps, setInstagramError, setInstagramProps] =
    useInput(instagram);
  const [resultMsg, setResultMsg] = useState("");
  const [image, setImage] = useState(null);

  const validateInputs = () => {
    let valid = true;
    const urlRegExp = /https?:\/\/(www.)?.+\.\w{2,5}\/.+/;
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
      valid = false;
    }
    if (!urlRegExp.test(facebookProps.value)) {
      setFacebookError(true, "رابط غير صالح!");
      valid = false;
    }
    if (!urlRegExp.test(telegramProps.value)) {
      setTelegramError(true, "رابط غير صالح!");
      valid = false;
    }
    if (!urlRegExp.test(instagramProps.value)) {
      setInstagramError(true, "رابط غير صالح!");
      valid = false;
    }
    if (!urlRegExp.test(whatsappProps.value)) {
      setWhatsappError(true, "رابط غير صالح!");
      valid = false;
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
      formData.append("facebook", facebookProps.value);
      formData.append("telegram", telegramProps.value);
      formData.append("instagram", instagramProps.value);
      formData.append("whatsapp", whatsappProps.value);
      if (image) {
        formData.append("logo", image);
      }
      const res = await apiHttp.post(
        process.env.NEXT_PUBLIC_ADMIN_SETTINGS,
        formData
      );
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
        <div className={s.wrapper}>
          <div className={s.divider}>
            <InputControl
              label={"اسم الموقع"}
              props={titleProps}
              className={s.inputControl}
            />
            <InputControl
              label={"البريد الاكتروني"}
              props={emailProps}
              className={[s.english, s.inputControl].join(" ").trim()}
            />
          </div>
          <InputControl
            label={"رقم الهاتف"}
            props={phoneProps}
            className={[s.english, s.inputControl].join(" ").trim()}
          />
          <InputControl
            label={"رابط الفيسبوك"}
            props={facebookProps}
            className={[s.english, s.inputControl, "w-100"].join(" ").trim()}
          />
          <InputControl
            label={"رابط التيلجرام"}
            props={telegramProps}
            className={[s.english, s.inputControl, "w-100"].join(" ").trim()}
          />
          <InputControl
            label={"رابط الانستجرام"}
            props={instagramProps}
            className={[s.english, s.inputControl, "w-100"].join(" ").trim()}
          />
          <InputControl
            label={"رابط الواتساب"}
            props={whatsappProps}
            className={[s.english, s.inputControl, "w-100"].join(" ").trim()}
          />
          <div className="d-flex gap-3 justify-content-between">
            <label type="button" className={s.logoLabel} htmlFor="logo">
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
                className={s.preview}
              />
            ) : logo ? (
              <ImagePreview alt={"preview"} url={logo} className={s.preview} />
            ) : null}
          </div>
          <AwesomeButtonProgress
            onPress={handleSubmit}
            type="secondary"
            loadingLabel="جار الحفظ..."
            resultLabel={resultMsg}
            style={{ width: "150px" }}
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
    url: process.env.NEXT_PUBLIC_ADMIN_SETTINGS,
    checkAdmin: true,
  };

  return {
    props: props,
  };
}
