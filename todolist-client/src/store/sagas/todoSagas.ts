import { PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { call, put, takeEvery } from "redux-saga/effects";
import {
  checkTodo,
  createTodo,
  deleteTodo,
  getTodos,
  updateTodo
} from "../../api/todo";
import { ServerResponse } from "../../types/common/ServerResponse";
import { GetTodosQuery } from "../../types/todo/GetTodosQuery";
import { TodoItem } from "../../types/todo/TodoItem";
import { TodosCollection } from "../../types/todo/TodosCollection";
import { UpdateTodo } from "../../types/todo/UpdateTodo";
import { actionRequestType } from "../actions/constants";
import {
  checkTodoSuccess,
  createTodoSuccess,
  deleteTodoSuccess,
  setTodosSuccess,
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
  const { todoId, title } = payload;

  const response: ServerResponse<TodoItem> = yield call(() =>
    updateTodo(todoId, title)
  );

  const newTodo = response.data;

  if (response.success) {
    yield put(updateTodoSuccess(newTodo!));
  } else {
    toast.error(response.message);
  }
}

function* workFetchTodos({ payload }: PayloadAction<GetTodosQuery>) {
  const { currentPage, currentFilter } = payload;

  const response: ServerResponse<TodosCollection> = yield call(() =>
    getTodos(currentPage, currentFilter)
  );

  const fetchedTodos = response.data;

  if (response.success) {
    yield put(setTodosSuccess(fetchedTodos!));
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
  yield takeEvery(actionRequestType.GET_TODOS_REQUEST, workFetchTodos);
}

export default todosSagas;
