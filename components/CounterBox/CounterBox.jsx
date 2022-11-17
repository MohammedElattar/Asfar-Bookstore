import React, { useEffect, useState } from "react";
import styles from "./CounterBox.module.scss";
function CounterBox({ title, target }) {
  const [count, setCount] = useState(target);
  useEffect(() => {
    let interval = setInterval(() => {}, 200);
    return () => clearInterval(interval);
  });
  return (
    <div className={styles.box}>
      <h1 className={styles.number}>+{count}</h1>
      <h3 className={styles.title}>{title}</h3>
    </div>
  );
}

export default CounterBox;
