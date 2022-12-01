import Head from "next/head";
import { useState } from "react";
import globalConfig from "../../utils/config";
import useInput from "../../hooks/useInput";
import {
  formWrapper,
  formContainer,
  heading,
} from "../../styles/form.module.scss";
import InputControl from "../../components/InputControl/InputControl";
import FormLoadingButton from "../../components/FormLoadingButton/FormLoadingButton";
import axios from "axios";
import { useAdminContext } from "../../context/AdminContext";
import { useRouter } from "next/router";
function Login() {
  const [emailProps, setEmailError] = useInput();
  const [passwordProps, setPasswordError] = useInput();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { setIsLoggedIn, setUser } = useAdminContext();
  const router = useRouter();
  const validateInputs = () => {
    let valid = true;
    let emailRegExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

    if (!emailRegExp.test(emailProps.value)) {
      valid = false;
      setEmailError(true, "برجاء ادخال بريد الكتروني صالح");
    }
    if (passwordProps.value?.length < 5 || passwordProps.value?.length > 25) {
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
      const data = JSON.stringify({
        email: "admin@admin.com",
        password: "admin",
      });

      const config = {
        method: "POST",
        headers: {
          Accept: "application/vnd.api+json",
          "Content-Type": "application/vnd.api+json",
        },
      };

      const res = await axios.post(
        process.env.NEXT_PUBLIC_ADMIN_LOGIN_URL,
        data,
        config
      );
      const { data: user, token } = res.data.data;

      window.localStorage.setItem("token", token);
      setIsLoggedIn(true);
      setUser(user);
      router.push("/admin/dashboard");
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
              <FormLoadingButton text="تسجيل" loading={loading} />
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;

export async function getStaticProps() {
  return {
    props: {
      admin: true,
    },
  };
}
