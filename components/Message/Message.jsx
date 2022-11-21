import Link from 'next/link'
import s from './Message.module.scss'

function Message({ icon, text, button }) {
    return (
        <div className={s.message}>
            <div className={s.wrapper}>
                {icon}
                {text}
            </div>
            {
                button ? <Link href={button.href}>{button.text}</Link> : null
            }
        </div>
    )
}

export default Message