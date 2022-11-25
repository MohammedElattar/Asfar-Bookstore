import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "productsPage",
  initialState: {
    searchText: "",
  },
  reducers: {
    changeSearchText(state, action) {
      if (action.payload.trim()) {
        state.searchText = action.payload;
      } else {
        state.searchText = "";
      }
    },
  },
});
