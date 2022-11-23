import s from "./Pagination.module.scss";
import ActiveLink from "../ActiveLink";
import { useRouter } from "next/router";
import Link from "next/link";
import { BiArrowToLeft, BiArrowToRight } from "react-icons/bi";

function Pagination({ max }) {
  const router = useRouter();
  const pageNumber = +router.query.pageNumber;

  const before = [];
  for (let i = pageNumber - 5; i < +pageNumber; i++) {
    if (i > 0) {
      before.push(
        <ActiveLink href={`/products/${i}`} activeClassName={s.active} key={i}>
          {i}
        </ActiveLink>
      );
    }
  }
  const after = [];
  for (let i = pageNumber + 1; i < pageNumber + 5; i++) {
    if (i <= max) {
      after.push(
        <ActiveLink href={`/products/${i}`} activeClassName={s.active} key={i}>
          {i}
        </ActiveLink>
      );
    }
  }

  return (
    <div className={s.pagination}>
      {pageNumber > 1 ? (
        <Link href="/products/0">
          <BiArrowToRight />
        </Link>
      ) : null}
      {before}
      <ActiveLink href={`/products/${pageNumber}`} activeClassName={s.active}>
        {pageNumber}
      </ActiveLink>
      {after}
      {pageNumber < max ? (
        <Link href={`/products/${max}`}>
          <BiArrowToLeft />
        </Link>
      ) : null}
    </div>
  );
}

export default Pagination;
