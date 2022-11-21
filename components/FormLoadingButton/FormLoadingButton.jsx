import s from "./FormLoadingButton.module.scss";

function FormLoadingButton({ loading, text, className }) {
  return (
    <button
      type="submit"
      className={`${s.button} ${className ? className : ""}`}
    >
      {loading ? <span className={s.loading}></span> : text}
    </button>
  );
}

export default FormLoadingButton;
