import axios from 'axios';
import Head from "next/head";
import { useRouter } from 'next/router';
import { useState } from 'react';
import Navbar from '../components/Navbar/Navbar';
import useInput from "../hooks/useInput";
import { formWrapper, formContainer, submit, heading, formButtonLoading, inputControl, error as inputControlError, helperText } from '../styles/form.module.scss'
import { useDispatch } from 'react-redux'
import { userSlice } from '../app/userSlice';
function Signup() {
    const [nameProps, nameChange, setNameError] = useInput();
    const [emailProps, emailChange, setEmailError] = useInput();
    const [passwordProps, passwordChange, setPasswordError] = useInput();
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
            console.log(`reach`)

            const response = await axios.post('/api/signup', { name, password, email })
            const user = response.data.user
            console.log(`request response =>`, response)
            setError(false)
            dispatch(userSlice.actions.loginSuccess(user))
            // navigate
            router.push({
                pathname: '/my-account',
                query: {}
            }, undefined, {})

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
                            <div className={`${inputControl} ${nameProps.error ? inputControlError : ''}`}>
                                <label htmlFor="nameInput">الاسم</label>
                                <input type="text" id='nameInput' onChange={nameChange} />
                                {nameProps.error ? <p className={helperText}>{nameProps.helperText}</p> : null}
                            </div>
                            <div className={`${inputControl} ${emailProps.error ? inputControlError : ''}`}>
                                <label htmlFor="nameInput">البريد الالكتروني</label>
                                <input type="text" id='nameInput' onChange={emailChange} />
                                {emailProps.error ? <p className={helperText}>{emailProps.helperText}</p> : null}
                            </div>
                            <div className={`${inputControl} ${passwordProps.error ? inputControlError : ''}`}>
                                <label htmlFor="nameInput">كلمة السر</label>
                                <input type="text" id='nameInput' onChange={passwordChange} />
                                {passwordProps.error ? <p className={helperText}>{passwordProps.helperText}</p> : null}
                            </div>
                            {
                                !!error && <p className='my-2 text-danger'>حدث خطأ اثناء محاولة انشاء حساب الرجاء اعادة المحاولة</p>
                            }
                            <button type="submit" className={submit}>{loading ? <span className={formButtonLoading}></span> : 'انشاء'}</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Signup;
