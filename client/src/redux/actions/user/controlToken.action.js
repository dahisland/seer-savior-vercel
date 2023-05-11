import axios from "axios";
import { baseApiURL, isConnectedEndpoint } from "../../../api/urls";
import { connexionStatus, requestParams } from "../../slices/user/user.slice";

export const actionControlToken = async (dispatch, userConnected) => {
  await axios(baseApiURL + isConnectedEndpoint, {
    withCredentials: true,
  })
    .then((res) => {
      const data = res.data;
      if (data.userId !== undefined && userConnected === null) {
        dispatch(connexionStatus({ userConnected: data.userId }));
        dispatch(
          requestParams({
            status: data.status,
            error: data.error ? data.error : null,
            message: data.message ? data.message : "",
          })
        );
        console.log("Token Ok, user connected recovered");
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
