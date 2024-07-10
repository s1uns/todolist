import { PayloadAction } from "@reduxjs/toolkit";
import { put, takeEvery } from "redux-saga/effects";

import { actionRequestType } from "../actions/constants";
import {
  incrementPageSuccess,
  setFilterSuccess,
  setPageSuccess
} from "../slices/querySlice";

function* workSetCurrentFilter({ payload }: PayloadAction<number>) {
  yield put(setFilterSuccess(payload));
}

function* workSetCurrentPage({ payload }: PayloadAction<number>) {
  yield put(setPageSuccess(payload));
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
}

export default querySagas;
