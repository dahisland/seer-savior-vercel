import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { ErrorMessage } from "@hookform/error-message";
import { inputValidations } from "../../../utils/modalesForms.functions";
import { actionUpdateLogins } from "../../../redux/actions/user/updateLogins.action";

const UpdatePseudoForm = () => {
  const { userConnected, profile } = useSelector((state) => state.user);
  const [errRequestEditPseudo, setErrRequestEditPseudo] = useState(null);
  const [succesRequestEditPseudo, setSuccesRequestEditPseudo] = useState("");

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();

  // Update display when request update pseudo succeed
  function updatePseudoSuccess(message) {
    setSuccesRequestEditPseudo("Pseudo updated. You will be disconnected");
    reset();
  }

  // Update display when request update pseudo failed
  function updatePseudoFail(message) {
    setErrRequestEditPseudo(message);
    console.log("update logins request failed : " + message);
  }

  // Submit request to update database
  async function submitUpdatePseudoForm(data) {
    setErrRequestEditPseudo(null);
    setSuccesRequestEditPseudo("");
    const objToSend = {
      pseudo: data.editProfile_pseudo,
    };
    const updatePassword = await actionUpdateLogins(
      dispatch,
      userConnected,
      objToSend
    );
    updatePassword.error
      ? updatePseudoFail(updatePassword.data)
      : updatePseudoSuccess(updatePassword.data.message);

    reset();
  }

  return (
    <div className="editProfileContent_formContainer">
      <form
        className="editProfileContent_formContent editProfileContent_formContent--grey"
        onSubmit={handleSubmit(submitUpdatePseudoForm)}
      >
        <legend>Update pseudo</legend>
        <span className="editProfileForm_notaBene">
          NB : You will be disconnected after updating
        </span>

        <div className="editProfileForm_inputFieldContainer">
          <div className="editProfileForm_inputFieldContent">
            <label htmlFor="editProfile_pseudo">Change pseudo</label>
            <input
              type="text"
              id="editProfile_pseudo"
              className="editProfile_input"
              name="editProfile_pseudo"
              placeholder={profile.pseudo}
              autoComplete="off"
              {...register("editProfile_pseudo", inputValidations("pseudo"))}
            />
          </div>
          <p className="errors-messages">
            <ErrorMessage errors={errors} name="editProfile_pseudo" />
          </p>
        </div>

        <div className="editProfile_submit">
          {errRequestEditPseudo ? (
            <p className="errors-messages">{errRequestEditPseudo}</p>
          ) : (
            <p className="success-messages">{succesRequestEditPseudo}</p>
          )}
          <input type="submit" value={"OK"} />
        </div>
      </form>
    </div>
  );
};

export default UpdatePseudoForm;
