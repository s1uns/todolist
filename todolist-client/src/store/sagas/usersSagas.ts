import { PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { call, put, select, takeEvery } from "redux-saga/effects";
import { getAvailableUsers } from "../../api/user";
import { ServerResponse } from "../../types/common/ServerResponse";
import { UsersCollection } from "../../types/user/UsersCollection";
import { actionRequestType } from "../actions/constants";
import { setSearchQueryRequest } from "../actions/userActions";
import { setCurrentPageSuccess, setSearchQuerySuccess, setUsersSuccess } from "../slices/usersSlice";
import { RootState } from "../store";

function* workGetAvailableUsers() {
  const { currentPage, searchQuery } = yield select(
    (state: RootState) => state.availableUsers
  );

  const response: ServerResponse<UsersCollection> = yield call(() =>
    getAvailableUsers(currentPage, searchQuery)
  );

  const fetchedUsers = response.data;

  if (response.success) {
    yield put(setUsersSuccess(fetchedUsers!));
  } else {
    toast.error(response.message);
  }
}

function* workSetSearchQuery({ payload }: PayloadAction<string>) {
  yield put(setSearchQuerySuccess(payload));
}

function* workSetCurrentPage({ payload }: PayloadAction<number>) {
  yield put(setCurrentPageSuccess(payload));
}

function* usersSagas() {
  yield takeEvery(
    actionRequestType.GET_AVAILABLE_USERS_REQUEST,
    workGetAvailableUsers
  );
  yield takeEvery(
    actionRequestType.SET_AVAILABLE_USERS_SEARCH_QUERY_REQUEST,
    workSetSearchQuery
  );
  yield takeEvery(
    actionRequestType.SET_AVAILABLE_USERS_CURRENT_PAGE_REQUEST,
    workSetCurrentPage
  );
}

export default usersSagas;
