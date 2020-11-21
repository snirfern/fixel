import React from "react";
import "./CustomButton.css";
import Spinner from "../Spinner/Spinner";
export default function CustomButton({
  loading,
  iconName,
  customStyle,
  text,
  disabled,
  onClick,
}) {
  return (
    <div
      onClick={() => {
        //if (!disabled) {
        if (onClick) onClick();
        // }
      }}
      style={{
        backgroundColor: disabled ? "#4caf50" : "grey",
      }}
      className={"custom_button"}
    >
      {!loading && text}
      {loading && <Spinner color="green" />}
    </div>
  );
}
