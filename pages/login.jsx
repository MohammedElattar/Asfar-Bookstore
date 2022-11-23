import axios from "axios";
import Head from "next/head";
import { useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import useInput from "../hooks/useInput";
import {
  formWrapper,
  formContainer,
  submit,
  heading,
  formButtonLoading,
  inputControl,
  error as inputControlError,
  helperText,
} from "../styles/form.module.scss";
import { useDispatch } from "react-redux";
import { userSlice } from "../app/userSlice";
import { useRouter } from "next/router";
import InputControl from "../components/InputControl/InputControl";
import FormLoadingButton from "../components/FormLoadingButton/FormLoadingButton";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../utils/firebase";
import Link from "next/link";
function Login() {
  const [emailProps, setEmailError, setEmailProps] = useInput();
  const [passwordProps, setPasswordError, setPasswordProps] = useInput();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const router = useRouter();

  const validateInputs = () => {
    let valid = true;
    let emailRegExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

    if (!emailRegExp.test(emailProps.value)) {
      valid = false;
      setEmailError(true, "برجاء ادخال بريد الكتروني صالح");
    }
    if (passwordProps.value?.length < 6 || passwordProps.value?.length > 25) {
      valid = false;
      setPasswordError(true, "برجاء ادخال كلمة سر صالحة");
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
      const cred = await signInWithEmailAndPassword(
        auth,
        emailProps.value,
        passwordProps.value
      );
      console.log(`cred =>`, cred);
      setError(false);
      router.push("/my-account");
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>تسجيل دخول</title>
      </Head>

      <div className={formContainer}>
        <div className="container">
          <div className={formWrapper}>
            <form onSubmit={handleSubmit}>
              <h3 className={heading}>تسجيل دخول</h3>
              <InputControl props={emailProps} label="البريد الالكتروني" />
              <InputControl
                props={passwordProps}
                type="password"
                label="كلمة السر"
              />
              {!!error && (
                <p className="my-2 text-danger">
                  حدث خطأ اثناء محاولة تسجيل الدخول الرجاء اعادة المحاولة
                </p>
              )}
              <button
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
              </button>
              <FormLoadingButton text="تسجيل" loading={loading} />
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

export default Login;
