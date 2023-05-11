import { updateAvatar, requestParams } from "../../slices/user/user.slice";
import { baseApiURL, uploadUserAvatarEndpoint } from "../../../api/urls";
import axios from "axios";

export const actionUploadAvatar = async (dispatch, userId, formData) => {
  try {
    let response = await axios.post(
      baseApiURL + uploadUserAvatarEndpoint + userId,
      formData,
      {
        withCredentials: true,
      }
    );
    const data = response.data;

    dispatch(updateAvatar({ picture: data.picture }));
    dispatch(
      requestParams({
        status: data.status,
        error: data.error ? data.error : null,
        message: data.message ? data.message : "",
      })
    );

    return { error: false, data: data };
  } catch (err) {
    if (err.response !== undefined && err.response.data.error !== undefined) {
      const errResponse = err.response.data;
      dispatch(
        requestParams({
          status: errResponse.status,
          error: errResponse.error,
          message: errResponse.error,
        })
      );
      console.log(err.response);
      return {
        error: true,
        data: errResponse.error,
      };
    } else if (
      err.response !== undefined &&
      err.response.data.error === undefined &&
      err.response.statusText !== undefined
    ) {
      const errResponse = err.response.data;
      dispatch(
        requestParams({
          status: errResponse.status,
          error: err.response.statusText,
          message: err.response.statusText,
        })
      );
      console.log(err.response);
      return {
        error: true,
        data: err.response.statusText,
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
