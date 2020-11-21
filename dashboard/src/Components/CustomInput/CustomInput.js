import React from "react";
import "./CustomInput.css";
export default function CustomInput({
  keyProp,
  title,
  errorMsg,
  onChange,
  valueIn,
  icon,
}) {
  const [focus, setFocus] = React.useState(false);

  let borderStyle = "1px solid grey";
  if (
    valueIn &&
    valueIn.toString() &&
    valueIn.toString().length > 0 &&
    !errorMsg
  )
    borderStyle = "1px solid green";
  else if (valueIn.toString().length === 0) borderStyle = "1px solid grey";
  else borderStyle = "1px solid red";
  let inputHeaderClass = ["input_title"];
  if (focus) inputHeaderClass.push("activated_input_title");
  return (
    <div className="custom_input_container">
      <div className={inputHeaderClass.join(" ")}>{title && title}</div>
      <div
        className="custom_input_wrapper"
        style={{
          border:
            valueIn.toString().length > 0
              ? errorMsg
                ? "1px solid red"
                : "1px solid #8bc34a"
              : "1px solid grey",
        }}
      >
        <input
          key={keyProp}
          onFocus={() => setFocus(true)}
          value={valueIn ? valueIn : ""}
          onChange={(e) => {
            if (onChange) onChange(e.target.value);
          }}
        />
        <span
          className="custom_input_icon"
          style={{
            transform: errorMsg ? "rotate(45deg)" : "rotate(0deg)",
            color:
              valueIn.toString().length > 0
                ? errorMsg
                  ? "red"
                  : "#4caf50bf"
                : "#2196f3",
          }}
        >
          {icon && icon}
        </span>
      </div>
      {<div className="form_errorMsg">{errorMsg}</div>}
    </div>
  );
}
