import { useEffect, useState } from "react";

function useInput(defaultValue = "") {
  const [props, setProps] = useState({
    error: false,
    helperText: "",
    value: defaultValue,

    onChange(e) {
      setProps((prevProps) => ({
        ...prevProps,
        value: e.target.value,
        error: false,
        helperText: "",
      }));
    },
  });

  useEffect(() => {
    setProps((e) => ({ ...e, setProps }));
  }, []);

  const setError = (error, helperText) => {
    if (!error) {
      setProps((prevProps) => ({ ...prevProps, error: false, helperText: "" }));
    } else {
      setProps((prevProps) => ({ ...prevProps, error: true, helperText }));
    }
  };

  return [props, setError, setProps];
}

export default useInput;
