import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../context/user";

export const store = configureStore({
    reducer:{
      user: userReducer,
    },
  });