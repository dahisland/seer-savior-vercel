export function inputValidations(reg) {
  switch (reg) {
    case "email":
      return {
        required: {
          value: true,
          message: "This field is required",
        },
        pattern: {
          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          message: "Wrong email format",
        },
        maxLength: {
          value: 55,
          message: "Max 55 characters",
        },
      };
    case "password":
      return {
        required: {
          value: true,
          message: "This field is required",
        },
        pattern: {
          value: /^([^\s]+)$/i,
          message: "Whitespaces not allowed",
        },
        minLength: {
          value: 6,
          message: "Min 6 characters",
        },
        maxLength: {
          value: 20,
          message: "Max 20 characters",
        },
      };
    case "pseudo":
      return {
        required: {
          value: true,
          message: "This field is required",
        },
        pattern: {
          value: /^([^\s]+)$/i,
          message: "Your pseudo can't contain whitespaces",
        },
        minLength: {
          value: 6,
          message: "Min 6 characters",
        },
        maxLength: {
          value: 20,
          message: "Max 20 characters",
        },
      };
    default:
      return {
        required: {
          value: true,
          message: "This field is required",
        },
      };
  }
}
