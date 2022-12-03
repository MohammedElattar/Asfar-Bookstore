import Head from "next/head";
import { useState } from "react";
import useInput from "../../hooks/useInput";
import {
  formWrapper,
  formContainer,
  heading,
} from "../../styles/form.module.scss";
import InputControl from "../../components/InputControl/InputControl";
import { useRouter } from "next/router";
import { AwesomeButton } from "react-awesome-button";
import Loading from "../../components/Loading";

function Login() {
  const [emailProps, setEmailError] = useInput();
  const [passwordProps, setPasswordError] = useInput();
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
        email: emailProps.value,
        password: passwordProps.value,
      });
      const res = await fetch("/api/login", {
        method: "POST",
        body: data,
      });

      const responseData = await res.json();
      const {
        data: { token },
        type,
      } = responseData;

      if (type !== "success") {
        throw new Error("error");
      }

      console.log(`Response`, responseData);

      setError(false);
      window.navigator.clipboard.writeText(token);
      window.location.pathname = "/admin/dashboard";
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
              <AwesomeButton type="secondary" size="medium">
                تسجيل
                {loading ? (
                  <Loading
                    size={15}
                    style={{ marginRight: "5px" }}
                    borderColor="#1e88e5"
                  />
                ) : null}
              </AwesomeButton>
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
      sidebar: false,
    },
  };
}
