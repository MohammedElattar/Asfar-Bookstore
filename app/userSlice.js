import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
  },
  reducers: {
    setUser(state, action) {
      if (action.payload) {
        state.user = {
          name: action.payload?.displayName,
          uid: action.payload?.uid,
        };
      } else {
        state.user = null;
      }
    },
  },
});
