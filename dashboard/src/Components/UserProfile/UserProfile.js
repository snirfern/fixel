import React, { useState } from "react";
import "./UserProfile.css";
import { useStore } from "../../Store/Store";
import { profileUpdate } from "../../Store/Actions";
import { Icon } from "react-icons-kit";
import CustomButton from "../CustomButton/CustomButton";
import { edit } from "react-icons-kit/feather/edit";

const defaultProfileImage =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6Q82WISxpWPp5dHBTWHypFOZbRTvc0ST0xQ&usqp=CAU";

export default function UserProfile(props) {
  const { state, dispatch } = useStore();
  const { user } = state;
  const [isEdit, setIsEdit] = useState(false);
  const [userUploadData, setUserUploadData] = useState({
    file: null,
    bio: null,
  });

  const isUploadReady =
    userUploadData.file === null && userUploadData.bio === null ? false : true;

  async function handleImageChange(e) {
    return new Promise((resolve) => {
      let reader = new FileReader();
      let file = userUploadData.file;

      reader.onloadend = () => {
        //dispatch({ type: "UPDATE_USER_DATA", payload: reader.result });
        setIsEdit(false);
        resolve(reader.result);
      };
      if (file) reader.readAsDataURL(file);
    });
  }
  async function handleProfileUpdate() {
    dispatch({ type: "LOADING", payload: true });
    if (userUploadData.bio === null) userUploadData.bio = state.user.bio;
    let base64Img = null;
    if (userUploadData.file) base64Img = await handleImageChange();

    profileUpdate(
      {
        ...userUploadData,
        file: base64Img ? base64Img : state.user.profile_img,
      },
      state.user.email,
      dispatch
    );
    setUserUploadData({ file: null, bio: null });
  }
  return (
    <div className="user_profile_container">
      {user && user.full_name && (
        <div className="user_welcome">
          <span className="user_profile_welcome">Welcome</span>&nbsp;
          <div className="user_profile_user_name">
            {user.full_name &&
              user.full_name.toString().substring(0, 1).toUpperCase() +
                user.full_name.toString().substring(1)}
          </div>
        </div>
      )}
      <div className="image_edit_icon">
        <Icon
          icon={edit}
          onClick={() => {
            if (isEdit) setUserUploadData({ file: null, bio: null });
            setIsEdit(!isEdit);
          }}
        />
      </div>
      <div>
        <div className="user_image_container">
          <img
            className="user_image"
            alt="user image"
            src={state.user.profile_img || defaultProfileImage}
          />
          <div className="file_upload">
            {isEdit && (
              <input
                type="file"
                onChange={(e) => {
                  let newFile = e.target.files;

                  if (
                    newFile.length > 0 &&
                    newFile[0].size &&
                    newFile[0].type.toString().indexOf("image") > -1
                  )
                    setUserUploadData({ ...userUploadData, file: newFile[0] });
                  else
                    dispatch({
                      type: "ERROR",
                      payload: {
                        type: "Incorrect file type",
                        msg: "Uploaded file is wrong. please reupload",
                      },
                    });
                }}
              />
            )}
          </div>
        </div>{" "}
        <div className="user_bio">
          {isEdit && (
            <textarea
              className="user_profile_text_area"
              onChange={(e) =>
                setUserUploadData({ ...userUploadData, bio: e.target.value })
              }
            >
              your bio here...
            </textarea>
          )}
          {!isEdit && (
            <div className="user_bio">
              {user && user.profile_bio && user.profile_bio}
            </div>
          )}
        </div>
      </div>
      <div className="custom_button_up">
        <CustomButton
          loading={state.loading}
          disabled={isUploadReady}
          text="Submit"
          onClick={() => {
            setIsEdit(false);
            handleProfileUpdate();
          }}
        />
      </div>
    </div>
  );
}
