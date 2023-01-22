import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../types";
import {
  fetchUserLogin,
  fetchUserMe,
  fetchUserNewPassword,
  fetchUserUpdateAvatar,
  fetchUserUpdateName,
} from "./actionUserCreators";

interface UserState {
  user: IUser;
  isLoading: boolean;
  error: string;
  isAuth: boolean;
  isAlertDialogOpen: boolean;
  alertDialogText: string;
}

const initialState: UserState = {
  user: { _id: "", name: "", avatar: "" },
  isLoading: false,
  error: "",
  isAuth: false,
  isAlertDialogOpen: false,
  alertDialogText: "",
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    defaultAvatarImage(state, action: PayloadAction<{ avatar: string }>) {
      state.user.avatar = action.payload.avatar;
    },
    authReset(state) {
      state.isAuth = false;
    },
  },

  extraReducers(builder) {
    builder
      .addCase(fetchUserLogin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUserLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = "";
        state.user = action.payload;
        state.isAuth = true;
      })
      .addCase(fetchUserLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message as string;
        state.isAuth = false;
      })

      .addCase(fetchUserMe.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUserMe.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = "";
        state.user = action.payload;
        state.isAuth = true;
      })
      .addCase(fetchUserMe.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message as string;
        state.isAuth = false;
      })

      .addCase(fetchUserUpdateName.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUserUpdateName.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = "";
        state.user.name = action.payload.name;
      })
      .addCase(fetchUserUpdateName.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message as string;
        // state.error = action.payload as string;
      })

      .addCase(fetchUserUpdateAvatar.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUserUpdateAvatar.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = "";
        state.user.avatar = action.payload.avatar;
      })
      .addCase(fetchUserUpdateAvatar.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message as string;
      })

      .addCase(fetchUserNewPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUserNewPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = "";
        // window.localStorage.removeItem("token");
        // state.isAuth = false;
      })
      .addCase(fetchUserNewPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message as string;
      });
  },
});

export const { defaultAvatarImage, authReset } = usersSlice.actions;

export default usersSlice.reducer;
