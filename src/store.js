import { configureStore, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { URL } from "./components/App";

const loginInfo = createSlice({
  name: "LoginInformation",
  initialState: {
    user: {
      nickname: "",
    },
    class: [],
  },
  reducers: {
    updateUser: (state, action) => {
      return {
        ...state,
        user: action.payload,
      };
    },
    logout: (state) => {
      axios.get(URL + "auth/logout");
      return {
        ...state,
        user: { nickname: "" },
      };
    },
    updateClass: (state, action) => {
      return {
        ...state,
        class: action.payload,
      };
    },
  },
});

const store = configureStore({ reducer: loginInfo.reducer });
store.subscribe(() => console.log(store.getState()));
export const { login, logout, updateClass, updateUser } = loginInfo.actions;
export default store;
