import { configureStore, EnhancedStore } from "@reduxjs/toolkit";
import { AppState } from "react-native";
import { useDispatch } from "react-redux";
import { TypedUseSelectorHook, useSelector } from "react-redux";
// import authReducer from "./slices/auth";
import userReducer from "./slices/user";

export const store: EnhancedStore = configureStore({
  reducer: {
    // auth: authReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> =
  useSelector.withTypes<RootState>();
export const useAppDispatch: () => AppDispatch = () =>
  useDispatch<AppDispatch>();
