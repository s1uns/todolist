import { PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { call, put, takeEvery } from "redux-saga/effects";
import { loginUser, logoutUser, registerUser } from "../../api";
import {
  authAction,
  logoutAction
} from "../../notifications/notificationActions";
import socket from "../../notifications/socket";
import { AuthResult } from "../../types/auth/AuthResult";
import { LoginCredentials } from "../../types/auth/LoginCredentials";
import { RegistrationCredentials } from "../../types/auth/RegistrationCredentials";
import { ServerResponse } from "../../types/common/ServerResponse";
import { FILTER_ALL, SOCKET_ACTION } from "../../utils/constants";
import { actionRequestType } from "../actions/constants";
import { setQueryRequest } from "../actions/queryActions";
import { authUserSuccess, logoutUserSuccess } from "../slices/authSlice";
import { clearTodosSuccess } from "../slices/todosSlice";

function* workRegisterUser({
  payload
}: PayloadAction<RegistrationCredentials>) {
  const response: ServerResponse<AuthResult> = yield call(() =>
    registerUser(payload)
  );

  if (response.success) {
    const { userId, email, fullName, username } = response.data!;
    yield put(authUserSuccess({ userId, email, fullName, username }));
    yield put(clearTodosSuccess());
    yield put(
      setQueryRequest({
        currentPage: 1,
        currenFilter: FILTER_ALL,
        searchQuery: ""
      })
    );
    socket.emit(SOCKET_ACTION, authAction(userId));
  } else {
    if (response.code === 500) {
      toast.error(response.message);
    }
  }
}

function* workLoginUser({ payload }: PayloadAction<LoginCredentials>) {
  const response: ServerResponse<AuthResult> = yield call(() =>
    loginUser(payload)
  );

  if (response.success) {
    const { userId, email, fullName, username } = response.data!;
    yield put(authUserSuccess({ userId, email, fullName, username }));
    yield put(clearTodosSuccess());
    yield put(
      setQueryRequest({
        currentPage: 1,
        currenFilter: FILTER_ALL,
        searchQuery: ""
      })
    );
    socket.emit(SOCKET_ACTION, authAction(userId));
  } else {
    if (response.code === 500) {
      toast.error(response.message);
    } else {
      if (payload.setErrors) {
        payload.setErrors(response.message);
      }
    }
  }
}

function* workLogoutUser() {
  const response: ServerResponse<null> = yield call(() => logoutUser());

  if (response.success) {
    yield put(logoutUserSuccess());
    socket.emit(SOCKET_ACTION, logoutAction());
  } else {
    toast.error(response.message);
  }
}

function* userSagas() {
  yield takeEvery(actionRequestType.REGISTER_USER_REQUEST, workRegisterUser);
  yield takeEvery(actionRequestType.LOGIN_USER_REQUEST, workLoginUser);
  yield takeEvery(actionRequestType.LOGOUT_USER_REQUEST, workLogoutUser);
}

export default userSagas;
