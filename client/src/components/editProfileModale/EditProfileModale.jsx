import React from "react";
import { ModaleFullscreen } from "modale-fullscreen-customizable";
import { RiCloseCircleFill } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { actionLogoutUser } from "../../redux/actions/user/logoutUser.action";
import UpdateEmailForm from "./udpateEmailForm/UpdateEmailForm";
import UpdatePseudoForm from "./updatePseudoForm/UpdatePseudoForm";
import UpdatePasswordForm from "./updatePasswordForm/UpdatePasswordForm";
import UploadAvatarForm from "./uploadAvatarForm/UploadAvatarForm";
import DeleteAccount from "./deleteAccount/DeleteAccount";

const EditProfileModale = ({ setModaleDisplay }) => {
  const dispatch = useDispatch();

  async function logOutEvent() {
    const logout = await actionLogoutUser(dispatch);
    if (logout.error) {
      console.log(logout.data);
    } else {
      setModaleDisplay(false);
    }
  }

  function closeEditProfileModale() {
    setModaleDisplay(false);
  }

  return (
    <ModaleFullscreen
      eventOnClickIcon={() => closeEditProfileModale()}
      modaleContent={
        <div className="editProfileContent_container">
          <p onClick={logOutEvent} className="editProfileModaleContent_logout">
            Log out
          </p>
          <UploadAvatarForm />
          <UpdateEmailForm />
          <UpdatePseudoForm />
          <UpdatePasswordForm />
          <DeleteAccount />
        </div>
      }
      modaleTitle={"PROFILE"}
      modaleIcon={<RiCloseCircleFill className={""} />}
      idInnerContainer="editProfileModale_innerContainer"
      idModaleHeader="editProfileModale_header"
      idModaleTitle="editProfileModale_title"
      idModaleContent="editProfileModale_content"
      idModaleIcon="editProfileModale_icon"
    />
  );
};

export default EditProfileModale;
