import {
  resetProfile,
  requestParams,
  connexionStatus,
} from "../../slices/user/user.slice";
import { baseApiURL, userEndpoint } from "../../../api/urls";
import axios from "axios";

export const actionDeleteUser = async (dispatch, userId) => {
  try {
    let response = await axios.delete(baseApiURL + userEndpoint + userId, {
      withCredentials: true,
    });
    const data = response.data;

    dispatch(resetProfile());
    dispatch(connexionStatus({ userConnected: null }));
    dispatch(
      requestParams({
        status: data.status,
        error: data.error ? data.error : null,
        message: data.message ? data.message : "",
      })
    );

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
