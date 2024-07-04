import { takeEvery, put, select } from "redux-saga/effects";

import {
    checkTodoSuccess,
    createTodoSuccess,
    deleteTodoSuccess,
    editTodoSuccess,
    getTodosRequest,
} from "../actions/todosActions";
import socket from "../../notifications/socket";
import {
    FILTER_ACTIVE,
    FILTER_ALL,
    FILTER_COMPLETED,
    SOCKET_ACTION,
    SOCKET_CONNECTION_REFRESH,
    SOCKET_TODO_CHECK,
    SOCKET_TODO_CLEAR_COMPLETED,
    SOCKET_TODO_CREATION,
    SOCKET_TODO_DELETE,
    SOCKET_TODO_UPDATE,
} from "../../shared/constants";
import { authAction } from "../../notifications/notificationActions";
import {
    setCurrentPageRequest,
    setQueryRequest,
} from "../actions/queryActions";

function* workRefreshConnection() {
    const user = yield select((state) => state.user);

    if (user) {
        socket.emit(
            SOCKET_ACTION,
            authAction({
                userId: user.userId,
            }),
        );
    }
}

function* workAddTodo({ data }) {
    const { currentPage, currentFilter } = yield select((state) => state.query);

    if (currentPage === 1 && currentFilter !== FILTER_COMPLETED) { //create notification
        yield put(
            createTodoSuccess({
                ...data,
            }),
        );
    } else {
        yield put(
            setQueryRequest({ currentPage: 1, currentFilter: FILTER_ALL }),
        );
    }
}

function* workDeleteTodo({ data }) {
    const { currentPage } = yield select((state) => state.query);
    const { list } = yield select((state) => state.todos);

    if (list.length === 1 && list[0].id === data && currentPage > 1) {
        yield put(setCurrentPageRequest(currentPage - 1 ? currentPage - 1 : 1)); // create notification
    } else {
        yield put(deleteTodoSuccess(data));
    }
}

function* workCheckTodo({ data }) {
    const { currentPage, currentFilter } = yield select((state) => state.query);

    if (currentFilter === FILTER_ACTIVE || currentFilter === FILTER_COMPLETED) {
        if (currentPage !== 1) {
            yield put(setCurrentPageRequest(1)); // create notification // additional action to update the counter
        } else {
            yield put(
                getTodosRequest({
                    currentPage: 1,
                    currentFilter: currentFilter,
                }),
            );
        }
    } else {
        yield put(checkTodoSuccess(data));
    }
}

function* workEditTodo({ data }) {
    const { list } = yield select((state) => state.todos);

    if (list.filter((todo) => todo.id === data.id).length) {
        yield put(editTodoSuccess(data));
    }
}

function* workClearCompleted() {
    const { currentPage, currentFilter } = yield select((state) => state.query);

    if (currentPage !== 1 && currentFilter !== FILTER_ALL) {
        yield put(
            setQueryRequest({ currentPage: 1, currentFilter: FILTER_ALL }), // notification
        );
    } else {
        yield put(
            getTodosRequest({
                currentPage: currentPage,
                currentFilter: currentFilter,
            }),
        );
    }
}

function* notificationsSagas() {
    yield takeEvery(SOCKET_TODO_CREATION, workAddTodo);
    yield takeEvery(SOCKET_TODO_DELETE, workDeleteTodo);
    yield takeEvery(SOCKET_TODO_CHECK, workCheckTodo);
    yield takeEvery(SOCKET_TODO_UPDATE, workEditTodo);
    yield takeEvery(SOCKET_TODO_CLEAR_COMPLETED, workClearCompleted);
    yield takeEvery(SOCKET_CONNECTION_REFRESH, workRefreshConnection);
    yield takeEvery(SOCKET_TODO_CLEAR_COMPLETED, workClearCompleted);
}

export default notificationsSagas;
