import React, { useState } from "react";
import { ModaleFullscreen } from "modale-fullscreen-customizable";
import { RiCloseCircleFill } from "react-icons/ri";
import { loginFormData, signupFormData } from "../../data/logModaleData";
import { useForm } from "react-hook-form";
import LoginForm from "./loginForm/LoginForm";
import SignupForm from "./signupForm/SignupForm";

const LogModale = ({ setModaleDisplay }) => {
  const { reset } = useForm();
  const [isOnLogin, setIsOnLogin] = useState(true);
  const [signupSuccess, setSignupSuccess] = useState("");
  const [errSubmitLogin, setErrSubmitLogin] = useState("");
  const [errSubmitSignup, setErrSubmitSignup] = useState("");

  function onCloseModale() {
    setSignupSuccess("");
    setErrSubmitLogin("");
    setErrSubmitSignup("");
    reset();
    setModaleDisplay(false);
  }

  return (
    <ModaleFullscreen
      eventOnClickIcon={() => onCloseModale()}
      modaleContent={
        isOnLogin ? (
          <LoginForm
            logModaleData={loginFormData}
            setIsOnLogin={() => setIsOnLogin(!isOnLogin)}
            errSubmitLogin={errSubmitLogin}
            setErrSubmitLogin={setErrSubmitLogin}
            setErrSubmitSignup={setErrSubmitSignup}
            setSignupSuccess={setSignupSuccess}
            onCloseModale={onCloseModale}
          />
        ) : (
          <SignupForm
            logModaleData={signupFormData}
            setErrSubmitLogin={setErrSubmitLogin}
            setIsOnLogin={() => setIsOnLogin(!isOnLogin)}
            errSubmitSignup={errSubmitSignup}
            setErrSubmitSignup={setErrSubmitSignup}
            signupSuccess={signupSuccess}
            setSignupSuccess={setSignupSuccess}
          />
        )
      }
      modaleTitle={isOnLogin ? "LOGIN" : "SIGNUP"}
      modaleIcon={<RiCloseCircleFill className={""} />}
      idInnerContainer="logModale_innerContainer"
      idModaleHeader="logModale_header"
      idModaleTitle="logModale_title"
      idModaleContent="logModale_content"
      idModaleIcon="logModale_icon"
    />
  );
};

export default LogModale;
