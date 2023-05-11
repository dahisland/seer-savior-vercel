import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { ErrorMessage } from "@hookform/error-message";
import { inputValidations } from "../../../utils/modalesForms.functions";
import { actionUpdateLogins } from "../../../redux/actions/user/updateLogins.action";

const UpdatePasswordForm = () => {
  const { userConnected } = useSelector((state) => state.user);

  const [errRequestEditPassword, setErrRequestEditPassword] = useState(null);
  const [succesRequestEditPassword, setSuccesRequestEditPassword] =
    useState("");
  const [errVerifyPassword, setErrVerifyPassword] = useState(null);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();

  // Update display when request update password succeed
  function updatePasswordSuccess(message) {
    setSuccesRequestEditPassword("Password updated. You will be disconnected");
    reset();
  }

  // Update display when request update password failed
  function updatePasswordFail(message) {
    setErrRequestEditPassword(message);
    console.log("update logins request failed : " + message);
  }

  // Verify if the 2 input passwords values are equals
  function verifyNewPassword(data) {
    if (data.editProfile_password !== data.editProfile_confirmPassword) {
      setErrVerifyPassword(
        "Password verification must be equal to password chosen"
      );
      return false;
    } else {
      return true;
    }
  }

  // Submit request to update database
  async function submitUpdatePasswordForm(data) {
    setErrRequestEditPassword(null);
    setSuccesRequestEditPassword("");
    const verifyPassword = verifyNewPassword(data);
    if (verifyPassword) {
      setErrVerifyPassword(null);
      const objToSend = {
        password: data.editProfile_password,
      };
      const updatePassword = await actionUpdateLogins(
        dispatch,
        userConnected,
        objToSend
      );
      updatePassword.error
        ? updatePasswordFail(updatePassword.data)
        : updatePasswordSuccess(updatePassword.data.message);
    }
  }

  return (
    <div className="editProfileContent_formContainer">
      <form
        className="editProfileContent_formContent editProfileContent_formContent--orange"
        onSubmit={handleSubmit(submitUpdatePasswordForm)}
      >
        <legend>Update password</legend>
        <span className="editProfileForm_notaBene">
          NB : You will be disconnected after updating
        </span>

        <div className="editProfileForm_inputFieldContainer">
          <div className="editProfileForm_inputFieldContent">
            <label htmlFor="editProfile_password">Change password</label>
            <input
              type="password"
              id="editProfile_password"
              className="editProfile_input"
              name="editProfile_password"
              placeholder={"******"}
              autoComplete="off"
              {...register(
                "editProfile_password",
                inputValidations("password")
              )}
            />
          </div>
          <p className="errors-messages">
            <ErrorMessage errors={errors} name="editProfile_password" />
          </p>
        </div>

        <div className="editProfileForm_inputFieldContainer">
          <div className="editProfileForm_inputFieldContent">
            <label htmlFor="editProfile_confirmPassword">
              Verify new password
            </label>
            <input
              type="password"
              id="editProfile_confirmPassword"
              className="editProfile_input--lighten"
              name="editProfile_confirmPassword"
              placeholder={"******"}
              autoComplete="off"
              {...register("editProfile_confirmPassword", {
                ...inputValidations("password"),
                onChange: () => {
                  setErrVerifyPassword(null);
                },
              })}
            />
          </div>
          <p className="errors-messages">
            {errVerifyPassword ? (
              errVerifyPassword
            ) : (
              <ErrorMessage
                errors={errors}
                name="editProfile_confirmPassword"
              />
            )}
          </p>
        </div>

        <div className="editProfile_submit">
          {errRequestEditPassword ? (
            <p className="errors-messages">{errRequestEditPassword}</p>
          ) : (
            <p className="success-messages">{succesRequestEditPassword}</p>
          )}
          <input type="submit" value={"OK"} />
        </div>
      </form>
    </div>
  );
};

export default UpdatePasswordForm;
