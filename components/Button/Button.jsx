import { FaArrowLeft } from "react-icons/fa";
import Link from "next/link";

function Button({ children, centered, color, className, href, ...props }) {
  return (
    <Link
      href={href}
      className={`button ${centered ? "center" : ""} ${color === "#f7be29" ? "yellow" : ""
        } ${className}`}
      {...props}
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
