import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { doneSlice } from "../slice/done";
import { todoSlice } from "../slice/todo";

export const store = configureStore({
  reducer: combineReducers({
    done: doneSlice.reducer,
    todo: todoSlice.reducer,
  }),
});

export type StoreDispatch = typeof store.dispatch;
export type StoreState = ReturnType<typeof store.getState>;
