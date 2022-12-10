import Link from "next/link";
import { useRouter } from "next/router";

function ActiveLink({
  children,
  href,
  activeClassName = "active",
  tag,
  className = "",
  ...props
}) {
  const router = useRouter();

  return (
    <Link
      href={href}
      className={`${
        router.asPath === href ? activeClassName : ""
      } ${className}`}
      {...props}
    >
      {children}
    </Link>
  );
}

export default ActiveLink;
