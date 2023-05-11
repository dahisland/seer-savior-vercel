import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { ErrorMessage } from "@hookform/error-message";
import { inputValidations } from "../../../utils/modalesForms.functions";
import { actionUpdateEmail } from "../../../redux/actions/user/updateEmail.action";

const UpdateEmailForm = () => {
  const { userConnected, profile } = useSelector((state) => state.user);
  const [errRequestEditEmail, setErrRequestEditEmail] = useState(null);
  const [succesRequestEditEmail, setSuccesRequestEditEmail] = useState("");

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();

  // Update display when request update pseudo succeed
  function updateEmailSuccess(message) {
    setSuccesRequestEditEmail("Email successfully updated");
    reset();
  }

  // Update display when request update pseudo failed
  function updateEmailFail(message) {
    setErrRequestEditEmail(message);
    console.log("update logins request failed : " + message);
  }

  async function submitUpdateEmailForm(data) {
    setErrRequestEditEmail(null);
    setSuccesRequestEditEmail("");
    const objToSend = {
      email: data.editProfile_email,
    };
    const updatePassword = await actionUpdateEmail(
      dispatch,
      userConnected,
      objToSend
    );
    updatePassword.error
      ? updateEmailFail(updatePassword.data)
      : updateEmailSuccess(updatePassword.data.message);
    reset();
  }

  return (
    <div className="editProfileContent_formContainer">
      <form
        className="editProfileContent_formContent editProfileContent_formContent--orange"
        onSubmit={handleSubmit(submitUpdateEmailForm)}
      >
        <legend>Update email</legend>
        <span className="editProfileForm_notaBene"></span>

        <div className="editProfileForm_inputFieldContainer">
          <div className="editProfileForm_inputFieldContent">
            <label htmlFor="editProfile_email">Change email</label>
            <input
              type="email"
              id="editProfile_email"
              className="editProfile_input"
              name="editProfile_email"
              placeholder={profile.email}
              autoComplete="off"
              {...register("editProfile_email", inputValidations("email"))}
            />
          </div>
          <p className="errors-messages">
            <ErrorMessage errors={errors} name="editProfile_email" />
          </p>
        </div>

        <div className="editProfile_submit">
          {errRequestEditEmail ? (
            <p className="errors-messages">{errRequestEditEmail}</p>
          ) : (
            <p className="success-messages">{succesRequestEditEmail}</p>
          )}
          <input type="submit" value={"OK"} />
        </div>
      </form>
    </div>
  );
};

export default UpdateEmailForm;
