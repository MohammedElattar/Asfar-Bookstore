import s from "./Box.module.scss";

function Box({ icon, title, value }) {
  return (
    <div className={s.box}>
      <div className={s.wrapper}>
        <h3 className={s.value}>{value}</h3>
        <p className={s.title}>{title}</p>
      </div>
      {icon}
    </div>
  );
}
export default Box;
