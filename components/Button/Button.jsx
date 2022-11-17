import { FaArrowLeft } from "react-icons/fa";
import Link from "next/link";

function Button({ children, centered, color, className, href }) {
  return (
    <Link
      href={href}
      className={`button ${centered ? "center" : ""} ${
        color === "#f7be29" ? "yellow" : ""
      } ${className}`}
    >
      <div>
        {children}
        <div className={`icon`}>
          <FaArrowLeft />
        </div>
      </div>
    </Link>
  );
}

export default Button;
