import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Query } from "../../types/query/Query";
import { FILTER_ALL, SORT_CREATED_AT } from "../../utils/constants";
import { RootState } from "../store";

interface QueryState {
  currentFilter: number;
  currentPage: number;
  searchQuery: string;
  sortBy: number;
  isAscending: boolean;
}

const initialState: QueryState = {
  currentFilter: FILTER_ALL,
  currentPage: 1,
  searchQuery: "",
  sortBy: SORT_CREATED_AT,
  isAscending: false
};

const querySlice = createSlice({
  name: "query",
  initialState,
  reducers: {
    setFilterSuccess: (state, action: PayloadAction<number>) => {
      return {
        currentFilter: action.payload,
        currentPage: 1,
        searchQuery: state.searchQuery,
        sortBy: state.sortBy,
        isAscending: state.isAscending
      };
    },
    setQuerySuccess: (state, action: PayloadAction<Query>) => {
      const { currenFilter, currentPage, searchQuery } = action.payload;

      return {
        currentFilter: currenFilter,
        currentPage: currentPage,
        searchQuery: searchQuery,
        sortBy: state.sortBy,
        isAscending: state.isAscending
      };
    },
    setPageSuccess: (state, action: PayloadAction<number>) => {
      return {
        currentFilter: state.currentFilter,
        currentPage: action.payload,
        searchQuery: state.searchQuery,
        sortBy: state.sortBy,
        isAscending: state.isAscending
      };
    },
    setSearchQuerySuccess: (state, action: PayloadAction<string>) => {
      return {
        currentFilter: state.currentFilter,
        currentPage: 1,
        searchQuery: action.payload,
        sortBy: state.sortBy,
        isAscending: state.isAscending
      };
    },
    incrementPageSuccess: (state) => {
      return {
        currentFilter: state.currentFilter,
        currentPage: state.currentPage + 1,
        searchQuery: state.searchQuery,
        sortBy: state.sortBy,
        isAscending: state.isAscending
      };
    },
    setSortingSuccess: (state, action: PayloadAction<number>) => {
      const sortingValue = action.payload;
      const shouldToggleOrder = sortingValue === state.sortBy;

      return {
        currentFilter: state.currentFilter,
        currentPage: 1,
        searchQuery: state.searchQuery,
        sortBy: sortingValue,
        isAscending: shouldToggleOrder ? !state.isAscending : true
      };
    }
  }
});

export const getCurrentFilter = (state: RootState) => state.query.currentFilter;
export const {
  setFilterSuccess,
  setPageSuccess,
  incrementPageSuccess,
  setSearchQuerySuccess,
  setQuerySuccess,
  setSortingSuccess
} = querySlice.actions;
export default querySlice.reducer;
