import { PayloadAction } from "@reduxjs/toolkit";
import { put, select, takeEvery } from "redux-saga/effects";

import { Query } from "../../types/query/Query";
import { actionRequestType } from "../actions/constants";
import {
  handleTodosSharerSuccess,
  setFilterSuccess,
  setQuerySuccess,
  setSearchQuerySuccess,
  setSortingSuccess
} from "../slices/querySlice";
import { RootState } from "../store";

function* workSetCurrentFilter({ payload }: PayloadAction<number>) {
  const { currenFilter } = yield select((state: RootState) => state.query);

  if (currenFilter !== payload) {
    yield put(setFilterSuccess(payload));
  }
}

function* workSetSearchQuery({ payload }: PayloadAction<string>) {
  const { searchQuery } = yield select((state: RootState) => state.query);
  if (searchQuery !== payload) {
    yield put(setSearchQuerySuccess(payload));
  }
}

function* workSetQuery({ payload }: PayloadAction<Query>) {
  yield put(setQuerySuccess(payload));
}

function* workSetSorting({ payload }: PayloadAction<number>) {
  yield put(setSortingSuccess(payload));
}

function* workHandleSharedUser({ payload }: PayloadAction<string>) {
  yield put(handleTodosSharerSuccess(payload));
}

function* querySagas() {
  yield takeEvery(
    actionRequestType.SET_CURRENT_FILTER_REQUEST,
    workSetCurrentFilter
  );
  yield takeEvery(
    actionRequestType.SET_SEARCH_QUERY_REQUEST,
    workSetSearchQuery
  );
  yield takeEvery(actionRequestType.SET_QUERY_REQUEST, workSetQuery);
  yield takeEvery(actionRequestType.SET_SORTING_REQUEST, workSetSorting);
  yield takeEvery(
    actionRequestType.HANDLE_SHARED_USER_REQUEST,
    workHandleSharedUser
  );
}

export default querySagas;
