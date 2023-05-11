import { resetProfile } from "../../slices/user/user.slice";
import Cookies from "js-cookie";

export const actionRemoveCookies = (dispatch) => {
  const removeCookie = (key) => {
    if (window !== "undefined") {
      Cookies.remove(key, { expires: 1 });
    }
  };
  removeCookie("jwt");
  dispatch(resetProfile());
};
