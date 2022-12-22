import { createContext, useContext } from "react";
import { cls, getWebsiteInfo } from "../utils/utils";
import s from "../styles/checkout.module.scss";
import { useCartContext } from "../context/CartContext";
import Message from "../components/Message";
import useAlerts from "../hooks/useAlerts";
import InputControl, {
  SelectInput,
} from "../components/InputControl/InputControl";
import useInput from "../hooks/useInput";
import { useAuthContext } from "../context/AuthContext";
import CheckoutProvider, {
  useCheckoutContext,
} from "../context/CheckoutContext";
import FormLoadingButton from "../components/FormLoadingButton/FormLoadingButton";

const STATES = [
  "أسوان",
  "أسيوط",
  "الأقصر",
  "الإسكندرية",
  "الإسماعيلية",
  "البحر الأحمر",
  "البحيرة",
  "الجيزة",
  "الدقهلية",
  "السويس",
  "الشرقية",
  "الغربية",
  "الفيوم",
  "القاهرة",
  "القليوبية",
  "المنوفية",
  "المنيا",
  "بني سويف",
  "بورسعيد",
  "دمياط",
  "سوهاج",
  "قنا",
  "كفر الشيخ",
  "مرسى مطروح",
  "الساحل الشمالي",
].map((e) => ({ label: e, value: e }));

const Context = createContext();

export default function Checkout() {
  return (
    <CheckoutProvider>
      <main className={s.main}>
        <h2 className={"title fs-1 no-line"}>سجل بياناتك لإتمام الطلب</h2>
        <div className="container">
          <div className={s.alerts}>
            <Alerts />
          </div>
          <div className="row">
            <div className="col-7 p-0 ps-1 d-flex flex-column gap-2">
              <Form />
              <AdditionalInfo />
            </div>
            <div className="col-5 p-0 pe-1 d-flex flex-column gap-2">
              <Info />
              <ConfirmOrder />
            </div>
          </div>
        </div>
      </main>
    </CheckoutProvider>
  );
}

function Alerts() {
  const { alerts } = useCheckoutContext();
  return (
    <>
      {alerts.map((alert) => (
        <Message {...alert} key={alert.text} />
      ))}
    </>
  );
}

function AdditionalInfo() {
  const { textProps } = useCheckoutContext();
  return (
    <div className={cls(s.wrapper, s.additionalInfo)}>
      <h3>معلومات إضافية</h3>
      <InputControl
        props={textProps}
        label={"ملاحظات الطلب (اختياري)"}
        placeholder="ملاحظات خاصة تود إبلاغنا بها إن شئت."
        textarea
      />
    </div>
  );
}

function ConfirmOrder() {
  const { handleConfirm, loading } = useCheckoutContext();
  return (
    <div className={cls(s.wrapper, s.confirmOrder)}>
      <div className={s.payOption}>
        <label htmlFor="pay1">الدفع نقدًا عند الاستلام</label>
        <input type="radio" name="payment" required defaultChecked id="pay1" />
      </div>
      <FormLoadingButton
        text={`تأكيد الطلب`}
        className={s.confirmOrderBtn}
        onClick={handleConfirm}
        loading={loading}
      ></FormLoadingButton>
    </div>
  );
}

function Info() {
  const { products } = useCheckoutContext();
  const shipping = 50;
  const total = products.map((e) => e.price * e.qty).reduce((a, b) => a + b, 0);
  return (
    <div className={cls(s.wrapper, s.info)}>
      <h3>طلبك</h3>
      <div className={s.table}>
        <div className={s.row}>
          <div className={cls(s.td, s.gray)}>المنتج</div>
          <div className={cls(s.td, s.gray)}>المجموع</div>
        </div>
        {products.map(({ book_id: id, book_name: title, price, vendor }) => (
          <div key={id} className={s.row}>
            <div className={s.td}>
              <p>{title}</p>
              <p>البائع: {vendor}</p>
            </div>
            <div className={s.td}>{price} EGP</div>
          </div>
        ))}
        <div className={s.row}>
          <div className={cls(s.td, s.gray)}>المجموع</div>
          <div className={s.td}>{total} EGP</div>
        </div>
        <div className={s.row}>
          <div className={cls(s.td, s.gray)}>الشحن</div>
          <div className={s.td}>{shipping} EGP</div>
        </div>
        <div className={s.row}>
          <div className={cls(s.td, s.gray)}>الإجمالي</div>
          <div className={s.td}>{total + shipping} EGP</div>
        </div>
      </div>
    </div>
  );
}

function Form() {
  const {
    firstNameProps,
    lastNameProps,
    phoneProps,
    emailProps,
    address1Props,
    address2Props,
    cityProps,
    stateProps,
  } = useCheckoutContext();
  return (
    <div className={cls(s.form, s.wrapper)}>
      <h3>بيانات الفاتورة والشحن</h3>
      <div className={s.divider}>
        <InputControl label={`الاسم الأول`} required props={firstNameProps} />
        <InputControl label={`الاسم الأخير`} required props={lastNameProps} />
      </div>
      <InputControl
        label={`الهاتف/الجوال`}
        required
        props={phoneProps}
        className={s.inputControl}
      />
      <InputControl
        label={`الإيميل`}
        required
        props={emailProps}
        className={s.inputControl}
      />
      <InputControl
        label={`العنوان التفصيلي`}
        placeholder="رقم المنزل واسم الشارع"
        required
        props={address1Props}
        className={s.inputControl}
      />
      <InputControl
        placeholder="رقم الشقة/الوحدة/علامة بارزة (اختياري لكن مهم)"
        props={address2Props}
        className={s.inputControl}
      />
      <InputControl
        label="المدينة"
        required
        props={cityProps}
        className={s.inputControl}
      />
      <SelectInput
        label="الولاية أو المحافظة"
        required
        options={STATES}
        props={stateProps}
        className={s.inputControl}
        placeholder=""
      />
    </div>
  );
}

export async function getStaticProps() {
  const websiteInfo = await getWebsiteInfo();

  return {
    props: {
      title: `${websiteInfo?.title} - سجل بياناتك لإتمام الطلب`,
    },
  };
}
