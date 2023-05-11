import { createSlice } from "@reduxjs/toolkit";
import { userInitState } from "../../initStates";

export const userSlice = createSlice({
  name: "user",
  initialState: userInitState,
  reducers: {
    requestParams: (state, action) => {
      state.status = action.payload.status;
      state.error = action.payload.error;
      state.message = action.payload.message;
    },
    connexionStatus: (state, action) => {
      state.userConnected = action.payload.userConnected;
    },
    updateProfile: (state, action) => {
      state.profile = action.payload;
    },
    updateEmail: (state, action) => {
      state.profile.email = action.payload.email;
    },
    updateAvatar: (state, action) => {
      state.profile.picture = action.payload.picture;
    },
    updateScores: (state, action) => {
      state.profile.scores = action.payload;
    },
    resetProfile: (state, action) => {
      state.profile = userInitState.profile;
      state.userConnected = null;
    },
  },
});

export const {
  requestParams,
  connexionStatus,
  updateProfile,
  updateEmail,
  updateAvatar,
  updateScores,
  resetProfile,
} = userSlice.actions;
export default userSlice.reducer;
