import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { actionDeleteUser } from "../../../redux/actions/user/deleteUser.action";
import { actionLogoutUser } from "../../../redux/actions/user/logoutUser.action";

const DeleteAccount = () => {
  const { userConnected } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [confirmDelete, setConfirmDelete] = useState(false);
  const [errRequestDeleteAccount, setErrRequestDeleteAccount] = useState(null);
  const [successRequestDeleteAccount, setSuccessRequestDeleteAccount] =
    useState("");

  // Update display when request update pseudo succeed
  async function deleteAccountSuccess(message) {
    setSuccessRequestDeleteAccount("Account successfully deleted");
    console.log(message);
    await actionLogoutUser(dispatch);
  }

  // Update display when request update pseudo failed
  function deleteAccountFail(message) {
    setErrRequestDeleteAccount(message);
    console.log("update logins request failed : " + message);
  }

  async function deleteAccount() {
    setErrRequestDeleteAccount(null);
    setSuccessRequestDeleteAccount("");
    const deleteUser = await actionDeleteUser(dispatch, userConnected);
    deleteUser.error
      ? deleteAccountFail(deleteUser.data)
      : deleteAccountSuccess(deleteUser.data.message);
    setConfirmDelete(false);
  }

  return (
    <div className="editProfileContent_deleteAccount">
      {confirmDelete ? (
        <div className={"editProfileContent_confirmDelete"}>
          <p>WARNING : This will permanently delete all data</p>
          <div className="confirmDelete_buttons">
            <button onClick={() => deleteAccount()}>Confirm delete ?</button>
            <button onClick={() => setConfirmDelete(false)}>Cancel</button>
          </div>
        </div>
      ) : (
        <div className="deleteAccount_text">
          <p onClick={() => setConfirmDelete(true)}>Delete account</p>
        </div>
      )}

      {errRequestDeleteAccount ? (
        <p className="errors-messages">{errRequestDeleteAccount}</p>
      ) : (
        <p className="success-messages">{successRequestDeleteAccount}</p>
      )}
    </div>
  );
};

export default DeleteAccount;
