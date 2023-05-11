import { requestParams, connexionStatus } from "../../slices/user/user.slice";
import axios from "axios";
import { baseApiURL, loginEndpoint } from "../../../api/urls";

export const actionLoginUser = async (dispatch, objData) => {
  try {
    let response = await axios.post(baseApiURL + loginEndpoint, objData, {
      withCredentials: true,
    });
    const data = response.data;

    dispatch(
      connexionStatus({
        userConnected: data.userId ? data.userId : null,
      })
    );
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
