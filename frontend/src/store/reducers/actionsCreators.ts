import { client, clientUser } from "./../../App";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { IAvatarServerResponse, IShopItem, IUser } from "../../types";

export const fetchAllSortedItems = createAsyncThunk(
  "items/fetchAll",
  async (_, thunkAPI) => {
    try {
      const response = await client.get<IShopItem[]>("");
      const dataSorted = response.data.sort((a, b) => {
        if (a.completed < b.completed) return -1;
        return 0;
      });
      return dataSorted;
    } catch (err) {
      return thunkAPI.rejectWithValue("Error loading...");
    }
  }
);

export const fetchDeleteItems = createAsyncThunk(
  "deleteItem",
  async (item: IShopItem, thunkAPI) => {
    try {
      await client.delete<IShopItem>(`/${item.id}`);
      return item;
    } catch (err) {
      return thunkAPI.rejectWithValue("Error delete...");
    }
  }
);

export const fetchEditItems = createAsyncThunk(
  "editItem",
  async (item: IShopItem, thunkAPI) => {
    try {
      await client.put<IShopItem>(`/${item.id}`, item);
      return item;
    } catch (err) {
      return thunkAPI.rejectWithValue("Error edit...");
    }
  }
);

export const fetchAddItems = createAsyncThunk(
  "addItem",
  async (item: IShopItem, thunkAPI) => {
    try {
      await client.post<IShopItem>("", item);
      return item;
    } catch (err) {
      return thunkAPI.rejectWithValue("Error add...");
    }
  }
);

export const fetchNewUserAvatar = createAsyncThunk(
  "uploadUserAvatar",
  async (data: FormData, thunkAPI) => {
    try {
      const response = await clientUser.post<IAvatarServerResponse>("", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue("Error loading...");
    }
  }
);
