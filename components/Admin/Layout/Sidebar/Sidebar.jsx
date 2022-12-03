import Image from "next/image";
import { useState } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { FaUser } from "react-icons/fa";
import { MdSpaceDashboard } from "react-icons/md";
import { SiBookstack } from "react-icons/si";
import ActiveLink from "../../../ActiveLink";
import s from "./Sidebar.module.scss";
function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <aside className={`${s.sidebar} ${!isOpen ? s.sidebarClosed : ""}`}>
      <header className={s.header}>
        <Image
          src="/images/asfar-logo.png"
          alt="asfar"
          width={128}
          height={43}
          className={s.logo}
        />
        {isOpen ? (
          <button
            className={s.icon}
            type="button"
            onClick={() => setIsOpen(false)}
          >
            <AiFillEyeInvisible />
          </button>
        ) : (
          <button
            className={s.icon}
            type="button"
            onClick={() => setIsOpen(true)}
          >
            <AiFillEye />
          </button>
        )}
      </header>
      <ActiveLink
        href="/admin/dashboard"
        activeClassName={s.activeLink}
        tag="a"
      >
        <MdSpaceDashboard />
        <span>لوحة التحكم</span>
      </ActiveLink>
      <ActiveLink href="/admin/products" activeClassName={s.activeLink} tag="a">
        <SiBookstack />
        <span>المنتجات</span>
      </ActiveLink>
      <ActiveLink href="/admin/users" activeClassName={s.activeLink} tag="a">
        <FaUser />
        <span>المستخدمين</span>
      </ActiveLink>
    </aside>
  );
}
export default Sidebar;
