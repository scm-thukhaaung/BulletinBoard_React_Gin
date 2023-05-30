import { configureStore } from "@reduxjs/toolkit";
import csvPostReducer from "../reducers/csvPostSlice";

export const store = configureStore({
  reducer: {
    csvPost: csvPostReducer
  }
});