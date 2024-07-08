import { PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { call, put, takeEvery } from "redux-saga/effects";
import { checkTodo, createTodo, deleteTodo, updateTodo } from "../../api/todo";
import { ServerResponse } from "../../types/common/ServerResponse";
import { TodoItem } from "../../types/todo/TodoItem";
import { UpdateTodo } from "../../types/todo/UpdateTodo";
import { actionRequestType } from "../actions/constants";
import {
  checkTodoSuccess,
  createTodoSuccess,
  deleteTodoSuccess,
  updateTodoSuccess
} from "../slices/todosSlice";

function* workAddTodo({ payload }: PayloadAction<string>) {
  const response: ServerResponse<TodoItem> = yield call(() =>
    createTodo(payload)
  );
  const newTodo = response.data;

  if (response.success) {
    yield put(createTodoSuccess(newTodo!));
  } else {
    toast.error(response.message);
  }
}

function* workDeleteTodo({ payload }: PayloadAction<string>) {
  const response: ServerResponse<null> = yield call(() => deleteTodo(payload));

  if (response.success) {
    yield put(deleteTodoSuccess(payload));
  } else {
    toast.error(response.message);
  }
}

function* workCheckTodo({ payload }: PayloadAction<string>) {
  const response: ServerResponse<TodoItem> = yield call(() =>
    checkTodo(payload)
  );

  const newTodo = response.data;

  if (response.success) {
    yield put(checkTodoSuccess(newTodo!));
  } else {
    toast.error(response.message);
  }
}

function* workUpdateTodo({ payload }: PayloadAction<UpdateTodo>) {
  const { todoId, newTitle } = payload;

  const response: ServerResponse<TodoItem> = yield call(() =>
    updateTodo(todoId, newTitle)
  );

  const newTodo = response.data;

  if (response.success) {
    yield put(updateTodoSuccess(newTodo!));
  } else {
    toast.error(response.message);
  }
}

//get todos with lazy load

function* todosSagas() {
  yield takeEvery(actionRequestType.ADD_TODO_REQUEST, workAddTodo);
  yield takeEvery(actionRequestType.DELETE_TODO_REQUEST, workDeleteTodo);
  yield takeEvery(actionRequestType.CHECK_TODO_REQUEST, workCheckTodo);
  yield takeEvery(actionRequestType.EDIT_TODO_REQUEST, workUpdateTodo);
}

export default todosSagas;
