import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import useInput from "../hooks/useInput";
import form from "../styles/form.module.scss";
import InputControl from "../components/InputControl/InputControl";
import Link from "next/link";
import { AwesomeButton } from "react-awesome-button";
import Image from "next/image";
import { apiHttp } from "../utils/utils";
import axios from "axios";
import { useAuthContext } from "../context/AuthContext";
import { FaFacebook, FaGithub } from "react-icons/fa";

// const googleAuth = `${process.env.NEXT_PUBLIC_API_DOMAIN_PURE}/api/login/google/redirect`;
// const githubAuth = `${process.env.NEXT_PUBLIC_API_DOMAIN_PURE}/api/login/github/redirect`;
// const facebookAuth = `${process.env.NEXT_PUBLIC_API_DOMAIN_PURE}/api/login/facebook/redirect`;

function Signup() {
  const [nameProps, setNameError] = useInput();
  const [emailProps, setEmailError] = useInput();
  const [passwordProps, setPasswordError] = useInput();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { setUser } = useAuthContext();
  const router = useRouter();

  const validateInputs = () => {
    let valid = true;
    let emailRegExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

    if (!nameProps.value.trim() || nameProps.value?.length > 25) {
      valid = false;
      setNameError(true, "برجاء ادخال اسم صالح");
    }
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

  const handleErrors = (errors) => {
    let checked = false;
    const emailErr = errors.email;
    const nameErr = errors.name;
    if (emailErr?.at(0) === "email-exists") {
      setEmailError(true, "البريد الالكتروني موجود بالفعل");
      checked = true;
    } else if (emailErr?.at(0) === "email-invalid") {
      setEmailError(true, "البريد الالكتروني غير صالح");
      checked = true;
    }
    if (nameErr?.at(0) === "name-only-numbers") {
      setNameError(true, "الاسم يجب ان يحتوي علي حرف واحد علي الاقل");
      checked = true;
    }
    return checked;
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
        name: nameProps.value,
        email: emailProps.value,
        password: passwordProps.value,
      };
      await apiHttp.get(process.env.NEXT_PUBLIC_CSRF);
      const url = process.env.NEXT_PUBLIC_REGISTER;
      console.log(`Register URL => `, url);
      const res = await apiHttp.post(url, data);
      console.log(`Register Response =>`, res);
      if (res.status === "200") {
        const { data: user } = res.data;
        setUser(user);
        console.log(`New User =>`, user);
      }
      setError(false);
    } catch (err) {
      console.log(`Login Error =>`, err);
      const errors = err.response?.data?.data?.errors;
      if (!errors || !handleErrors(errors)) {
        setError(true);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>انشاء حساب</title>
      </Head>

      <div className={form.formContainer}>
        <div className="container">
          <div className={form.formWrapper}>
            <form onSubmit={handleSubmit}>
              <h3 className={form.heading}>انشاء حساب</h3>
              <InputControl props={nameProps} label="الاسم" />
              <InputControl props={emailProps} label="البريد الالكتروني" />
              <InputControl
                props={passwordProps}
                type="password"
                label="كلمة السر"
              />
              {/* <p className={form.or}>
                <span>أو</span>
              </p> */}
              {/* <Link href={googleAuth} className={form.googleBtn}>
                <Image
                  src="/images/google.svg"
                  width={30}
                  height={30}
                  alt="google"
                />
                تسجيل الدخول باستخدام google
              </Link> */}
              {/* <Link href={githubAuth} className={form.githubBtn}>
                <FaGithub />
                تسجيل الدخول باستخدام github
              </Link> */}
              {/* <Link href={facebookAuth} className={form.facebookBtn}>
                <FaFacebook />
                تسجيل الدخول باستخدام facebook
              </Link> */}
              {!!error && (
                <p className="my-2 text-danger">
                  حدث خطأ اثناء محاولة انشاء حساب الرجاء اعادة المحاولة
                </p>
              )}
              <AwesomeButton
                type="secondary"
                size="medium"
                className={form.submitBtn}
              >
                {!loading && "انشاء"}
              </AwesomeButton>
              <p>
                لديك حساب بالفعل!
                <Link href="/login" className="text-decoration-underline me-1">
                  تسجيل دخول
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
