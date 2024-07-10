import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FILTER_ALL } from "../../utils/constants";
import { RootState } from "../store";

interface QueryState {
  currentFilter: number;
  currentPage: number;
}

const initialState: QueryState = {
  currentFilter: FILTER_ALL,
  currentPage: 1
};

const querySlice = createSlice({
  name: "query",
  initialState,
  reducers: {
    setFilterSuccess: (state, action: PayloadAction<number>) => {
      return {
        currentFilter: action.payload,
        currentPage: 1
      };
    },
    setPageSuccess: (state, action: PayloadAction<number>) => {
      return {
        currentFilter: state.currentFilter,
        currentPage: action.payload
      };
    },
    incrementPageSuccess: (state) => {
      return {
        currentFilter: state.currentFilter,
        currentPage: state.currentPage + 1
      };
    }
  }
});

export const getCurrentFilter = (state: RootState) => state.query.currentFilter;
export const { setFilterSuccess, setPageSuccess, incrementPageSuccess } =
  querySlice.actions;
export default querySlice.reducer;
