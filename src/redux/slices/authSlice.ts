import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

interface AuthState {
  user: { 
    id: string | null; 
    name: string | null; 
    email: string | null;
  };
  token: string | null;
}

const initialState: AuthState = {
  user: {
    id: null,
    name: null,
    email: null,
  },
  token: Cookies.get("token") || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userDetails: (state, action: PayloadAction<{ user: any; token: string }>) => {
      state.user.id = action.payload.user.userId;
      state.user.name = action.payload.user.userName;
      state.user.email = action.payload.user.userEmail;
      state.token = action.payload.token;
      Cookies.set("token", action.payload.token, { expires: 7 });
    },
    logout: (state) => {
      state.user.id = null;
      state.user.name = null;
      state.user.email = null;
      state.token = null;
      Cookies.remove("token");
    },
  },
});

export const { userDetails, logout } = authSlice.actions;
export default authSlice.reducer;
