export const loginFormData = {
  submit: "Connect",
  link: "Not registered yet ? Click to become a Seer Savior",
  inputs: [
    {
      label: "Your Seer name",
      id: "login_pseudo",
      type: "text",
      placeholder: "",
      validation: "pseudo",
    },
    {
      label: "Password",
      id: "login_password",
      type: "password",
      placeholder: "",
      validation: "password",
    },
  ],
};

export const signupFormData = {
  submit: "Create account",
  link: "Already registered ? Click to connect",
  inputs: [
    {
      label: "Your email",
      id: "signup_email",
      type: "email",
      placeholder: "",
      validation: "email",
    },
    {
      label: "Choose your name id",
      id: "signup_pseudo",
      type: "text",
      placeholder: "",
      validation: "pseudo",
    },
    {
      label: "Choose a password",
      id: "signup_password",
      type: "password",
      placeholder: "",
      validation: "password",
    },
    {
      label: "Verify password",
      id: "signup_verifyPassword",
      type: "password",
      placeholder: "",
      validation: "password",
    },
  ],
};
