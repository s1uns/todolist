import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TodosSharersCollection } from "../../types/user/TodosSharersCollection";
import { UserInfo } from "../../types/user/UserInfo";

interface SharersState {
  list: UserInfo[];
  totalUsers: number;
  searchQuery: string;
}

const initialState: SharersState = {
  list: [],
  totalUsers: 0,
  searchQuery: ""
};

const sharersSlice = createSlice({
  name: "sharers",
  initialState,
  reducers: {
    setSharersSuccess: (
      state,
      action: PayloadAction<TodosSharersCollection>
    ) => {
      const newList = action.payload.overwrite
        ? action.payload.list
        : [...state.list, ...action.payload.list];

      return {
        list: newList,
        totalUsers: action.payload.totalUsers,
        searchQuery: state.searchQuery
      };
    },

    deleteSharerSuccess: (state, action: PayloadAction<string>) => {
      const newList = state.list.filter((user) => user.id !== action.payload);

      return {
        list: newList,
        totalUsers: state.totalUsers - 1,
        searchQuery: state.searchQuery
      };
    },

    addSharerSuccess: (state, action: PayloadAction<UserInfo>) => {
      const newList = [...state.list, action.payload];

      return {
        list: newList,
        totalUsers: state.totalUsers + 1,
        searchQuery: state.searchQuery
      };
    },

    setSearchQuerySuccess: (state, action: PayloadAction<string>) => ({
      list: [],
      totalUsers: 0,
      searchQuery: action.payload
    })
  }
});

export const {
  setSharersSuccess,
  deleteSharerSuccess,
  setSearchQuerySuccess,
  addSharerSuccess
} = sharersSlice.actions;

export default sharersSlice.reducer;
