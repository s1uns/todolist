import { call, put, takeEvery } from "redux-saga/effects";
import { loginUser, logoutUser, registerUser } from "../../api";
import { logoutUserSuccess } from "../actions/authActions";
import { actionRequestType } from "../actions/constants";
import { authUserSuccess } from "../slices/authSlice";

function* workRegisterUser({ payload }) {
  const response = yield call(() => registerUser(payload));

  if (response.success) {
    const { userId, email, fullName, username } = response.data;

  } else {
    console.log("Auth error: ", response.message);
  }
}

function* workLoginUser({ payload }) {
  const response = yield call(() => loginUser(payload));
  console.log("Response: ", response);

  if (response.success) {
    const { userId, email, fullName, username } = response.data;
    yield put(authUserSuccess({ userId, email, fullName, username }));
  } else {
    console.log("Auth error: ", response.message);
  }
}

function* workLogoutUser() {
  const response = yield call(() => logoutUser());

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
