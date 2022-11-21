import s from './Pagination.module.scss'
import ActiveLink from '../ActiveLink'
import { useRouter } from 'next/router'

function Pagination({ max }) {
    const router = useRouter();
    const pageNumber = +router.query.pageNumber;

    const before = [];
    for (let i = pageNumber - 5; i < +pageNumber; i++) {
        if (i > 0) {
            before.push(
                <ActiveLink href={`/products/${i}`} activeClassName={s.active}>{i}</ActiveLink>
            )
        }
    }
    const after = [];
    for (let i = pageNumber + 1; i < pageNumber + 5; i++) {
        if (i <= max) {
            after.push(
                <ActiveLink href={`/products/${i}`} activeClassName={s.active}>{i}</ActiveLink>
            )
        }
    }


    return (
        <div className={s.pagination}>
            {before}
            <ActiveLink href={`/products/${pageNumber}`} activeClassName={s.active}>{pageNumber}</ActiveLink>
            {after}
        </div>
    )
}

export default Pagination