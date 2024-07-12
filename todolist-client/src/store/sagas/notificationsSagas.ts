import { put, select, takeEvery } from "redux-saga/effects";
import { authAction } from "../../notifications/notificationActions";
import socket from "../../notifications/socket";
import {
  FILTER_COMPLETED,
  SOCKET_ACTION,
  SOCKET_CONNECTION_REFRESH,
  SOCKET_TODO_CHECK,
  SOCKET_TODO_CREATION,
  SOCKET_TODO_DELETE,
  SOCKET_TODO_UPDATE
} from "../../utils/constants";

import { PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { SocketDeleteTodoPayload } from "../../types/socket/SocketDeleteTodoPayload";
import { TodoItem } from "../../types/todo/TodoItem";
import { getUser } from "../slices/authSlice";
import {
  checkTodoSuccess,
  createTodoSuccess,
  deleteTodoSuccess,
  updateTodoSuccess
} from "../slices/todosSlice";
import { RootState } from "../store";

function* workRefreshConnection() {
  const { userId } = yield select(getUser);
  if (userId) {
    socket.emit(SOCKET_ACTION, authAction(userId));
  }
}

function* workTodoCreation({ payload }: PayloadAction<TodoItem>) {
  const { currentFilter, searchQuery } = yield select(
    (state: RootState) => state.query
  );
  const { userId } = yield select(getUser);

  if (currentFilter !== FILTER_COMPLETED && searchQuery === "") {
    yield put(createTodoSuccess(payload));
  }

  if (payload.creatorId !== userId) {
    toast.info(`${payload.author} created new todo "${payload.title}"!`);
  }
}

function* workTodoUpdate({ payload }: PayloadAction<TodoItem>) {
  const { userId } = yield select(getUser);

  yield put(updateTodoSuccess(payload));
  if (payload.creatorId !== userId) {
    toast.info(`${payload.author} updated his todo!`);
  }
}
function* workTodoCheck({ payload }: PayloadAction<TodoItem>) {
  const { userId } = yield select(getUser);

  yield put(checkTodoSuccess(payload));
  if (payload.creatorId !== userId) {
    toast.info(
      `${payload.author} changed the status of "${payload.title}" to "${payload.isCompleted ? "completed" : "active"}"!`
    );
  }
}

function* workTodoDelete({ payload }: PayloadAction<SocketDeleteTodoPayload>) {
  const { userId } = yield select(getUser);

  yield put(deleteTodoSuccess(payload.todoId));
  if (payload.creatorId !== userId) {
    toast.info(`${payload.author} deleted his todo!`);
  }
}

function* notificationsSagas() {
  yield takeEvery(SOCKET_CONNECTION_REFRESH, workRefreshConnection);
  yield takeEvery(SOCKET_TODO_CREATION, workTodoCreation);
  yield takeEvery(SOCKET_TODO_UPDATE, workTodoUpdate);
  yield takeEvery(SOCKET_TODO_DELETE, workTodoDelete);
  yield takeEvery(SOCKET_TODO_CHECK, workTodoCheck);
}

export default notificationsSagas;
