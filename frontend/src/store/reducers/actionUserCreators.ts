import { createAsyncThunk } from "@reduxjs/toolkit";
import { IAvatarServerResponse, IUser, IUserAvatar, IUserLogin, IUserLoginResponse, IUserName, IUserNewPassword } from "../../types";
import { clientDatabase } from "../axios";

export const fetchUserLogin = createAsyncThunk(
  "fetchUserLogin",
  async (authData: IUserLogin, thunkAPI) => {
    try {
      const response = await clientDatabase.post<IUserLoginResponse>("/auth/login", authData);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue("Login or password is incorrect");
    }
  }
);

export const fetchUserMe = createAsyncThunk(
  "fetchUserMe",
  async (_, thunkAPI) => {
    try {
      const response = await clientDatabase.get<IUser>("/auth/me");
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue("No access!");
    }
  }
);

export const fetchNewUserAvatar = createAsyncThunk(
  "fetchNewUserAvatar",
  async (data: FormData, thunkAPI) => {
    try {
      const response = await clientDatabase.post<IAvatarServerResponse>(
        "/avatars",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue("Error loading...");
    }
  }
);

export const delOldUserAvatar = createAsyncThunk(
  "delOldUserAvatar",
  async (oldUrl: string, thunkAPI) => {
    try {
      console.log(oldUrl);
      const response = await clientDatabase.delete<string>(
        `/avatars/${oldUrl}`
      );
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue("Error delete...");
    }
  }
);

export const fetchUserUpdateName = createAsyncThunk(
  "fetchUserUpdateName",
  async (userData: IUserName, thunkAPI) => {
    try {
      await clientDatabase.patch("/auth/update/name", userData);
      return userData;
    } catch (err) {
      return thunkAPI.rejectWithValue("Error update user name...");
    }
  }
);

export const fetchUserUpdateAvatar = createAsyncThunk(
  "fetchUserUpdateAvatar",
  async (userData: IUserAvatar, thunkAPI) => {
    try {
      await clientDatabase.patch("/auth/update/avatar", userData);
      return userData;
    } catch (err) {
      return thunkAPI.rejectWithValue("Error update user avatar...");
    }
  }
);


export const fetchUserNewPassword = createAsyncThunk(
  "fetchUserNewPassword",
  async (userData: IUserNewPassword, thunkAPI) => {
    try {
      await clientDatabase.patch("/auth/password", userData);
      return userData;
    } catch (err) {
      return thunkAPI.rejectWithValue("Error update password...");
    }
  }
);
