import { useEffect, useState } from "react";

function useInput() {
  const [props, setProps] = useState({
    error: false,
    helperText: "",
    value: "",

    onChange(e) {
      setProps((prevProps) => ({
        ...prevProps,
        value: e.target.value,
        error: false,
        helperText: "",
      }));
    },
  });

  const setError = (error, helperText) => {
    if (!error) {
      setProps((prevProps) => ({ ...prevProps, error: false, helperText: "" }));
    } else {
      setProps((prevProps) => ({ ...prevProps, error: true, helperText }));
    }
  };

  return [props, setError];
}

export default useInput;
