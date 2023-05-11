import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { ErrorMessage } from "@hookform/error-message";
import { loginFormData } from "../../../data/logModaleData";
import { inputValidations } from "../../../utils/modalesForms.functions";
import { actionLoginUser } from "../../../redux/actions/user/loginUser.action";

const LoginForm = ({
  setIsOnLogin,
  errSubmitLogin,
  setErrSubmitLogin,
  setErrSubmitSignup,
  setSignupSuccess,
  onCloseModale,
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

  async function submitLoginForm(data) {
    const objToSend = {
      password: data.login_password,
      pseudo: data.login_pseudo,
    };
    const loginUser = await actionLoginUser(dispatch, objToSend);
    if (!loginUser.error) {
      onCloseModale();
    } else {
      console.log(loginUser.data);
      setErrSubmitLogin(loginUser.data);
    }
  }

  return (
    <div className="logModaleContent_container">
      <form
        className="logModaleContent_form"
        onSubmit={handleSubmit(submitLoginForm)}
      >
        {loginFormData.inputs.map((item, index) => (
          <div key={item.id + "-" + index} className="logModaleForm_field">
            <label htmlFor={item.id}>{item.label}</label>
            <input
              type={item.type}
              id={item.id}
              name={item.id}
              autoComplete="on"
              {...register(item.id, inputValidations(item.validation))}
            />
            <p className="errors-messages">
              <ErrorMessage errors={errors} name={item.id} />
            </p>
          </div>
        ))}
        <div>
          <p className="errors-messages">{errSubmitLogin}</p>
          <input type="submit" value={loginFormData.submit} />
        </div>
      </form>
      <p onClick={() => toogleForm()} className="logModaleContent_toggleForm">
        {loginFormData.link}
      </p>
    </div>
  );
};

export default LoginForm;
