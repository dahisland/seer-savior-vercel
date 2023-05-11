import { requestParams } from "../../slices/user/user.slice";
import axios from "axios";
import { baseApiURL, logoutEndpoint } from "../../../api/urls";
import { actionRemoveCookies } from "./removeCookies.action";

export const actionLogoutUser = async (dispatch) => {
  try {
    let response = await axios.get(baseApiURL + logoutEndpoint, {
      withCredentials: true,
    });
    const data = response.data;

    dispatch(
      requestParams({
        status: data.status,
        error: data.error ? data.error : null,
        message: data.message ? data.message : "",
      })
    );
    actionRemoveCookies(dispatch);
    window.location = "/";

    return { error: false, data: data };
  } catch (err) {
    if (err.response !== undefined) {
      const errResponse = err.response.data;
      dispatch(
        requestParams({
          status: errResponse.status,
          error: errResponse.error,
          message: err.message,
        })
      );
      console.log(err.response);
      return {
        error: true,
        data: errResponse.error,
      };
    } else {
      dispatch(
        requestParams({
          status: err.code,
          error: err.message,
          message: err.message,
        })
      );
      console.log(err);
      return {
        error: true,
        data: err.message,
      };
    }
  }
};
