import Head from "next/head";
import { useState } from "react";

import useInput from "../../hooks/useInput";
import form from "../../styles/form.module.scss";
import { useRouter } from "next/router";
import InputControl from "../../components/InputControl/InputControl";
import Link from "next/link";
import { AwesomeButton } from "react-awesome-button";
import Image from "next/image";
import { useAuthContext } from "../../context/AuthContext";
import { apiHttp } from "../../utils/utils";
import { FaGithub, FaFacebook } from "react-icons/fa";
import axios from "axios";

// const googleAuth = `${process.env.NEXT_PUBLIC_API_DOMAIN_PURE}/api/login/google/redirect`;
// const githubAuth = `${process.env.NEXT_PUBLIC_API_DOMAIN_PURE}/api/login/github/redirect`;
// const facebookAuth = `${process.env.NEXT_PUBLIC_API_DOMAIN_PURE}/api/login/facebook/redirect`;

export default function Login() {
  const [emailProps, setEmailError, setEmailProps] = useInput();
  const [passwordProps, setPasswordError, setPasswordProps] = useInput();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { setUser } = useAuthContext();
  const router = useRouter();

  const validateInputs = () => {
    let valid = true;
    let emailRegExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

    if (!emailRegExp.test(emailProps.value)) {
      valid = false;
      setEmailError(true, "برجاء ادخال بريد الكتروني صالح");
    }
    if (passwordProps.value?.length < 8) {
      valid = false;
      setPasswordError(true, "كلمة السر يجب ان تحتوي علي 8 رموز علي الاقل.");
    } else if (passwordProps.value?.length > 25) {
      setPasswordError(true, "كلمة السر طويلة جدا.");
    }
    if (!valid) {
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return false;

    if (!validateInputs()) {
      return false;
    }

    setLoading(true);

    try {
      const data = {
        email: emailProps.value,
        password: passwordProps.value,
      };

      await apiHttp.get(process.env.NEXT_PUBLIC_CSRF);

      const url = process.env.NEXT_PUBLIC_LOGIN;
      console.log(`Login URL => `, url);
      const res = await apiHttp.post(url, data);
      console.log(`Login Response =>`, res);

      if (res.data.type === "success") {
        const { data: user } = res.data;
        setUser(user);
        console.log(`New User =>`, user);
      }

      setError(false);
      router.push("/my-account");
    } catch (err) {
      console.log(`Login Error =>`, err);
      const { msg } = err.response.data;
      if (msg === "Not authorized") {
        setError(`البيانات غير صالحة.`);
      } else {
        setError(true);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>تسجيل دخول</title>
      </Head>

      <div className={form.formContainer}>
        <div className="container">
          <div className={form.formWrapper}>
            <form onSubmit={handleSubmit}>
              <h3 className={form.heading}>تسجيل دخول</h3>
              <InputControl props={emailProps} label="البريد الالكتروني" />
              <InputControl
                props={passwordProps}
                type="password"
                label="كلمة السر"
              />

              {!!error && (
                <p className="my-2 text-danger" style={{ fontSize: "18px" }}>
                  {isNaN(error)
                    ? error
                    : "حدث خطأ اثناء محاولة تسجيل الدخول الرجاء اعادة المحاولة"}
                </p>
              )}
              {/* <button
                type="button"
                className="ms-auto bg-transparent fs-6"
                onClick={() => {
                  setEmailProps((prev) => ({
                    ...prev,
                    value: "demo@demo.com",
                  }));
                  setPasswordProps((prev) => ({
                    ...prev,
                    value: "demo123",
                  }));
                }}
              >
                تجريبي
              </button> */}
              <AwesomeButton
                type="secondary"
                size="medium"
                className={form.submitBtn}
              >
                {!loading && "تسجيل"}
              </AwesomeButton>
              <Link
                href="/login/forgot-password"
                className="text-decoration-underline"
              >
                نسيت كلمة السر
              </Link>
              <p>
                ليس لديك حساب؟
                <Link href="/signup" className="text-decoration-underline">
                  انشاء حساب
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
