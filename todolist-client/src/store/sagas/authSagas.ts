import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeEvery } from "redux-saga/effects";
import { loginUser, logoutUser, registerUser } from "../../api";
import { AuthResult } from "../../types/auth/AuthResult";
import { LoginCredentials } from "../../types/auth/LoginCredentials";
import { RegistrationCredentials } from "../../types/auth/RegistrationCredentials";
import { SuccessResponse } from "../../types/common/SuccessResponse";
import { logoutUserSuccess } from "../actions/authActions";
import { actionRequestType } from "../actions/constants";
import { authUserSuccess } from "../slices/authSlice";

function* workRegisterUser({
  payload
}: PayloadAction<RegistrationCredentials>) {
  const response: SuccessResponse<AuthResult> = yield call(() =>
    registerUser(payload)
  );

  if (response.success) {
    const { userId, email, fullName, username } = response.data!;
    yield put(authUserSuccess({ userId, email, fullName, username }));
  } else {
    console.log("Auth error: ", response.message);
  }
}

function* workLoginUser({ payload }: PayloadAction<LoginCredentials>) {
  const response: SuccessResponse<AuthResult> = yield call(() =>
    loginUser(payload)
  );
  
  if (response.success) {
    const { userId, email, fullName, username } = response.data!;
    yield put(authUserSuccess({ userId, email, fullName, username }));
  } else {
    console.log("Auth error: ", response.message);
  }
}

function* workLogoutUser() {
  const response: SuccessResponse<null> = yield call(() => logoutUser());

  if (response.success) {
    yield put(logoutUserSuccess());
  } else {
  }
}

function* userSagas() {
  yield takeEvery(actionRequestType.REGISTER_USER_REQUEST, workRegisterUser);
  yield takeEvery(actionRequestType.LOGIN_USER_REQUEST, workLoginUser);
  yield takeEvery(actionRequestType.LOGOUT_USER_REQUEST, workLogoutUser);
}

export default userSagas;