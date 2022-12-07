import Head from "next/head";
import { useState } from "react";
import { AwesomeButton } from "react-awesome-button";
import InputControl from "../../components/InputControl/InputControl";
import useInput from "../../hooks/useInput";
import form from "../../styles/form.module.scss";

export default function ForgotPassword() {
  const [emailProps, setEmailError, setEmailProps] = useInput();
  const [loading, setLoading] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading((e) => !e);
  };
  return (
    <>
      <Head>
        <title>نسيت كلمة السر</title>
      </Head>

      <div className={form.formContainer}>
        <div className="container">
          <div className={form.formWrapper}>
            <form onSubmit={handleSubmit}>
              <InputControl label="البريد الالكتروني" props={emailProps} />
              <p
                style={{
                  color: "#666",
                  fontSize: "14px",
                  marginTop: "-15px",
                  marginBottom: "20px",
                }}
              >
                سيتم ارسال رسالة علي البريد الاكتروني الخاص بك يحتوي علي 6 رموز
                للتاكد من ملكية الحساب.
              </p>
              <AwesomeButton type="secondary" style={{ width: "120px" }}>
                {!loading && "تاكيد"}
              </AwesomeButton>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
