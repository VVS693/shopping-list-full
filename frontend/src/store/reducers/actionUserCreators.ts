import { createAsyncThunk } from "@reduxjs/toolkit";
import { IAvatarServerResponse, IUser, IUserLogin, IUserLoginResponse, IUserNewPassword } from "../../types";
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
  "uploadUserAvatar",
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

export const fetchUserUpdate = createAsyncThunk(
  "fetchUserData",
  async (userData: IUser, thunkAPI) => {
    try {
      await clientDatabase.patch("/auth/update", userData);
      return userData;
    } catch (err) {
      return thunkAPI.rejectWithValue("Error update user data...");
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
