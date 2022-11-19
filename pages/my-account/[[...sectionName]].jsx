import { signOut } from 'firebase/auth'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useSelector } from 'react-redux'
import Footer from '../../components/Footer/Footer'
import Dashboard from '../../components/my-account/Dashboard/Dashboard'
import Downloads from '../../components/my-account/Downloads/Downloads'
import Orders from '../../components/my-account/Orders/Orders'
import MyAccountNavigationBar from '../../components/MyAccountNavigationBar/MyAccountNavigationBar'
import Navbar from '../../components/Navbar/Navbar'
import s from '../../styles/my-account.module.scss'
import { auth } from '../../utils/firebase'

function MyAccount() {

    const router = useRouter()
    const page = router.query.sectionName?.at(0)
    const user = useSelector(state => state.user.user)
    let outlet = null;

    const signout = () => {
        signOut(auth);
        router.reload()
    }

    console.log(user)

    if (user) {
        switch (page) {
            case 'orders':
                outlet = <Orders />
                break
            case 'downloads':
                outlet = <Downloads />
                break
            default:
                outlet = <Dashboard user={user} signout={signout} />
        }
    } else if (typeof window !== 'undefined') {
        router.push('/')
    }








    return (
        <>

            <Head>
                <title>حسابي - اسفار</title>
            </Head>

            <Navbar />


            <div className='py-5'>
                <h1 className="title">حسابي</h1>
                <div className="container">
                    <div className={`${s.wrapper} d-flex flex-column flex-lg-row`}>
                        <MyAccountNavigationBar signout={signout} />
                        <div className={s.outlet}>
                            {outlet}
                        </div>
                    </div>
                </div>
            </div>


            <Footer />


        </>
    )
}

export default MyAccount