import { useState } from "react";

function useInput() {
  const [props, setProps] = useState({
    error: false,
    helperText: "",
    value: "",
  });

  const changeHandler = (e) => {
    setProps((prevProps) => ({
      ...prevProps,
      value: e.target.value,
      error: false,
      helperText: "",
    }));
  };
  const setError = (error, helperText) => {
    if (!error) {
      setProps((prevProps) => ({ ...prevProps, error: false, helperText: "" }));
    } else {
      setProps((prevProps) => ({ ...prevProps, error: true, helperText }));
    }
  };

  return [props, changeHandler, setError];
}

export default useInput;
