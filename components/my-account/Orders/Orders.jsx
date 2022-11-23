import Message from "../../Message/Message";
import s from "./Orders.module.scss";
import { FaCheck } from "react-icons/fa";

function Orders() {
  return (
    <Message
      icon={
        <div className={s.icon}>
          <FaCheck />
        </div>
      }
      text="لم يتم تنفيذ أي طلب بعد."
      button={{ text: "تصفُّح المنتجات", href: "/products/1" }}
    />
  );
}

export default Orders;
