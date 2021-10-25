import { configureStore } from "@reduxjs/toolkit";
import myReducer from "./hotelState";

export const store = configureStore({
  reducer: { myReducer },
});
