import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function useQueryInput(query) {
  const router = useRouter();
  const [checked, setChecked] = useState([]);

  const handleInputChange = (e, text) => {
    if (e.target.checked) {
      setChecked((s) => [...s, text]);
    } else {
      setChecked((s) => s.filter((e) => e !== text));
    }
  };

  useEffect(() => {
    if (checked.length) {
      router.push(
        {
          pathname: router.pathname,
          query: { ...router.query, [query]: checked.toString() },
        },
        undefined,
        { scroll: false }
      );
    } else {
      delete router.query[query];
      router.push(
        {
          pathname: router.pathname,
          query: { ...router.query },
        },
        undefined,
        { scroll: false }
      );
    }
  }, [checked.length]);

  return {
    handleInputChange,
  };
}

export default useQueryInput;
