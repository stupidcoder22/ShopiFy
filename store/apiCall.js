import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const STATUSES = Object.freeze({
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading",
});

const initial = {
  data: [],
  backupdata: [],
  heart: false,
  status: STATUSES.IDLE,
};

export const fetchProduct = createAsyncThunk("product/fetch", async () => {
  const response = await fetch("https://fakestoreapi.com/products/");
  const data = await response.json();
  return data;
});

const apiCall = createSlice({
  name: "products",
  initialState: initial,
  reducers: {
    setbyCategory: (state, actions) => {
      const cat = actions.payload.toLowerCase();
      if (cat === "all") {
        state.data = state.backupdata;
        return;
      }
      const filterdata = state.backupdata.filter((item) => {
        if (
          item.category.substring(0, 3) === cat.substring(0, 3).toLowerCase()
        ) {
          return item;
        }
      });
      state.data = filterdata;
    },

    favorite: (state, action) => {
      const newdata = action.payload;
      const modifieddata = state.data.map((item) => {
        if (item.id === newdata.id) return { ...item, heart: !item.heart };
        return item;
      });
      state.data = modifieddata;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProduct.pending, (state, actions) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(fetchProduct.fulfilled, (state, actions) => {
        const data = actions.payload;
        const modifieddata = data.map((item) => {
          return { ...item, heart: state.heart };
        });
        state.data = modifieddata;
        state.backupdata = modifieddata;
        state.status = STATUSES.IDLE;
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
      });
  },
});

export const { setbyCategory, favorite } = apiCall.actions;

export default apiCall.reducer;
