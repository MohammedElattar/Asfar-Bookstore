import Message from "../../Message";
import s from "./Downloads.module.scss";
import { FaRegWindowMaximize } from "react-icons/fa";

function Downloads() {
  return (
    <Message
      icon={
        <div className={s.icon}>
          <FaRegWindowMaximize />
        </div>
      }
      text="لا توجد عناصر متاحة قابلة للتنزيل حاليًا."
      button={{ text: "تصفُّح المنتجات", href: "/products/1" }}
    />
  );
}

export default Downloads;
