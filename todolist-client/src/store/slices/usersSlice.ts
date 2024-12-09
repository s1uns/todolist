import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { UpdateUserSharedStatus } from "../../types/user/UpdateUserSharedStatus";
import { UserInfo } from "../../types/user/UserInfo";
import { UsersCollection } from "../../types/user/UsersCollection";

interface UsersState {
  list: UserInfo[];
  currentPage: number;
  totalPages: number;
  searchQuery: string;
}

const initialState: UsersState = {
  list: [],
  currentPage: 1,
  totalPages: 1,
  searchQuery: ""
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsersSuccess: (state, action: PayloadAction<UsersCollection>) => {
      return {
        list: action.payload.list,
        totalPages: action.payload.totalPages,
        currentPage: state.currentPage,
        searchQuery: state.searchQuery
      };
    },

    updateUserSuccess: (
      state,
      action: PayloadAction<UpdateUserSharedStatus>
    ) => {
      const { id, sharedStatus } = action.payload;
      const newList = state.list.map((user) => {
        if (user.id === id) {
          return { ...user, isShared: sharedStatus };
        }

        return user;
      });

      return {
        list: newList,
        totalPages: state.totalPages,
        currentPage: state.currentPage,
        searchQuery: state.searchQuery
      };
    },

    setSearchQuerySuccess: (state, action: PayloadAction<string>) => ({
      list: state.list,
      totalPages: state.totalPages,
      currentPage: 1,
      searchQuery: action.payload
    }),

    setCurrentPageSuccess: (state, action: PayloadAction<number>) => ({
      list: state.list,
      totalPages: state.totalPages,
      currentPage: action.payload,
      searchQuery: state.searchQuery
    })
  }
});

export const {
  setUsersSuccess,
  updateUserSuccess,
  setSearchQuerySuccess,
  setCurrentPageSuccess
} = usersSlice.actions;
export default usersSlice.reducer;
