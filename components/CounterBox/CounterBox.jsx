import React, { useEffect, useRef, useState } from "react";
import styles from "./CounterBox.module.scss";
import useCounter from '../../hooks/useCounter'
function CounterBox({ title, target }) {
  const [count, valid, setValid] = useCounter(target, 2000)
  const boxRef = useRef()

  useEffect(() => {

    const event = () => {
      if (valid) return
      const boxOffset = boxRef.current.offsetTop;
      const fullScrollY = window.scrollY + window.innerHeight;
      // console.log(`full scroll`, fullScrollY)
      // console.log('box top', boxOffset)
      if (boxOffset < fullScrollY) {
        setValid(true)
      }
    };

    window.document.addEventListener('scroll', event);

    return () => window.document.removeEventListener('scroll', event)

  }, [setValid, valid])

  console.log(`count`, count)

  return (
    <div className={styles.box} ref={boxRef}>
      <h1 className={styles.number}>+{count}</h1>
      <h3 className={styles.title}>{title}</h3>
    </div>
  );
}

export default CounterBox;
