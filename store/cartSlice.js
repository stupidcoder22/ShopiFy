import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
    amount: 1,
    total: 0,
    modal: false,
    quantity: 0,
  },
  reducers: {
    cartAdded: (state, action) => {
      const data = action.payload;
      const value = state.cart.find((item) => item.id === data.id);

      if (value) {
        const newcart = state.cart.map((item) => {
          if (item.id === data.id) {
            return { ...item, amount: item.amount + 1 };
          }
          return item;
        });
        state.cart = newcart;
      } else {
        state.cart = [
          ...state.cart,
          { ...action.payload, flag: state.flag, amount: state.amount },
        ];
      }
    },

    deleteItem: (state, action) => {
      const newdata = state.cart.filter(
        (item) => item.id !== action.payload.id
      );
      state.cart = newdata;
    },

    minusAmount: (state, action) => {
      const data = action.payload;
      const newcart = state.cart.map((item) => {
        if (item.id === data.id) {
          return { ...item, amount: item.amount - 1 };
        }
        return item;
      });
      state.cart = newcart;
    },

    totalAmount: (state) => {
      let all = state.cart.reduce((total, curr) => {
        total = total + curr.price * curr.amount;
        return total;
      }, 0);
      all = parseFloat(all).toFixed(2);
      state.total = all;
    },

    setModal: (state, action) => {
      state.modal = action.payload;
    },

    totalQuantity: (state) => {
      let all = state.cart.reduce((total, curr) => {
        total = total + curr.amount;
        return total;
      }, 0);
      state.quantity = all;
    },

    setModal: (state, action) => {
      state.modal = action.payload;
    },
  },
});

export const {
  cartAdded,
  minusAmount,
  deleteItem,
  totalAmount,
  setModal,
  totalQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;
