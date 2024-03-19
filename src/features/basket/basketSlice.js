import { createSlice } from "@reduxjs/toolkit";

// let storedBasket = JSON.parse(localStorage.getItem("basketArr"));
// let storedBasketToOrder = JSON.parse(localStorage.getItem("basketToOrder"));
// console.log("storedBasket  " + storedBasket);
let initialState = {
  basketArr: [],
  basketToOrder: [],
  sumAllOrder: 0,
  countOfProductsToOrder: 0,
  countOfProducts: 0,
};

let basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addToBasket: (state, action) => {
      console.log("action " + action.payload._id);
      let itemIndex = state.basketArr.findIndex((it) => it._id === action.payload._id);
      if (itemIndex === -1) {
        state.basketArr.push({ ...action.payload, qty: 1 });
      } else {
        state.basketArr[itemIndex].qty += 1;
        let ifChecked = state.basketToOrder.find((it) => it._id === action.payload._id);
        if (ifChecked) {
          state.sumAllOrder += action.payload.price;
          state.countOfProductsToOrder += 1;
        }
      }

      state.countOfProducts += 1;
      console.log("basket array " + state.basketArr);
      localStorage.setItem("basketArr", JSON.stringify(state.basketArr));
      localStorage.setItem("basketToOrder", JSON.stringify(state.basketToOrder));

      console.log("basketArr in slice " + state.basketArr[0]);
    },

    deleteFromBasket: (state, action) => {
      console.log("action.payload._id from delete in reducer : " + action.payload._id);
      state.basketArr = state.basketArr.filter((item) => item._id !== action.payload._id);
      state.countOfProducts -= 1;
      let ifChecked = state.basketToOrder.find((it) => it._id === action.payload._id);
      if (ifChecked) {
        state.sumAllOrder -= action.payload.price * action.payload.qty;
        state.countOfProductsToOrder -= action.payload.qty;
      }
      localStorage.setItem("basketArr", JSON.stringify(state.basketArr));
      localStorage.setItem("basketToOrder", JSON.stringify(state.basketToOrder));
    },

    decreaseItem: (state, action) => {
      if (action.payload.qty > 1) {
        let itemIndex = state.basketArr.findIndex((item) => item._id === action.payload._id);
        state.basketArr[itemIndex].qty -= 1;
      } else {
        state.basketArr = state.basketArr.filter((item) => item._id !== action.payload._id);
      }
      let ifChecked = state.basketToOrder.find((it) => it._id === action.payload._id);
      if (ifChecked) {
        state.sumAllOrder -= action.payload.price;
      }
      state.countOfProducts--;
      localStorage.setItem("basketArr", JSON.stringify(state.basketArr));
      localStorage.setItem("basketToOrder", JSON.stringify(state.basketToOrder));
    },

    addToOrder: (state, action) => {
      const { _id, name, qty } = action.payload;
      state.basketToOrder.push({ _id, name, qty });
      state.sumAllOrder += action.payload.price * qty;
      state.countOfProductsToOrder += qty;
      localStorage.setItem("basketArr", JSON.stringify(state.basketArr));
      localStorage.setItem("basketToOrder", JSON.stringify(state.basketToOrder));
    },

    cancleToOrder: (state, action) => {
      state.basketToOrder = state.basketToOrder.filter((item) => item._id !== action.payload._id);
      state.sumAllOrder -= action.payload.price * action.payload.qty;
      state.countOfProductsToOrder -= action.payload.qty;
      localStorage.setItem("basketArr", JSON.stringify(state.basketArr));
      localStorage.setItem("basketToOrder", JSON.stringify(state.basketToOrder));
    },
    pushToBasket: (state, action) => {
      state.basketArr = action.payload;

    },
    pushToBasketToOrder: (state, action) => {
      state.basketToOrder = action.payload;

    },

  }


})

export const {
  addToBasket,
  deleteFromBasket,
  decreaseItem,
  addToOrder,
  okToOrder,
  cancleToOrder,
  pushToBasket,
  pushToBasketToOrder
} = basketSlice.actions;
export default basketSlice.reducer;
