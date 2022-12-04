import Link from "next/link";
import { useRouter } from "next/router";

function ActiveLink({
  children,
  href,
  activeClassName = "active",
  tag,
  ...props
}) {
  const router = useRouter();

  return (
    <Link
      href={href}
      className={`${router.asPath === href ? activeClassName : ""} ${
        props.className || ""
      }`}
    >
      {children}
    </Link>
  );
}

export default ActiveLink;
