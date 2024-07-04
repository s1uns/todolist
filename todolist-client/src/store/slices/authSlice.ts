import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthResult } from "../../types/auth/AuthResult";
import { RootState } from "../store";

interface UserState {
  userId: string | null;
  email: string;
  fullName: string;
  username: string;
}

const initialState: UserState = {
  userId: "",
  email: "",
  fullName: "",
  username: ""
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    authUserSuccess: (state, action: PayloadAction<AuthResult>) => {
      return {
        userId: action.payload.userId,
        email: action.payload.email,
        fullName: action.payload.fullName,
        username: action.payload.username
      };
    },
    logoutUserSuccess: (state) => {
      return {
        userId: null,
        email: "",
        fullName: "",
        username: ""
      };
    }
  }
});

export const getUser = (state: RootState) => state.user;
export const { authUserSuccess, logoutUserSuccess } = userSlice.actions;
export default userSlice.reducer;
