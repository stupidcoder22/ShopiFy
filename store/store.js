import { configureStore } from "@reduxjs/toolkit";
import apiCall from "./apiCall";
import cartSlice from "./cartSlice";

const store = configureStore({
  reducer: {
    cartStore: cartSlice,
    api: apiCall,
  },
});

export default store;
