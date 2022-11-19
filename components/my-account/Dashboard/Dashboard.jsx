import Link from 'next/link'
import { useSelector } from 'react-redux'
import s from './Dashboard.module.scss'

function Dashboard({ user, signout }) {
    return (
        <div className={s.wrapper}>
            <p>مرحبًا <b>{user.displayName}</b> (لست <b>{user.displayName}</b> <button type='button' onClick={signout}>تسجيل الخروج</button>)</p>
            <p>
                من خلال لوحة تحكم الحساب الخاص بك، يمكنك استعراض
                <Link href='/my-account/orders'>أحدث الطلبات</Link>
                ، إدارة
                <Link href='/my-account/edit-address'>عناوين الشحن والفواتير</Link>
                الخاصة بك، بالإضافة إلى <Link href='/my-account/edit-account'>تعديل كلمة المرور وتفاصيل حسابك</Link>.
            </p>
        </div>
    )
}

export default Dashboard