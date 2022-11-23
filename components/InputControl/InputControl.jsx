import s from "./InputControl.module.scss";

function InputControl({
  props,
  label,
  required = false,
  placeholder = "",
  select,
  options,
  ...otherProps
}) {
  return (
    <div
      className={`${s.inputControl} ${props.error ? s.error : ""}`}
      {...otherProps}
    >
      {!!label && (
        <label htmlFor="nameInput">
          {label}
          {required ? (
            <span style={{ color: "red", marginRight: "5px" }}>*</span>
          ) : (
            ""
          )}
        </label>
      )}
      {!select ? (
        <input
          type="text"
          id="nameInput"
          onChange={props.onChange}
          value={props.value}
          placeholder={placeholder}
        />
      ) : (
        <select value={props.value} onChange={props.onChange}>
          {options?.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      )}
      {props.error ? <p className={s.helperText}>{props.helperText}</p> : null}
    </div>
  );
}

export default InputControl;
