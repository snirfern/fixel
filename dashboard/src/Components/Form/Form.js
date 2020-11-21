import React, { useState } from "react";
import "./Form.css";
import CustomInput from "../CustomInput/CustomInput";
import CustomButton from "../CustomButton/CustomButton";
import { useStore } from "../../Store/Store";
function validate(elements, values) {
  let errors = {};
  if (elements)
    elements.forEach((cI) => {
      if (values[cI.id] && !cI.validate(values[cI.id])) {
        errors[cI.id] = cI.errorMsg;
      }
    });

  return errors;
}
export default function Form({
  elements,
  fields,
  formTitle,
  formLogo,
  submitText,
  onSubmit,
  footer,
  onFooterHandler,
}) {
  const { state, dispatch } = useStore();
  const [values, setValues] = useState(fields);
  const errors = validate(elements, values);
  const isValidForm =
    Object.keys(errors).length === 0 &&
    Object.keys(values).every((v) => values[v].toString() !== "");

  let markUp =
    !elements || elements.length === 0
      ? []
      : elements.map((cF, i) => {
          if (cF.type && cF.type === "input")
            return (
              <div className="form_input" key={"form_input_" + i}>
                <CustomInput
                  keyProp={"custom_input_" + i}
                  title={cF.title || ""}
                  onChange={(v) => {
                    setValues({ ...values, [cF.id]: v });
                  }}
                  valueIn={values && values[cF.id] ? values[cF.id] : ""}
                  errorMsg={
                    values[cF.id] &&
                    values[cF.id].length > 0 &&
                    errors[cF.id] !== undefined &&
                    errors[cF.id]
                  }
                  icon={cF.icon}
                />{" "}
                <br />
              </div>
            );
          else return null;
        });

  return (
    <form>
      <div className={!isValidForm ? "form_logo" : "form_logo_rotate"}>
        {formLogo}
      </div>
      <h1 className="form_title">{formTitle}</h1>
      <br />
      {markUp}
      <br />
      <div className="submit_button">
        <CustomButton
          loading={state.loading}
          onClick={() => {
            if (onSubmit) onSubmit(values, dispatch);
          }}
          disabled={isValidForm}
          text={submitText || "Submit"}
        />
      </div>
      {footer && (
        <div
          onClick={() => {
            if (onFooterHandler) onFooterHandler();
          }}
          className="form_footer"
        >
          {footer}
        </div>
      )}
    </form>
  );
}
