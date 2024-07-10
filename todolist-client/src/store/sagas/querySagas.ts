import { PayloadAction } from "@reduxjs/toolkit";
import { put, takeEvery } from "redux-saga/effects";

import { Query } from "../../types/query/Query";
import { actionRequestType } from "../actions/constants";
import {
  incrementPageSuccess,
  setFilterSuccess,
  setPageSuccess,
  setQuerySuccess,
  setSearchQuerySuccess
} from "../slices/querySlice";

function* workSetCurrentFilter({ payload }: PayloadAction<number>) {
  yield put(setFilterSuccess(payload));
}

function* workSetCurrentPage({ payload }: PayloadAction<number>) {
  yield put(setPageSuccess(payload));
}

function* workSetSearchQuery({ payload }: PayloadAction<string>) {
  yield put(setSearchQuerySuccess(payload));
}

function* workSetQuery({ payload }: PayloadAction<Query>) {
  yield put(setQuerySuccess(payload));
}

function* workIncrementPage() {
  yield put(incrementPageSuccess());
}

function* querySagas() {
  yield takeEvery(
    actionRequestType.SET_CURRENT_FILTER_REQUEST,
    workSetCurrentFilter
  );
  yield takeEvery(
    actionRequestType.SET_CURRENT_PAGE_REQUEST,
    workSetCurrentPage
  );
  yield takeEvery(actionRequestType.INCREMENT_PAGE_REQUEST, workIncrementPage);
  yield takeEvery(
    actionRequestType.SET_SEARCH_QUERY_REQUEST,
    workSetSearchQuery
  );
  yield takeEvery(actionRequestType.SET_QUERY_REQUEST, workSetQuery);
}

export default querySagas;
