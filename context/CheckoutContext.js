import { createContext, useContext, useEffect, useState } from "react";
import { useCartContext } from "./CartContext";
import useAlerts from "../hooks/useAlerts";
import useInput from "../hooks/useInput";
import { useAuthContext } from "./AuthContext";
import { apiHttp } from "../utils/utils";
import { isValid } from "email-regexp";
const Context = createContext();

export default function CheckoutProvider({ children }) {
  const { cart: products, cartLoading } = useCartContext();
  const { alerts, insertAlert } = useAlerts();
  const [textProps, setTextError, setTextProps] = useInput();
  const { user } = useAuthContext();
  const [firstNameProps, setFirstNameError, setFirstNameProps] = useInput();
  const [lastNameProps, setLastNameError, setLastNameProps] = useInput();
  const [phoneProps, setPhoneError, setPhoneProps] = useInput();
  const [emailProps, setEmailError, setEmailProps] = useInput(user?.email);
  const [address1Props, setAddress1Error, setAddress1Props] = useInput();
  const [address2Props, setAddress2Error, setAddress2Props] = useInput();
  const [cityProps, setCityError, setCityProps] = useInput();
  const [stateProps, setStateError, setStateProps] = useInput();
  const [loading, setLoading] = useState(false);
  const validateInputs = () => {
    let valid = true;
    if (!firstNameProps.value.trim()) {
      setFirstNameError(true, "الاسم غير صالح");
      valid = false;
    }
    if (!lastNameProps.value.trim()) {
      setLastNameError(true, "الاسم غير صالح");
      valid = false;
    }
    if (!isValid(emailProps.value)) {
      setEmailError(true, "البريد غير صالح");
      valid = false;
    }
    if (!cityProps.value.trim()) {
      setCityError(true, "المدينة غير صالح");
      valid = false;
    }
    if (!address1Props.value.trim()) {
      setAddress1Error(true, "العنوان غير صالح");
      valid = false;
    }
    if (!/^(\d{11}|(([+]{0,1})?(20)\d{10}))$/.test(phoneProps.value)) {
      setPhoneError(true, "رقم الهاتف غير صالح");
      valid = false;
    }

    return valid;
  };

  const handleConfirm = async () => {
    if (loading) return;
    if (!validateInputs()) {
      return;
    }

    const data = {
      first_name: firstNameProps.value,
      last_name: lastNameProps.value,
      email: emailProps.value,
      city: cityProps.value,
      address: `${address1Props.value} | ${address2Props.value}`,
      main_phone: phoneProps.value,
      more_info: textProps.value,
    };
    try {
      setLoading(true);
      const res = await apiHttp.post(process.env.NEXT_PUBLIC_CHECKOUT, data);
      console.log(`Checkout Response =>`, res);
    } catch (err) {
      console.log(`Checkout Error =>`, err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Context.Provider
      value={{
        alerts,
        insertAlert,
        products,
        textProps,
        setTextError,
        setTextProps,
        handleConfirm,
        firstNameProps,
        setFirstNameError,
        setFirstNameProps,
        lastNameProps,
        setLastNameError,
        setLastNameProps,
        phoneProps,
        setPhoneError,
        setPhoneProps,
        emailProps,
        setEmailError,
        setEmailProps,
        address1Props,
        setAddress1Error,
        setAddress1Props,
        address2Props,
        setAddress2Error,
        setAddress2Props,
        cityProps,
        setCityError,
        setCityProps,
        stateProps,
        setStateError,
        setStateProps,
        user,
        cartLoading,
        loading,
        setLoading,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export const useCheckoutContext = () => useContext(Context);
