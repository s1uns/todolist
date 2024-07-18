import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Query } from "../../types/query/Query";
import { FILTER_ALL, SORT_CREATED_AT } from "../../utils/constants";
import { RootState } from "../store";

interface QueryState {
  currentFilter: number;
  searchQuery: string;
  sortBy: number;
  isAscending: boolean;
  selectedSharers: string[];
}

const initialState: QueryState = {
  currentFilter: FILTER_ALL,
  searchQuery: "",
  sortBy: SORT_CREATED_AT,
  isAscending: false,
  selectedSharers: []
};

const querySlice = createSlice({
  name: "query",
  initialState,
  reducers: {
    setFilterSuccess: (state, action: PayloadAction<number>) => {
      return {
        currentFilter: action.payload,
        searchQuery: state.searchQuery,
        sortBy: state.sortBy,
        isAscending: state.isAscending,
        selectedSharers: state.selectedSharers
      };
    },

    handleTodosSharerSuccess: (state, action: PayloadAction<string>) => {
      const newUserId = action.payload;

      const newSelectedUsersList =
        state.selectedSharers.indexOf(newUserId) > -1
          ? [...state.selectedSharers].filter((userId) => userId !== newUserId)
          : [newUserId, ...state.selectedSharers];

      return {
        currentFilter: state.currentFilter,
        searchQuery: state.searchQuery,
        sortBy: state.sortBy,
        isAscending: state.isAscending,
        selectedSharers: newSelectedUsersList
      };
    },

    setQuerySuccess: (state, action: PayloadAction<Query>) => {
      const { currenFilter, searchQuery } = action.payload;

      return {
        currentFilter: currenFilter,
        searchQuery: searchQuery,
        sortBy: state.sortBy,
        isAscending: state.isAscending,
        selectedSharers: state.selectedSharers
      };
    },

    setSearchQuerySuccess: (state, action: PayloadAction<string>) => {
      return {
        currentFilter: state.currentFilter,
        searchQuery: action.payload,
        sortBy: state.sortBy,
        isAscending: state.isAscending,
        selectedSharers: state.selectedSharers
      };
    },

    setSortingSuccess: (state, action: PayloadAction<number>) => {
      const sortingValue = action.payload;
      const shouldToggleOrder = sortingValue === state.sortBy;

      return {
        currentFilter: state.currentFilter,
        searchQuery: state.searchQuery,
        sortBy: sortingValue,
        isAscending: shouldToggleOrder ? !state.isAscending : true,
        selectedSharers: state.selectedSharers
      };
    }
  }
});

export const getCurrentFilter = (state: RootState) => state.query.currentFilter;
export const {
  setFilterSuccess,
  setSearchQuerySuccess,
  setQuerySuccess,
  handleTodosSharerSuccess,
  setSortingSuccess
} = querySlice.actions;
export default querySlice.reducer;
