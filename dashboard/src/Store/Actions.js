import axios from "../AxiosConfig/AxiosConfig";

export const confirmCode = async function (code, email, dispatch) {
  let url = "codeConfirm?user_confirmation_code=" + code + "&email=" + email;

  return new Promise((resolve) => {
    axios({
      method: "GET",
      url: url,
      json: true,
    })
      .then((res) => {
        if (res && res.data && res.data.success && res.data.success > 0) {
          resolve(1);
          dispatch({ type: "LOADING", payload: false });
        } else if (res && res.data && res.data.success < 0)
          dispatch({
            type: "ERROR",
            payload: { type: "Wrong data", msg: res.data.msg },
          });
        resolve(-1);
      })
      .catch((e) => {
        dispatch({
          type: "ERROR",
          payload: { type: "Some error occured", msg: e },
        });
        resolve(-1);
      });
  });
};
export const Login = async function (values, dispatch) {
  return new Promise((resolve) => {
    axios({
      method: "POST",
      url: "login",
      data: values,
    })
      .then(async (res) => {
        if (res && res.data && res.data.success) {
          dispatch({
            type: "LOGIN",
            payload: { email: values.email, ...res.data.data },
          });
          if (res.data && res.data.status && res.data.status > 0) {
            resolve(1);
          } else {
            dispatch({ type: "LOADING", payload: false });

            resolve(res.data.status);
          }
          return;
        }
        resolve(-1);
      })
      .catch((e) => {
        dispatch({ type: "ERROR", payload: e });
      });
  });
};

export const signUp = async function (values, dispatch) {
  return new Promise((resolve, reject) => {
    axios({
      method: "POST",
      url: "signUp",
      data: values,
      json: true,
    })
      .then((res) => {
        if (res && res.data && res.data.success && res.data.success > 0) {
          resolve(1);
          dispatch({ type: "SIGNUP", payload: values });
        }
      })
      .catch((e) => {
        dispatch({ type: "LOADING", payload: false });
        dispatch({ type: "ERROR", payload: e });
        reject(-1);
      });
  });
};

export const profileUpdate = async function (userUploadData, email, dispatch) {
  const formData = new FormData();
  if (userUploadData.file) formData.append("profile_img", userUploadData.file);
  if (userUploadData.bio) formData.append("profile_bio", userUploadData.bio);
  if (email) formData.append("userID", email);

  axios({
    method: "POST",
    url: "updateUserDetails",
    data: formData,
    json: true,
  })
    .then((res) => {
      dispatch({
        type: "UPDATE_USER_DATA",
        payload: {
          profile_img: userUploadData.file,
          profile_bio: userUploadData.bio,
        },
      });
    })
    .catch((e) => {
      dispatch({ type: "ERROR", payload: { type: e } });
    });
};
