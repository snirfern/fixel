import React, { useEffect } from "react";
import "./Toast.css";
import { useStore } from "../../Store/Store";

export default function Toast() {
  const { state, dispatch } = useStore();
  const { globalError } = state;
  useEffect(() => {
    setTimeout(() => {
      dispatch({ type: "ERROR", payload: -1 });
    }, 5000);
  }, [dispatch]);
  return (
    <div className="toast_container">
      <div className="toast_error_type">
        {globalError && globalError.type && globalError.type}
      </div>
      <div className="toast_error_text">
        {globalError && globalError.msg && globalError.msg}
      </div>
    </div>
  );
}
