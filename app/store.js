import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./userSlice";

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["user/setUser"],
      },
    }),
});
export default store;
