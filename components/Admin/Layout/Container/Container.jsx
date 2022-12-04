import s from "./Container.module.scss";

function Container({ children }) {
  return <main className={s.container}>{children}</main>;
}
export default Container;
