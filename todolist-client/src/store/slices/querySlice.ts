import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Query } from "../../types/query/Query";
import { FILTER_ALL } from "../../utils/constants";
import { RootState } from "../store";

interface QueryState {
  currentFilter: number;
  currentPage: number;
  searchQuery: string;
}

const initialState: QueryState = {
  currentFilter: FILTER_ALL,
  currentPage: 1,
  searchQuery: ""
};

const querySlice = createSlice({
  name: "query",
  initialState,
  reducers: {
    setFilterSuccess: (state, action: PayloadAction<number>) => {
      return {
        currentFilter: action.payload,
        currentPage: 1,
        searchQuery: ""
      };
    },
    setQuerySuccess: (state, action: PayloadAction<Query>) => {
      const { currenFilter, currentPage, searchQuery } = action.payload;

      return {
        currentFilter: currenFilter,
        currentPage: currentPage,
        searchQuery: searchQuery
      };
    },
    setPageSuccess: (state, action: PayloadAction<number>) => {
      return {
        currentFilter: state.currentFilter,
        currentPage: action.payload,
        searchQuery: state.searchQuery
      };
    },
    setSearchQuerySuccess: (state, action: PayloadAction<string>) => {
      return {
        currentFilter: state.currentFilter,
        currentPage: state.currentPage,
        searchQuery: action.payload
      };
    },
    incrementPageSuccess: (state) => {
      return {
        currentFilter: state.currentFilter,
        currentPage: state.currentPage + 1,
        searchQuery: state.searchQuery
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
  setQuerySuccess
} = querySlice.actions;
export default querySlice.reducer;
