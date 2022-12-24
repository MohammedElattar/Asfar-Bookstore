import { cls, getWebsiteInfo } from "../utils/utils";
import s from "../styles/checkout.module.scss";
import Message from "../components/Message";
import InputControl, {
  SelectInput,
} from "../components/InputControl/InputControl";
import CheckoutProvider, {
  useCheckoutContext,
} from "../context/CheckoutContext";
import FormLoadingButton from "../components/FormLoadingButton/FormLoadingButton";
import Loading from "../components/Loading";
import Router from "next/router";
export default function Checkout() {
  return (
    <CheckoutProvider>
      <WaitLoading>
        <main className={s.main}>
          <h2 className={"title fs-1 no-line"}>سجل بياناتك لإتمام الطلب</h2>
          <div className="container">
            <div className="row m-0">
              <div className="col-12 col-md-7 p-0 ps-0 ps-md-1 mb-2 mb-md-0 d-flex flex-column gap-2">
                <Form />
                <AdditionalInfo />
              </div>
              <div className="col-12 col-md-5 p-0 pe-0 pe-md-1 d-flex flex-column gap-2">
                <Info />
                <ConfirmOrder />
              </div>
            </div>
          </div>
        </main>
      </WaitLoading>
    </CheckoutProvider>
  );
}

function WaitLoading({ children }) {
  const { cartLoading, products } = useCheckoutContext();

  const loadingJSX = (
    <main className={s.main}>
      <div className="d-flex justify-content-center">
        <Loading size={60} borderWidth="5px" />
      </div>
    </main>
  );

  if (cartLoading) {
    return loadingJSX;
  } else if (products.length === 0 && !cartLoading) {
    Router.push(`/products/1`);
    return loadingJSX;
  } else if (!cartLoading && products.length > 0) {
    return children;
  }
}

function AdditionalInfo() {
  const { textProps } = useCheckoutContext();
  return (
    <div className={cls(s.wrapper, s.additionalInfo)}>
      <h3>معلومات إضافية</h3>
      <InputControl
        props={textProps}
        label="ملاحظات الطلب (اختياري)"
        placeholder="ملاحظات خاصة تود إبلاغنا بها إن شئت."
        textarea
      />
    </div>
  );
}

function ConfirmOrder() {
  const { handleConfirm, loading, error } = useCheckoutContext();
  return (
    <div className={cls(s.wrapper, s.confirmOrder)}>
      <div className={s.payOption}>
        <label htmlFor="pay1">الدفع نقدًا عند الاستلام</label>
        <input type="radio" name="payment" required defaultChecked id="pay1" />
      </div>
      {error ? <p className={s.error}>{error}</p> : null}
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
  const total = Math.round(
    products.map((e) => e.price * e.qty).reduce((a, b) => a + b, 0)
  );
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
    STATES,
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
