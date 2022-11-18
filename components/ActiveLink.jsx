import Link from 'next/link'
import { useRouter } from 'next/router'

function ActiveLink({ children, href, ...props }) {
  const router = useRouter();


  return (
    <Link href={href} className={`${router.asPath === href ? 'active' : ""} ${props.className || ""}`}>
      {children}
    </Link>
  )
}

export default ActiveLink