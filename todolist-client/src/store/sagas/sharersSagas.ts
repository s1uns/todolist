import { PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { call, put, select, takeEvery } from "redux-saga/effects";
import { getTodosSharers } from "../../api/user";
import { ServerResponse } from "../../types/common/ServerResponse";
import { TodosSharersCollection } from "../../types/user/TodosSharersCollection";
import { actionRequestType } from "../actions/constants";
import {
  setSearchQuerySuccess,
  setSharersSuccess
} from "../slices/sharersSlice";
import { RootState } from "../store";

function* workSetSearchQuery({ payload }: PayloadAction<string>) {
  const { searchQuery } = yield select((state: RootState) => state.sharers);
  if (searchQuery !== payload) {
    yield put(setSearchQuerySuccess(payload));
  }
}

function* workGetSharers({ payload }: PayloadAction<boolean>) {
  const { list, searchQuery } = yield select(
    (state: RootState) => state.sharers
  );

  const response: ServerResponse<TodosSharersCollection> = yield call(() =>
    getTodosSharers(payload ? 0 : list.length, searchQuery)
  );

  const fetchedUsers = response.data;

  if (response.success) {
    yield put(setSharersSuccess({ ...fetchedUsers!, overwrite: payload }));
  } else {
    toast.error(response.message);
  }
}

function* sharersSagas() {
  yield takeEvery(
    actionRequestType.SET_SHARERS_SEARCH_QUERY_REQUEST,
    workSetSearchQuery
  );
  yield takeEvery(actionRequestType.GET_SHARERS_REQUEST, workGetSharers);
}

export default sharersSagas;
