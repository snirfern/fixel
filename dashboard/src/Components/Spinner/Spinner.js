import React from "react";
import "./Spinner.css";
export default function Spinner({ heightPrm, widthPrm, borderTopPrm, color }) {
  return (
    <div
      className="loader"
      style={{
        color: color ? color : "red",
        height: heightPrm ? heightPrm : 15,
        width: widthPrm ? widthPrm : 15,
        borderTop: borderTopPrm ? borderTopPrm : "2px solid #edeff0",
      }}
    />
  );
}
