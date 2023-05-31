import { configureStore } from "@reduxjs/toolkit";
import csvPostReducer from "./Slices/csvPostSlice";

export const store = configureStore({
  reducer: {
    csvPost: csvPostReducer
  }
});