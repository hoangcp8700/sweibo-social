import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isShowSidebarLeft: true,
  isShowSidebarRight: true,
  darkMode: false,
};

const slice = createSlice({
  name: "setting",
  initialState,
  reducers: {
    HANDLE_SIDEBAR_LEFT(state, action) {
      state.isShowSidebarLeft = action.payload;
    },
    HANDLE_SIDEBAR_RIGHT(state, action) {
      state.isShowSidebarRight = action.payload;
    },
    HANDLE_DARK_MODE(state) {
      const newDarkMode = state.darkMode;
      state.darkMode = !newDarkMode;
    },
  },
});

const { reducer, actions } = slice;

export const { HANDLE_SIDEBAR_LEFT, HANDLE_SIDEBAR_RIGHT, HANDLE_DARK_MODE } =
  actions;

export default reducer;
