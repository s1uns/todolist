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
import {
  CREATE_TODO,
  FILTER_ALL,
  SORT_CREATED_AT,
  SORT_UPDATED_AT
} from "../../utils/constants";
import handleTodo from "../../utils/helpers/handleTodo";
import { actionRequestType } from "../actions/constants";
import { setCurrentPageRequest } from "../actions/queryActions";
import { getUser } from "../slices/authSlice";
import {
  checkTodoSuccess,
  clearCompletedSuccess,
  createTodoSuccess,
  deleteTodoSuccess,
  incrementTodosNumberSuccess,
  setTodosSuccess,
  updateTodoSuccess
} from "../slices/todosSlice";
import { RootState } from "../store";

function* workAddTodo({ payload }: PayloadAction<string>) {
  const response: ServerResponse<TodoItem> = yield call(() =>
    createTodo(payload)
  );
  const { currentFilter, searchQuery, sortBy, isAscending } = yield select(
    (state: RootState) => state.query
  );
  const newTodo = response.data;

  if (response.success) {
    yield call(() => handleTodo(newTodo!, CREATE_TODO));
  } else {
    toast.error(response.message);
  }
}

function* workClearCompleted() {
  const { userId } = yield select(getUser);
  const { currentPage, currentFilter, searchQuery } = yield select(
    (state: RootState) => state.query
  );

  const response: ServerResponse<string> = yield call(clearCompleted);

  if (response.success) {
    if (currentPage > 1) {
      yield put(setCurrentPageRequest(1));
    } else {
      yield put(clearCompletedSuccess(userId));
      toast.success(response.data!);
    }
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
  const { currentFilter, sortBy, isAscending } = yield select(
    (state: RootState) => state.query
  );
  const newTodo = response.data;

  if (response.success) {
    if (currentFilter !== FILTER_ALL) {
      yield put(deleteTodoSuccess(newTodo?.id!));
    } else {
      if (sortBy !== SORT_UPDATED_AT) {
        yield put(checkTodoSuccess(newTodo!));
      } else {
        yield put(deleteTodoSuccess(newTodo?.id!));

        yield put(
          createTodoSuccess({
            todo: newTodo!,
            sortBy: sortBy,
            isAscending: isAscending
          })
        );
      }
    }
  } else {
    toast.error(response.message);
  }
}

function* workUpdateTodo({ payload }: PayloadAction<UpdateTodo>) {
  const { todoId, title } = payload;
  const { searchQuery, sortBy, isAscending } = yield select(
    (state: RootState) => state.query
  );

  const response: ServerResponse<TodoItem> = yield call(() =>
    updateTodo(todoId, title)
  );

  const newTodo = response.data;

  if (response.success) {
    if (!newTodo?.title.includes(searchQuery)) {
      yield put(deleteTodoSuccess(newTodo?.id!));
    } else {
      if (sortBy === SORT_CREATED_AT) {
        yield put(updateTodoSuccess(newTodo!));
      } else {
        yield put(deleteTodoSuccess(newTodo?.id!));

        yield put(
          createTodoSuccess({
            todo: newTodo!,
            sortBy: sortBy,
            isAscending: isAscending
          })
        );
      }
    }
  } else {
    toast.error(response.message);
  }
}

function* workIncrementTodosNumber() {
  yield put(incrementTodosNumberSuccess());
}

function* workFetchTodos() {
  const { currentPage, currentFilter, searchQuery, sortBy, isAscending } =
    yield select((state: RootState) => state.query);

  const response: ServerResponse<TodosCollection> = yield call(() =>
    getTodos(currentPage, currentFilter, searchQuery, sortBy, isAscending)
  );

  const fetchedTodos = response.data;

  const overwrite = currentPage === 1;

  if (response.success) {
    yield put(setTodosSuccess({ ...fetchedTodos!, overwrite }));
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
  yield takeEvery(
    actionRequestType.INCREMENT_TODOS_NUMBER,
    workIncrementTodosNumber
  );
}

export default todosSagas;
