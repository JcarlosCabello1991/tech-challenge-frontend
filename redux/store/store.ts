import { configureStore } from "@reduxjs/toolkit";
import { gifsAPI } from "../apis/gifsAPI";

export const store = configureStore({
  reducer:{
    [gifsAPI.reducerPath]:gifsAPI.reducer,
  },
  middleware: (getDefaultMiddleware) => 
  getDefaultMiddleware().concat(
    gifsAPI.middleware
  )
})

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
