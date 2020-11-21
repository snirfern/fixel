import React, { useState } from "react";
import "./Main.css";
import Form from "../Form/Form";
import validations from "../../Validations/Validations";
import UserProfile from "../UserProfile/UserProfile";
import Toast from "../Toast/Toast";
import { useStore } from "../../Store/Store";
import { signUp, Login, confirmCode } from "../../Store/Actions";

import fixel_title from "../../fixel_title.png";
// screens: [signIn,login,profile,confirmationn]
export default function Main(props) {
  const { state, dispatch } = useStore();
  const [screen, setScreen] = useState("signIn");

  async function codeConfirmHandler(values) {
    dispatch({ type: "LOADING", payload: true });
    let handlerRes = await confirmCode(
      values.user_confirmaton_code,
      state.user.email,
      dispatch
    );
    if (handlerRes && handlerRes > 0) setScreen("profile");
  }
  async function loginHandler(values) {
    dispatch({ type: "LOADING", payload: true });
    let handlerRes = await Login(values, dispatch);
    if (handlerRes && handlerRes > 0) setScreen("profile");
    else if (handlerRes && handlerRes < -1) setScreen("confirmation");
    else if (handlerRes && handlerRes === -1)
      dispatch({
        type: "ERROR",
        payload: { type: "Auth error", msg: "Wrong details entered" },
      });
    dispatch({ type: "LOADING", payload: false });
  }
  async function signUpHandler(values) {
    dispatch({ type: "LOADING", payload: true });
    let handlerRes = await signUp(values, dispatch);
    if (handlerRes && handlerRes > 0) setScreen("confirmation");
  }
  return (
    <div className="container">
      <div className="auth_container">
        {screen && screen === "login" && (
          <Form
            onSubmit={(values) => loginHandler(values)}
            submitText="Login"
            footer="Create new account"
            onFooterHandler={() => {
              setScreen("signIn");
            }}
            formLogo={
              <img
                alt="authentication logo"
                className="authentication_logo"
                src={fixel_title}
              />
            }
            fields={{ email: "", password: "" }}
            elements={[
              {
                id: "email",
                type: "input",
                title: "Email",
                placeholder: "Email",
                customClass: "email",
                validate: (v) => validations.email(v.toString().toLowerCase()),
                errorMsg: "Email address is incorrect",
              },
              {
                id: "password",
                type: "input",
                title: "Password",
                placeholder: "password",
                customClass: "password",
                validate: (v) =>
                  validations.password(v.toString().toLowerCase()),
                errorMsg: "Password has to be above 6 letters",
              },
            ]}
          />
        )}
        {screen && screen === "signIn" && (
          <Form
            onSubmit={(values) => signUpHandler(values)}
            submitText="SignUp"
            footer="Already have account?"
            onFooterHandler={() => {
              setScreen("login");
            }}
            formLogo={
              <img
                alt="authlogo"
                className="authentication_logo"
                src={fixel_title}
              />
            }
            fields={{ email: "", full_name: "", password: "" }}
            elements={[
              {
                id: "full_name",
                type: "input",
                title: "Full Name",
                placeholder: "full name",
                customClass: "full_name",
                validate: (v) =>
                  validations.full_name(v.toString().toLowerCase()),
                errorMsg: "Full name has to be above 2 letters",
              },

              {
                id: "email",
                type: "input",
                title: "Email",
                placeholder: "Email",
                customClass: "email",
                validate: (v) => validations.email(v.toString().toLowerCase()),
                errorMsg: "Email address is incorrect",
              },
              {
                id: "password",
                type: "input",
                title: "Password",
                placeholder: "password",
                customClass: "password",
                validate: (v) =>
                  validations.password(v.toString().toLowerCase()),
                errorMsg: "Password has to be above 6 letters",
              },
            ]}
          />
        )}
        {screen && screen === "confirmation" && (
          <Form
            onSubmit={(values) => codeConfirmHandler(values)}
            submitText="Confirm"
            formTitle={"Please confirm email code"}
            fields={{ user_confirmaton_code: "" }}
            elements={[
              {
                id: "user_confirmaton_code",
                type: "input",
                title: "Confirmation code",
                placeholder: "code",
                customClass: "confirmation_code",
                validate: (v) => true,
                errorMsg: "Incorrect confirmation code typed :(",
              },
            ]}
          />
        )}
      </div>
      {screen && screen === "profile" && <UserProfile />}
      {state.globalError && state.globalError !== -1 && (
        <Toast error={state.globalError} />
      )}
    </div>
  );
}
