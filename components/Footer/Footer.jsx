import Image from "next/image";
import Link from "next/link";
import {
  FaCircleNotch,
  FaEnvelope,
  FaFacebook,
  FaFacebookMessenger,
  FaInstagram,
  FaTelegram,
  FaWhatsapp,
} from "react-icons/fa";

function Footer({ facebook, whatsapp, instagram, telegram, email }) {
  return (
    <footer id="footer">
      <div className="container py-5">
        <div className="logo">
          <Image
            src="/images/asfar-logo.png"
            width={144}
            height={48}
            alt="logo"
            priority
          />
        </div>
        <div className="customer-service">
          <h5 className="fw-bold">خدمة العملاء</h5>
          <p className="text-dark">اضغط على الوسيلة للتحدث إلينا مباشرة</p>
          <div className="d-flex gap-4 justify-content-center flex-wrap">
            <a
              href={whatsapp}
              target={"_blank"}
              rel="noreferrer"
              className="d-flex align-items-center gap-2 fs-5"
            >
              <FaWhatsapp />
              WhatsApp
            </a>
            <a
              href={facebook}
              target={"_blank"}
              rel="noreferrer"
              className="d-flex align-items-center gap-2 fs-5"
            >
              <FaFacebookMessenger />
              Messenger
            </a>
            <a
              href={`mailto:${email}`}
              target={"_blank"}
              rel="noreferrer"
              className="d-flex align-items-center gap-2 fs-5"
            >
              <FaEnvelope />
              {email}
            </a>
          </div>
        </div>
        <div className="social">
          <a
            href={facebook}
            target={"_blank"}
            rel="noreferrer"
            style={{ backgroundColor: "#3b5998" }}
          >
            <FaFacebook />
          </a>
          <a
            href={instagram}
            target={"_blank"}
            rel="noreferrer"
            style={{ backgroundColor: "#f56040" }}
          >
            <FaInstagram />
          </a>
          <a
            href={telegram}
            target={"_blank"}
            rel="noreferrer"
            style={{ backgroundColor: "#229ed9" }}
          >
            <FaTelegram />
          </a>
        </div>
        <div className="d-flex justify-content-center gap-3 flex-wrap">
          <Link
            href="#"
            target={"_blank"}
            rel="noreferrer"
            className="d-flex align-items-center gap-2"
          >
            <FaCircleNotch />
            شروط الخدمة
          </Link>
          <Link
            href="#"
            target={"_blank"}
            rel="noreferrer"
            className="d-flex align-items-center gap-2"
          >
            <FaCircleNotch />
            تتبع طلباتك
          </Link>
          <Link
            href="#"
            target={"_blank"}
            rel="noreferrer"
            className="d-flex align-items-center gap-2"
          >
            <FaCircleNotch />
            سياسة الاسترجاع والاستبدال
          </Link>
        </div>
      </div>
      <div className="copy-right">ASFAR, Inc. ©جميع الحقوق محفوظة</div>
    </footer>
  );
}

export default Footer;
