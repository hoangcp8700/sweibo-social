import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profile: null,
};

const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    SET_PROFILE(state, action) {
      state.profile = action.payload;
    },
  },
});

const { reducer, actions } = slice;

export const { SET_PROFILE } = actions;

export default reducer;
