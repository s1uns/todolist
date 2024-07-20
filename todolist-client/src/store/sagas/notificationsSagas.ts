import { call, put, select, takeEvery } from "redux-saga/effects";
import { authAction } from "../../notifications/notificationActions";
import socket from "../../notifications/socket";
import {
  SOCKET_ACTION,
  SOCKET_CONNECTION_REFRESH,
  SOCKET_SHARE_TODOS,
  SOCKET_TODO_CHECK,
  SOCKET_TODO_CLEAR_COMPLETED,
  SOCKET_TODO_CREATION,
  SOCKET_TODO_DELETE,
  SOCKET_TODO_UPDATE
} from "../../utils/constants";

import { PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import ReloadMessage from "../../components/shared/ReloadMessage";
import { SocketClearCompletedPayload } from "../../types/socket/SocketClearCompletedPayload";
import { SocketDeleteTodoPayload } from "../../types/socket/SocketDeleteTodoPayload";
import { SocketShareTodosPayload } from "../../types/socket/SocketShareTodosPayload";
import { TodoItem } from "../../types/todo/TodoItem";
import findTodoIndex from "../../utils/helpers/findTodoIndex";
import getTodoToDelete from "../../utils/helpers/getTodoToDelete";
import isFitFilters from "../../utils/helpers/isFitFilters";
import shouldMoveTodo from "../../utils/helpers/shouldMoveTodo";
import { getUser } from "../slices/authSlice";
import { handleTodosSharerSuccess } from "../slices/querySlice";
import { addSharerSuccess, deleteSharerSuccess } from "../slices/sharersSlice";
import {
  clearAuthorsTodosSuccess,
  clearCompletedSuccess,
  deleteTodoSuccess,
  handleTodoSuccess,
  updateTodoSuccess
} from "../slices/todosSlice";
import { updateUserSuccess } from "../slices/usersSlice";
import { RootState } from "../store";

function* workRefreshConnection() {
  const { userId } = yield select(getUser);

  if (userId) {
    socket.emit(SOCKET_ACTION, authAction(userId));
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
  const { userId } = yield select(getUser);
  const { list, totalUsers } = yield select(
    (state: RootState) => state.sharers
  );

  if (payload.sharerId === userId) {
    yield put(
      updateUserSuccess({
        id: payload.receiverId,
        sharedStatus: payload.isShared
      })
    );
  }

  if (payload.receiverId === userId) {
    if (payload.isShared) {
      if (list.length === totalUsers) {
        yield put(
          addSharerSuccess({
            id: payload.sharerId,
            username: payload.sharerUsername,
            fullName: payload.sharerFullname
          })
        );
      }

      toast.info(
        ReloadMessage({
          message: `${payload.sharerFullname} shared his todos with you!`
        })
      );
    } else {
      yield put(handleTodosSharerSuccess(payload.sharerId));
      yield put(deleteSharerSuccess(payload.sharerId));
      yield put(clearAuthorsTodosSuccess(payload.sharerId));

      toast.info(
        `${payload.sharerFullname} stopped sharing his todos with you!`
      );
    }
  }
}

function* workHandleTodo({ type, payload }: PayloadAction<TodoItem>) {
  const { list } = yield select((state: RootState) => state.todos);
  const { userId } = yield select(getUser);

  const oldTodo = list.find((todo: TodoItem) => todo.id === payload.id);
  const fitFilters = isFitFilters(payload);

  if (oldTodo && fitFilters) {
    const shouldBeMoved: boolean = yield call(() =>
      shouldMoveTodo(oldTodo, payload)
    );
    if (shouldBeMoved) {
      const todoIndex = findTodoIndex(payload);
      yield put(handleTodoSuccess({ todo: payload, todoIndex: todoIndex }));
      return;
    }

    yield put(updateTodoSuccess(payload));
  }

  if (oldTodo && !fitFilters) {
    yield put(deleteTodoSuccess(payload.id));
  }

  if (!oldTodo && fitFilters) {
    const todoIndex = findTodoIndex(payload);
    const todoToBeDeletedId = getTodoToDelete(todoIndex, payload.id);
    if (!todoToBeDeletedId) {
      yield put(handleTodoSuccess({ todo: payload, todoIndex: todoIndex }));
    }

    if (todoToBeDeletedId && todoToBeDeletedId !== payload.id) {
      yield put(deleteTodoSuccess(todoToBeDeletedId));
      yield put(handleTodoSuccess({ todo: payload, todoIndex: todoIndex }));
    }
  }

  if (payload.creatorId !== userId) {
    if (type === SOCKET_TODO_CHECK) {
      toast.info(
        `${payload.author} changed the status of "${payload.title}" to "${payload.isCompleted ? "completed" : "active"}"!`
      );
    }

    if (type === SOCKET_TODO_CREATION) {
      toast.info(`${payload.author} created new todo "${payload.title}"!`);
    }

    if (type === SOCKET_TODO_UPDATE) {
      toast.info(`${payload.author} updated his todo!`);
    }
  }
}

function* notificationsSagas() {
  yield takeEvery(SOCKET_CONNECTION_REFRESH, workRefreshConnection);
  yield takeEvery(
    [SOCKET_TODO_CREATION, SOCKET_TODO_UPDATE, SOCKET_TODO_CHECK],
    workHandleTodo
  );
  yield takeEvery(SOCKET_TODO_DELETE, workTodoDelete);
  yield takeEvery(SOCKET_TODO_CLEAR_COMPLETED, workClearCompleted);
  yield takeEvery(SOCKET_SHARE_TODOS, workChangeSharedStatus);
}

export default notificationsSagas;
