import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

interface AuthState {
  user: { 
    id: string | null; 
    name: string | null; 
    email: string | null;
  };
}

const initialState: AuthState = {
  user: {
    id: null,
    name: null,
    email: null,
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userDetails: (state, action: PayloadAction<{ userId: string; userEmail: string; userName: string }>) => {
      state.user.id = action.payload.userId;
      state.user.name = action.payload.userName;
      state.user.email = action.payload.userEmail;
    },
    logout: (state) => {
      state.user.id = null;
      state.user.name = null;
      state.user.email = null;
      Cookies.remove("token");
    },
  },
});

export const { userDetails, logout } = authSlice.actions;
export default authSlice.reducer;
