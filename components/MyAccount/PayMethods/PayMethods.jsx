import { FaRegWindowMaximize } from "react-icons/fa";
import Message from "../../Message";
import s from "./PayMethods.module.scss";
function PayMethods() {
  return (
    <Message
      icon={
        <div className={s.icon}>
          <FaRegWindowMaximize />
        </div>
      }
      text="لا توجد عناصر متاحة قابلة للتنزيل حاليًا."
    />
  );
}

export default PayMethods;
