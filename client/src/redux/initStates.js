import { defaultAvatar } from "../data/avatarsUrls";

export const userInitState = {
  profile: {
    email: "",
    pseudo: "",
    picture: defaultAvatar,
    scores: [],
  },
  userConnected: null,
  status: null,
  error: null,
  message: "",
};
