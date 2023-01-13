import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../types";

interface UserState {
  user: IUser;
  isLoading: boolean;
  error: string;
}

const initialState: UserState = {
  user: {
    id: 1,
    name: "Vladimir",
    password: "",
    avatar: "avatars/5396784_ava.jpg",
  },
  isLoading: false,
  error: "",
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    changeUserInfo(state, action: PayloadAction<IUser>) {
      state.user.avatar = action.payload.avatar;
      state.user.name = action.payload.name;
    },
  },

  // extraReducers(builder) {
  // builder;
  // .addCase(fetchAllSortedItems.pending, (state) => {
  //   state.isLoading = true;
  // })
  // .addCase(
  //   fetchAllSortedItems.fulfilled,
  //   (state, action: PayloadAction<IShopItem[]>) => {
  //     state.isLoading = false;
  //     state.error = "";
  //     state.items = action.payload;
  //   }
  // )
  // .addCase(
  //   fetchAllSortedItems.rejected,
  //   (state, action: PayloadAction<any>) => {
  //     state.isLoading = false;
  //     state.error = action.payload;
  //   }
  // );
  // },
});

export const { changeUserInfo } = usersSlice.actions;

export default usersSlice.reducer;
