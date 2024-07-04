import { takeEvery, put, call, select } from "redux-saga/effects";
import { actionRequestType } from "../actions/constants";
import {
    checkTodo,
    clearCompleted,
    createTodo,
    deleteTodo,
    getTodos,
    updateTodo,
} from "../../api";
import {
    checkTodoSuccess,
    createTodoSuccess,
    deleteTodoRequest,
    deleteTodoSuccess,
    editTodoSuccess,
    getTodosRequest,
    setTodosSuccess,
} from "../actions/todosActions";
import { addToastRequest } from "../actions/toastsActions";
import socket from "../../notifications/socket";
import {
    FILTER_ACTIVE,
    FILTER_ALL,
    FILTER_COMPLETED,
} from "../../shared/constants";
import {
    setCurrentPageRequest,
    setQueryRequest,
} from "../actions/queryActions";

function* workGetTodos({ payload }) {
    const { currentPage, currentFilter } = payload;
    const response = yield call(() => getTodos(currentPage, currentFilter));

    if (response.success) {
        yield put(setTodosSuccess({ ...response.data, currentPage }));
    } else {
        yield put(
            addToastRequest({
                id: new Date(Date.now()),
                message: response.message,
            }),
        );
    }
}

function* workAddTodo({ payload }) {
    const { currentPage, currentFilter } = yield select((state) => state.query);

    const response = yield call(() =>
        createTodo({ title: payload.title, socketId: socket.id }),
    );
    const newTodo = response.data;

    if (response.success) {
        if (currentFilter !== FILTER_ALL || currentPage !== 1) {
            yield put(
                setQueryRequest({ currentPage: 1, currentFilter: FILTER_ALL }),
            );
        } else {
            yield put(
                createTodoSuccess({
                    author: payload.author,
                    ...newTodo,
                }),
            );
        }
    } else {
        yield put(
            addToastRequest({
                id: new Date(Date.now()),
                message: response.message,
            }),
        );
    }
}

function* workDeleteTodo({ payload }) {
    const response = yield call(() => deleteTodo(payload, socket.id));
    const { list } = yield select((state) => state.todos);

    if (response.success) {
        const { currentPage } = yield select((state) => state.query);

        if (list.length === 1 && list[0].id === payload && currentPage > 1) {
            yield put(
                setCurrentPageRequest(currentPage - 1 ? currentPage - 1 : 1),
            );
        } else {
            yield put(deleteTodoSuccess(payload));
        }
    } else {
        yield put(
            addToastRequest({
                id: new Date(Date.now()),
                message: response.message,
            }),
        );
    }
}

function* workCheckTodo({ payload }) {
    const { currentPage, currentFilter } = yield select((state) => state.query);
    const { list } = yield select((state) => state.todos);

    const response = yield call(() => checkTodo(payload, socket.id));

    if (response.success) {
        if (
            currentFilter === FILTER_ACTIVE ||
            currentFilter === FILTER_COMPLETED
        ) {
            if (
                list.length === 1 &&
                list[0].id === payload &&
                currentPage > 1
            ) {
                yield put(
                    setCurrentPageRequest(
                        currentPage - 1 ? currentPage - 1 : 1,
                    ),
                );
            } else {
                yield put(
                    getTodosRequest({
                        currentPage: currentPage,
                        currentFilter: currentFilter,
                    }),
                );
            }
        } else {
            yield put(checkTodoSuccess(response.data));
        }
    } else {
        yield put(
            addToastRequest({
                id: new Date(Date.now()),
                message: response.message,
            }),
        );
    }
}

function* workEditTodo({ payload }) {
    const { id, title } = payload;

    const response = yield call(() => updateTodo(id, title, socket.id));

    if (response.success) {
        yield put(editTodoSuccess(response.data));
    } else {
        yield put(
            addToastRequest({
                id: new Date(Date.now()),
                message: response.message,
            }),
        );
    }
}

function* workClearCompleted() {
    const response = yield call(() => clearCompleted(socket.id));
    if (response.success) {
        yield put(setTodosSuccess(response.data));
    } else {
        yield put(
            addToastRequest({
                id: new Date(Date.now()),
                message: response.message,
            }),
        );
    }
}

function* todosSagas() {
    yield takeEvery(actionRequestType.ADD_TODO_REQUEST, workAddTodo);
    yield takeEvery(actionRequestType.GET_TODOS_REQUEST, workGetTodos);
    yield takeEvery(actionRequestType.DELETE_TODO_REQUEST, workDeleteTodo);
    yield takeEvery(actionRequestType.CHECK_TODO_REQUEST, workCheckTodo);
    yield takeEvery(actionRequestType.EDIT_TODO_REQUEST, workEditTodo);
    yield takeEvery(
        actionRequestType.CLEAR_COMPLETED_REQUEST,
        workClearCompleted,
    );
}

export default todosSagas;
