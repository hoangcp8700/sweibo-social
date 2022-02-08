import { configureStore } from "@reduxjs/toolkit";
import SettingReducer from "./SettingSlice";
import AuthReducer from "./AuthSlice";

const rootReducer = {
  setting: SettingReducer,
  auth: AuthReducer,
};

export default configureStore({
  reducer: rootReducer,
});
