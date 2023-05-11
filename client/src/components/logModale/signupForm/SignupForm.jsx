import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { ErrorMessage } from "@hookform/error-message";
import { signupFormData } from "../../../data/logModaleData";
import { inputValidations } from "../../../utils/modalesForms.functions";
import { actionSignupUser } from "../../../redux/actions/user/signupUser.action";

const SignupForm = ({
  setIsOnLogin,
  errSubmitSignup,
  setErrSubmitSignup,
  setErrSubmitLogin,
  signupSuccess,
  setSignupSuccess,
}) => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();

  function toogleForm() {
    setErrSubmitLogin("");
    setErrSubmitSignup("");
    setSignupSuccess("");
    reset();
    setIsOnLogin();
  }

  async function submitSignupForm(data) {
    setErrSubmitLogin("");
    setSignupSuccess("");
    if (data.signup_password !== data.signup_verifyPassword) {
      setErrSubmitSignup(
        "Password verification must be equal to password chosen"
      );
    } else {
      const objToSend = {
        email: data.signup_email,
        password: data.signup_password,
        pseudo: data.signup_pseudo,
      };
      const createUser = await actionSignupUser(dispatch, objToSend);
      if (!createUser.error) {
        setErrSubmitSignup("");
        reset();
        setSignupSuccess(
          "Account successfully registered. Redirection to login form"
        );
        setTimeout(() => {
          toogleForm();
        }, 3000);
      } else {
        console.log(createUser.data);
        setErrSubmitSignup(createUser.data);
      }
    }
  }

  return (
    <div className="logModaleContent_container">
      <form
        className="logModaleContent_form"
        onSubmit={handleSubmit(submitSignupForm)}
      >
        {signupFormData.inputs.map((item, index) => (
          <div key={item.id + "-" + index} className="logModaleForm_field">
            <label htmlFor={item.id}>{item.label}</label>
            <input
              type={item.type}
              id={item.id}
              name={item.id}
              autoComplete="off"
              {...register(item.id, inputValidations(item.validation))}
            />
            <p className="errors-messages">
              <ErrorMessage errors={errors} name={item.id} />
            </p>
          </div>
        ))}
        <div>
          {errSubmitSignup !== "" ? (
            <p className="errors-messages">{errSubmitSignup}</p>
          ) : (
            <p className="success-messages">{signupSuccess}</p>
          )}

          <input type="submit" value={signupFormData.submit} />
        </div>
      </form>
      <p onClick={() => toogleForm()} className="logModaleContent_toggleForm">
        {signupFormData.link}
      </p>
    </div>
  );
};

export default SignupForm;
