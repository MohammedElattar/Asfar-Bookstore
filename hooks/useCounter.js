import { useEffect, useState } from "react";

function useCounter(target, time) {
  const [count, setCount] = useState(0);
  const [valid, setValid] = useState(false);

  useEffect(() => {
    const perSecond = target / (time / 1000);

    const interval = setInterval(() => {
      if (!valid) return;

      setCount((prev) => {
        if (prev < target) {
          return Math.round(prev + perSecond / 100);
        } else {
          clearInterval(interval);
          return target;
        }
      });
    }, 10);

    return () => clearInterval(interval);
  }, [valid, target, time]);

  return [count, valid, setValid];
}

export default useCounter;
