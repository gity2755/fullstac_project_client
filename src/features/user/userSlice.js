import { createSlice } from "@reduxjs/toolkit";
const storedUser = JSON.parse(localStorage.getItem("currentUser"));

const initialState = {
  currentUser: storedUser||null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userIn: (state, action) => {
      state.currentUser = action.payload;
      localStorage.setItem("currentUser",JSON.stringify(state.currentUser))  
      let u = JSON.parse(localStorage.getItem("currentUser"));
    console.log("user in user slice :"+u);  },
    userOut: (state) => {
        state.currentUser = null;
        localStorage.removeItem("currentUser");
      },
  },
});

export const { userIn,userOut } = userSlice.actions;
export default userSlice.reducer;