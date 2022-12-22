import { useId } from "react";
import Select from "react-select";
import { cls } from "../../utils/utils";
import s from "./InputControl.module.scss";

export default function InputControl({
  props,
  label,
  required = false,
  placeholder = "",
  select,
  type = "text",
  onKeyUp = () => {},
  options,
  className = "",
  inputStyle = {},
  defaultValue = "",
  textarea = false,
  ...otherProps
}) {
  const id = useId();
  return (
    <div
      className={[s.inputControl, props.error ? s.error : "", className]
        .join(" ")
        .trim()}
      {...otherProps}
    >
      {!!label && (
        <label htmlFor={id}>
          {label}
          {required ? (
            <span style={{ color: "red", marginRight: "5px" }}>*</span>
          ) : (
            ""
          )}
        </label>
      )}
      {textarea ? (
        <textarea
          id={id}
          onChange={props.onChange}
          value={props.value}
          placeholder={placeholder}
          style={{ fontSize: "18px", ...inputStyle }}
          onKeyUp={onKeyUp}
        />
      ) : (
        <input
          type={type}
          id={id}
          onChange={props.onChange}
          value={props.value}
          placeholder={placeholder}
          style={{ fontSize: "18px", ...inputStyle }}
          onKeyUp={onKeyUp}
        />
      )}
      {props.error ? <p className={s.helperText}>{props.helperText}</p> : null}
    </div>
  );
}

export function SelectInput({
  options,
  label,
  props,
  placeholder,
  required,
  className,
  defaultValue,
  ...other
}) {
  const customStyles = {
    control: (styles) => {
      if (props.error) {
        styles.borderColor = "red";
      }
      return { ...styles, zIndex: "50" };
    },
    input: (styles) => ({ ...styles, height: "35px" }),
  };

  return (
    <div
      className={cls(
        s.inputControl,
        s.select,
        props.error ? s.error : "",
        className
      )}
      {...other}
    >
      {!!label && (
        <label>
          {label}
          {required ? (
            <span style={{ color: "red", marginRight: "5px" }}>*</span>
          ) : (
            ""
          )}
        </label>
      )}
      <Select
        options={options}
        isRtl
        placeholder={placeholder}
        className={s.select}
        onChange={(option) =>
          props.setProps((prev) => ({
            ...prev,
            error: false,
            helperText: "",
            value: option,
          }))
        }
        noOptionsMessage={() => "لا يوجد خيارات"}
        styles={customStyles}
        value={props.value}
      />
      {props.error ? <p className={s.helperText}>{props.helperText}</p> : null}
    </div>
  );
}
