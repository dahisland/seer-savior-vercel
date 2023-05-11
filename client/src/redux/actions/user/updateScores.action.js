import { updateScores, requestParams } from "../../slices/user/user.slice";
import {
  baseApiURL,
  addUserScoreEndpoint,
  updateUserScoreEndpoint,
} from "../../../api/urls";
import axios from "axios";

export const actionUpdateScores = async (
  dispatch,
  userId,
  userData,
  objScore
) => {
  const verifyDataToUpdate = userData.scores.find(
    (item) => item.level === objScore.level
  );

  if (verifyDataToUpdate === undefined) {
    try {
      let response = await axios.patch(
        baseApiURL + addUserScoreEndpoint + userId,
        objScore,
        {
          withCredentials: true,
        }
      );
      const data = response.data;

      dispatch(updateScores(data.scores));
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
  } else if (
    verifyDataToUpdate !== undefined &&
    verifyDataToUpdate.score < objScore.score
  ) {
    try {
      let response = await axios.patch(
        baseApiURL + updateUserScoreEndpoint + userId,
        objScore,
        {
          withCredentials: true,
        }
      );
      const data = response.data;

      dispatch(updateScores(data.scores));
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
  } else {
    return { error: false, data: "Nothing to update" };
  }
};
