import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { ErrorMessage } from "@hookform/error-message";
import { RiCloseCircleFill } from "react-icons/ri";
import { actionUploadAvatar } from "../../../redux/actions/user/uploadAvatar.action";
import { defaultAvatar } from "../../../data/avatarsUrls";

const UploadAvatarForm = () => {
  const { userConnected, profile } = useSelector((state) => state.user);

  // Change avatar image class and url between current avatar and avatar preview
  const [avatarClass, setAvatarClass] = useState("customAvatar_img--opacity");
  const [previewAvatar, setPreviewAvatar] = useState(null);
  // display/hide icon delete preview avatar according to file
  const [iconDeletefile, setIconDeleteFile] = useState(false);
  // Manage errors and success request messages
  const [errRequestUploadAvatar, setErrRequestUploadAvatar] = useState(null);
  const [succesRequestUploadAvatar, setSuccesRequestUploadAvatar] =
    useState("");

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();

  // Update display when request upload succeed
  function uploadSuccess() {
    setPreviewAvatar(defaultAvatar);
    setErrRequestUploadAvatar(null);
    setSuccesRequestUploadAvatar("Custom avatar successfully uploaded");
    setAvatarClass("customAvatar_img--opacity");
    setIconDeleteFile(false);
    reset();
  }

  // Display errors when file isn't in good format or in good size
  function controlFileParams(file) {
    if (
      file.type !== "image/jpg" &&
      file.type !== "image/jpeg" &&
      file.type !== "image/png"
    ) {
      setErrRequestUploadAvatar("Formats accepted : .jpeg, . jpg, .png");
      return false;
    } else if (file.size > 500000) {
      setErrRequestUploadAvatar("Max size accepted : 500Ko");
      return false;
    } else {
      return true;
    }
  }

  // Handle submit event
  async function submitUploadAvatarForm(data) {
    setErrRequestUploadAvatar(null);
    setSuccesRequestUploadAvatar("");
    const fileParamsIsOk = controlFileParams(data.customAvatar[0]);
    if (fileParamsIsOk) {
      // Upload file request
      const fileData = new FormData();
      fileData.append("file", data.customAvatar[0]);
      const uploadAvatar = await actionUploadAvatar(
        dispatch,
        userConnected,
        fileData
      );
      uploadAvatar.error
        ? setErrRequestUploadAvatar(uploadAvatar.data)
        : uploadSuccess();
    }
  }

  // Update avatar preview display on input change
  function onChangeInputFile(e) {
    const file = e.target.files[0];
    setErrRequestUploadAvatar(null);
    setSuccesRequestUploadAvatar("");
    // Control file size and file format and update errors messages
    controlFileParams(file);
    setIconDeleteFile(true);
    setAvatarClass("customAvatar_img");
    setPreviewAvatar(URL.createObjectURL(file));
  }

  // Event on click for icon delete input upload
  function deleteFileAvatar(profile) {
    setErrRequestUploadAvatar(null);
    setSuccesRequestUploadAvatar("");
    setAvatarClass("customAvatar_img--opacity");
    setIconDeleteFile(false);
    setPreviewAvatar(defaultAvatar);
    reset();
  }

  // Charge current avatar display if user is connected
  useEffect(() => {
    if (userConnected) {
      setPreviewAvatar(defaultAvatar);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile]);

  return (
    <div className="editProfileContent_formContainer">
      <form
        className="editProfileContent_formContent editProfileContent_formContent--grey"
        onSubmit={handleSubmit(submitUploadAvatarForm)}
      >
        <legend>Customize avatar</legend>
        <span className="editProfileForm_notaBene"></span>

        <div className="customAvatar_preview">
          <picture>
            <img
              src={previewAvatar}
              alt="user avatar"
              className={avatarClass}
            />
          </picture>
          {iconDeletefile ? (
            <RiCloseCircleFill
              className={"customAvatar_cancel"}
              onClick={() => deleteFileAvatar(profile)}
            />
          ) : null}
        </div>

        <div className="editProfileForm_inputFieldContainer">
          <div className="editProfileForm_inputFieldContent">
            <label htmlFor="customAvatar">Upload file (max 500ko)</label>
            <input
              type="file"
              id="customAvatar"
              accept=".jpg, .jpeg, .png"
              className="editProfile_input"
              name="customAvatar"
              {...register("customAvatar", {
                onChange: (e) => {
                  onChangeInputFile(e);
                },
                required: {
                  value: true,
                  message: "This field is required",
                },
              })}
            />
          </div>
          <p className="errors-messages">
            <ErrorMessage errors={errors} name="customAvatar" />
          </p>
        </div>

        <div className="editProfile_submit">
          {errRequestUploadAvatar ? (
            <p className="errors-messages">{errRequestUploadAvatar}</p>
          ) : (
            <p className="success-messages">{succesRequestUploadAvatar}</p>
          )}
          <input type="submit" value={"OK"} />
        </div>
      </form>
    </div>
  );
};

export default UploadAvatarForm;
