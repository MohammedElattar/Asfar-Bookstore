import s from "./InputControl.module.scss";

function InputControl({
  props,
  label,
  required = false,
  placeholder = "",
  select,
  type = "text",
  onKeyUp = () => {},
  options,
  className = "",
  ...otherProps
}) {
  return (
    <div
      className={[s.inputControl, props.error ? s.error : "", className]
        .join(" ")
        .trim()}
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
          type={type}
          id="nameInput"
          onChange={props.onChange}
          value={props.value}
          placeholder={placeholder}
          style={{ fontSize: "18px" }}
          onKeyUp={onKeyUp}
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
