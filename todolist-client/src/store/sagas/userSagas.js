import { takeEvery, put, call } from "redux-saga/effects";
import { actionRequestType } from "../actions/constants";
import { registerUser, loginUser, logoutUser } from "../../api";
import {
    loginUserSuccess,
    registerUserSuccess,
    logoutUserSuccess,
} from "../actions/authActions";
import { addToastRequest } from "../actions/toastsActions";
import { clearTodosSuccess } from "../actions/todosActions";
import { setQuerySuccess } from "../actions/queryActions";
import { FILTER_ALL, SOCKET_ACTION } from "../../shared/constants";
import { authAction } from "../../notifications/notificationActions";
import socket from "../../notifications/socket";

function* workRegisterUser({ payload }) {
    const response = yield call(() => registerUser(payload));

    if (response.success) {
        const { userId, email, fullName, username } = response.data;

        yield put(
            setQuerySuccess({ currentPage: 1, currentFilter: FILTER_ALL }),
        );
        yield put(registerUserSuccess({ userId, email, fullName, username }));
        socket.emit(
            SOCKET_ACTION,
            authAction({
                userId: userId,
            }),
        );
    } else {
        yield put(
            addToastRequest({
                id: new Date(Date.now()),
                message: response.message,
            }),
        );
    }
}

function* workLoginUser({ payload }) {
    const response = yield call(() => loginUser(payload));

    if (response.success) {
        const { userId, email, fullName, username } = response.data;
        yield put(
            setQuerySuccess({ currentPage: 1, currentFilter: FILTER_ALL }),
        );
        yield put(loginUserSuccess({ userId, email, fullName, username }));
        socket.emit(
            SOCKET_ACTION,
            authAction({
                userId: userId,
            }),
        );
    } else {
        yield put(
            addToastRequest({
                id: new Date(Date.now()),
                message: response.message,
            }),
        );
    }
}

function* workLogoutUser() {
    const response = yield call(() => logoutUser());

    if (response.success) {
        yield put(clearTodosSuccess());
        yield put(logoutUserSuccess());
    } else {
        yield put(
            addToastRequest({
                id: new Date(Date.now()),
                message: response.message,
            }),
        );
    }
}

function* userSagas() {
    yield takeEvery(actionRequestType.REGISTER_USER_REQUEST, workRegisterUser);
    yield takeEvery(actionRequestType.LOGIN_USER_REQUEST, workLoginUser);
    yield takeEvery(actionRequestType.LOGOUT_USER_REQUEST, workLogoutUser);
}

export default userSagas;
