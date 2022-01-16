import { configureStore } from "@reduxjs/toolkit";
import SettingReducer from "./SettingSlice";

const rootReducer = {
  setting: SettingReducer,
};

export default configureStore({
  reducer: rootReducer,
});
