import s from "./FormLoadingButton.module.scss";

function FormLoadingButton({ loading, text, className, ...props }) {
  return (
    <button
      type="submit"
      className={`${s.button} ${className ? className : ""}`}
      {...props}
    >
      {loading ? <span className={s.loading}></span> : text}
    </button>
  );
}

export default FormLoadingButton;
