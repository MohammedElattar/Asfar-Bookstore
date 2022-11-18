import Link from 'next/link'
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'
import {Children} from 'react'

function ActiveLink({children, href,  ...props}) {
    const {pathname} = useRouter();
    
  return (
    <Link href={href}>
    </Link>
  )
}

export default ActiveLink