import { fetchAllSortedItems } from "./actionsItemsCreators";
import { IShopItem } from "./../../types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ItemsState {
  items: IShopItem[];
  isLoading: boolean;
  error: string;
}

const initialState: ItemsState = {
  items: [{ id: 0, completed: false, title: "", comments: [] }],
  isLoading: false,
  error: "",
};

export const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    deleteItemArray(state, action: PayloadAction<IShopItem>) {
      state.items = state.items.filter((el) => el.id !== action.payload.id);
    },

    editItemArray(state, action: PayloadAction<IShopItem>) {
      state.items.map((el) => {
        if (el.id === action.payload.id) {
          el.completed = action.payload.completed;
          el.title = action.payload.title;
          el.comments = action.payload.comments;
        }
      });
    },

    addItemArray(state, action: PayloadAction<IShopItem>) {
      state.items.push(action.payload);
    },

    sortItemsArray(state) {
      state.items = state.items.sort((a, b) => {
        if (a.completed < b.completed) return -1;
        return 0;
      });
    },

  },

  extraReducers(builder) {
    builder
      .addCase(fetchAllSortedItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllSortedItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = "";
        state.items = action.payload;
      })
      .addCase(fetchAllSortedItems.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  deleteItemArray,
  sortItemsArray,
  editItemArray,
  addItemArray,
} = itemsSlice.actions;

export default itemsSlice.reducer;
