import Head from "next/head";
import { useRouter } from 'next/router';
import { useState } from 'react';
import Navbar from '../components/Navbar/Navbar';
import useInput from "../hooks/useInput";
import { formWrapper, formContainer, heading } from '../styles/form.module.scss'
import { useDispatch } from 'react-redux'
import InputControl from '../components/InputControl/InputControl';
import FormLoadingButton from '../components/FormLoadingButton/FormLoadingButton';
import { auth } from '../utils/firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
function Signup() {
    const [nameProps, setNameError] = useInput();
    const [emailProps, setEmailError] = useInput();
    const [passwordProps, setPasswordError] = useInput();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false)
    const dispatch = useDispatch()
    const router = useRouter()


    const validateInputs = () => {
        let valid = true;
        let emailRegExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g

        if (!nameProps.value.trim() || nameProps.value?.length > 25) {
            valid = false;
            setNameError(true, 'برجاء ادخال اسم صالح')
        }
        if (!emailRegExp.test(emailProps.value)) {
            valid = false;
            setEmailError(true, 'برجاء ادخال بريد الكتروني صالح')
        }
        if (passwordProps.value?.length < 6 || passwordProps.value?.length > 25) {
            valid = false;
            setPasswordError(true, 'برجاء ادخال كلمة سر صالحة')
        }
        if (!valid) {
            return false
        }
        return true
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (loading) return false;


        if (!validateInputs()) {
            return false
        }

        setLoading(true)

        try {
            let name = nameProps.value;
            let password = passwordProps.value;
            let email = emailProps.value;

            const cred = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(cred.user, {
                displayName: name,
            });

            setError(false)
            router.push('/my-account')
        } catch (err) {
            console.error(err)
            setError(true)
        } finally {
            setLoading(false)
        }

    };

    return (
        <>
            <Head>
                <title>انشاء حساب</title>
            </Head>

            <Navbar />

            <div className={formContainer} >
                <div className="container">
                    <div className={formWrapper}>
                        <form onSubmit={handleSubmit}>
                            <h3 className={heading}>انشاء حساب</h3>
                            <InputControl props={nameProps} label='الاسم' />
                            <InputControl props={emailProps} label='البريد الالكتروني' />
                            <InputControl props={passwordProps} label='كلمة السر' />
                            {
                                !!error && <p className='my-2 text-danger'>حدث خطأ اثناء محاولة انشاء حساب الرجاء اعادة المحاولة</p>
                            }
                            <FormLoadingButton loading={loading} text='انشاء حساب' />
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Signup;
