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

function Footer() {
    return (
        <footer id="footer">
            <div className="container py-5">
                <div className="logo">
                    <Image
                        src="/images/asfar-logo.png"
                        width={144}
                        height={48}
                        alt="logo"
                    />
                </div>
                <div className="customer-service">
                    <h5 className='fw-bold'>خدمة العملاء</h5>
                    <p className='text-dark'>اضغط على الوسيلة للتحدث إلينا مباشرة</p>
                    <div className="d-flex gap-4 justify-content-center flex-wrap">
                        <a href="#" className='d-flex align-items-center gap-2 fs-5'>
                            <FaWhatsapp />
                            WhatsApp
                        </a>
                        <a href="#" className='d-flex align-items-center gap-2 fs-5'>
                            <FaFacebookMessenger />
                            Facebook
                        </a>
                        <a href="#" className='d-flex align-items-center gap-2 fs-5'>
                            <FaEnvelope />
                            fulfill@asfar.io
                        </a>
                    </div>
                </div>
                <div className="social">
                    <a href="#" style={{ backgroundColor: "#3b5998" }}>
                        <FaFacebook />
                    </a>
                    <a href="#" style={{ backgroundColor: "#f56040" }}>
                        <FaInstagram />
                    </a>
                    <a href="#" style={{ backgroundColor: "#229ed9" }}>
                        <FaTelegram />
                    </a>
                </div>
                <div className="d-flex justify-content-center gap-3 flex-wrap">
                    <Link href="#" className='d-flex align-items-center gap-2'>
                        <FaCircleNotch />
                        شروط الخدمة
                    </Link>
                    <Link href="#" className='d-flex align-items-center gap-2'>
                        <FaCircleNotch />
                        تتبع طلباتك
                    </Link>
                    <Link href="#" className='d-flex align-items-center gap-2'>
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
