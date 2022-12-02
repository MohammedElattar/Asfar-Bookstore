import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import useInput from "../hooks/useInput";
import {
  formWrapper,
  formContainer,
  heading,
} from "../styles/form.module.scss";
import { useDispatch } from "react-redux";
import InputControl from "../components/InputControl/InputControl";
import Link from "next/link";
import { AwesomeButton } from "react-awesome-button";
import Loading from "../components/Loading";
function Signup() {
  const [nameProps, setNameError] = useInput();
  const [emailProps, setEmailError] = useInput();
  const [passwordProps, setPasswordError] = useInput();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const dispatch = useDispatch();
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
      let name = nameProps.value;
      let password = passwordProps.value;
      let email = emailProps.value;

      // const cred = await createUserWithEmailAndPassword(auth, email, password);
      // await updateProfile(cred.user, {
      //   displayName: name,
      // });

      // setError(false);
      // router.push("/my-account");
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
        <title>انشاء حساب</title>
      </Head>

      <div className={formContainer}>
        <div className="container">
          <div className={formWrapper}>
            <form onSubmit={handleSubmit}>
              <h3 className={heading}>انشاء حساب</h3>
              <InputControl props={nameProps} label="الاسم" />
              <InputControl props={emailProps} label="البريد الالكتروني" />
              <InputControl
                props={passwordProps}
                type="password"
                label="كلمة السر"
              />
              {!!error && (
                <p className="my-2 text-danger">
                  حدث خطأ اثناء محاولة انشاء حساب الرجاء اعادة المحاولة
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
