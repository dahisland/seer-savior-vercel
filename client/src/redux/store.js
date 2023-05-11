import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import userReducer from "./slices/user/user.slice";

/**
 * Configuration for redux persist store
 */
const persistConfig = {
  key: "root",
  storage: storage,
};

/**
 * combine all the reducers implemented in the store
 */
export const rootReducers = combineReducers({
  user: userReducer,
});

/**
 * Link the reducers to the redux persist store
 */
const persistedReducer = persistReducer(persistConfig, rootReducers);

/**
 * Configuration redux store
 */
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export default store;
