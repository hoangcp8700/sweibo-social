import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuth: false,
  user: null,
  isLoading: false,
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    LOADING_AUTH(state, action) {
      state.isLoading = action.payload;
    },
    SUCCESS_AUTH(state, action) {
      state.isLoading = false;
      state.user = action.payload;
      state.isAuth = true;
    },
    LOGOUT(state) {
      state.isLoading = false;
      state.user = null;
      state.isAuth = false;
    },
  },
});

const { reducer, actions } = slice;

export const { LOADING_AUTH, SUCCESS_AUTH, LOGOUT } = actions;

export default reducer;
