import ActiveLink from '../ActiveLink'
import s from './MyAccountNavigationBar.module.scss'

function MyAccountNavigationBar({ signout }) {



    return <div className={s.bar}>
        <ActiveLink href='/my-account' activeClassName={s.active}>لوحة التحكم</ActiveLink>
        <ActiveLink href='/my-account/orders' activeClassName={s.active}>الطلبات</ActiveLink>
        <ActiveLink href='/my-account/downloads' activeClassName={s.active}>التحميلات</ActiveLink>
        <ActiveLink href='/my-account/edit-address' activeClassName={s.active}>العناوين</ActiveLink>
        <ActiveLink href='/my-account/payment-methods' activeClassName={s.active}>طرق الدفع</ActiveLink>
        <ActiveLink href='/my-account/edit-account' activeClassName={s.active}>تفاصيل الحساب</ActiveLink>
        <button type='button' onClick={signout}>تسجيل الخروج</button>
    </div>
}

export default MyAccountNavigationBar