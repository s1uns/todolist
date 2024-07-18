import { PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { call, put, select, takeEvery } from "redux-saga/effects";
import {
  checkTodo,
  clearCompleted,
  createTodo,
  deleteTodo,
  getTodos,
  updateTodo
} from "../../api/todo";
import { ServerResponse } from "../../types/common/ServerResponse";
import { TodoItem } from "../../types/todo/TodoItem";
import { TodosCollection } from "../../types/todo/TodosCollection";
import { UpdateTodo } from "../../types/todo/UpdateTodo";
import { actionRequestType } from "../actions/constants";
import { setTodosSuccess } from "../slices/todosSlice";
import { RootState } from "../store";

function* workAddTodo({ payload }: PayloadAction<string>) {
  const response: ServerResponse<TodoItem> = yield call(() =>
    createTodo(payload)
  );

  if (!response.success) {
    toast.error(response.message);
  }
}

function* workClearCompleted() {
  const response: ServerResponse<string> = yield call(clearCompleted);

  if (!response.success) {
    toast.error(response.message);
  }
}

function* workDeleteTodo({ payload }: PayloadAction<string>) {
  const response: ServerResponse<null> = yield call(() => deleteTodo(payload));

  if (!response.success) {
    toast.error(response.message);
  }
}

function* workCheckTodo({ payload }: PayloadAction<string>) {
  const response: ServerResponse<TodoItem> = yield call(() =>
    checkTodo(payload)
  );

  if (!response.success) {
    toast.error(response.message);
  }
}

function* workUpdateTodo({ payload }: PayloadAction<UpdateTodo>) {
  const { todoId, title } = payload;
  const response: ServerResponse<TodoItem> = yield call(() =>
    updateTodo(todoId, title)
  );

  if (!response.success) {
    toast.error(response.message);
  }
}

function* workFetchTodos({ payload }: PayloadAction<boolean>) {
  const { currentFilter, searchQuery, sortBy, isAscending } = yield select(
    (state: RootState) => state.query
  );
  const { list } = yield select((state: RootState) => state.todos);
  const offset = payload ? 0 : list.length;
  const response: ServerResponse<TodosCollection> = yield call(() =>
    getTodos(offset, currentFilter, searchQuery, sortBy, isAscending)
  );

  const fetchedTodos = response.data;

  if (response.success) {
    yield put(setTodosSuccess({ ...fetchedTodos!, overwrite: payload }));
  } else {
    toast.error(response.message);
  }
}

function* todosSagas() {
  yield takeEvery(actionRequestType.ADD_TODO_REQUEST, workAddTodo);
  yield takeEvery(actionRequestType.DELETE_TODO_REQUEST, workDeleteTodo);
  yield takeEvery(actionRequestType.CHECK_TODO_REQUEST, workCheckTodo);
  yield takeEvery(actionRequestType.EDIT_TODO_REQUEST, workUpdateTodo);
  yield takeEvery(actionRequestType.GET_TODOS_REQUEST, workFetchTodos);
  yield takeEvery(
    actionRequestType.CLEAR_COMPLETED_REQUEST,
    workClearCompleted
  );
}

export default todosSagas;
