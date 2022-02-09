import { configureStore } from "@reduxjs/toolkit";
import SettingReducer from "./SettingSlice";
import AuthReducer from "./AuthSlice";
import UserReducer from "./UserSlice";

const rootReducer = {
  setting: SettingReducer,
  auth: AuthReducer,
  user: UserReducer,
};

export default configureStore({
  reducer: rootReducer,
});
