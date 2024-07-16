import { call, put, select, takeEvery } from "redux-saga/effects";
import { authAction } from "../../notifications/notificationActions";
import socket from "../../notifications/socket";
import {
  CHECK_TODO,
  CREATE_TODO,
  SOCKET_ACTION,
  SOCKET_CONNECTION_REFRESH,
  SOCKET_SHARE_TODOS,
  SOCKET_TODO_CHECK,
  SOCKET_TODO_CLEAR_COMPLETED,
  SOCKET_TODO_CREATION,
  SOCKET_TODO_DELETE,
  SOCKET_TODO_UPDATE,
  UPDATE_TODO
} from "../../utils/constants";

import { PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import ReloadMessage from "../../components/shared/ReloadMessage";
import { SocketClearCompletedPayload } from "../../types/socket/SocketClearCompletedPayload";
import { SocketDeleteTodoPayload } from "../../types/socket/SocketDeleteTodoPayload";
import { SocketShareTodosPayload } from "../../types/socket/SocketShareTodosPayload";
import { TodoItem } from "../../types/todo/TodoItem";
import handleTodo from "../../utils/helpers/handleTodo";
import { getUser } from "../slices/authSlice";
import {
  clearAuthorsTodosSuccess,
  clearCompletedSuccess,
  deleteTodoSuccess
} from "../slices/todosSlice";

function* workRefreshConnection() {
  const { userId } = yield select(getUser);

  if (userId) {
    socket.emit(SOCKET_ACTION, authAction(userId));
  }
}

function* workTodoCreation({ payload }: PayloadAction<TodoItem>) {
  const { userId } = yield select(getUser);
  yield call(() => handleTodo(payload, CREATE_TODO));

  if (payload.creatorId !== userId) {
    toast.info(`${payload.author} created new todo "${payload.title}"!`);
  }
}

function* workTodoUpdate({ payload }: PayloadAction<TodoItem>) {
  const { userId } = yield select(getUser);

  yield call(() => handleTodo(payload, UPDATE_TODO));

  if (payload.creatorId !== userId) {
    toast.info(`${payload.author} updated his todo!`);
  }
}
function* workTodoCheck({ payload }: PayloadAction<TodoItem>) {
  const { userId } = yield select(getUser);

  yield call(() => handleTodo(payload, CHECK_TODO));

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

function* workClearCompleted({
  payload
}: PayloadAction<SocketClearCompletedPayload>) {
  const { userId } = yield select(getUser);

  yield put(clearCompletedSuccess(payload.userId));

  if (payload.userId !== userId) {
    toast.info(`${payload.author} cleared his completed todos!`);
  }
}

function* workChangeSharedStatus({
  payload
}: PayloadAction<SocketShareTodosPayload>) {
  if (payload.isShared) {
    toast.info(
      ReloadMessage({ message: `${payload.author} shared his todos with you!` })
    );
  } else {
    yield put(clearAuthorsTodosSuccess(payload.userId));
    toast.info(`${payload.author} stopped sharing his todos with you!`);
  }
}

function* notificationsSagas() {
  yield takeEvery(SOCKET_CONNECTION_REFRESH, workRefreshConnection);
  yield takeEvery(SOCKET_TODO_CREATION, workTodoCreation);
  yield takeEvery(SOCKET_TODO_UPDATE, workTodoUpdate);
  yield takeEvery(SOCKET_TODO_DELETE, workTodoDelete);
  yield takeEvery(SOCKET_TODO_CHECK, workTodoCheck);
  yield takeEvery(SOCKET_TODO_CLEAR_COMPLETED, workClearCompleted);
  yield takeEvery(SOCKET_SHARE_TODOS, workChangeSharedStatus);
}

export default notificationsSagas;
