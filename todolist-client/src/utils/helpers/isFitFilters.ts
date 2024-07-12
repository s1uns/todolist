import {
  checkTodoSuccess,
  createTodoSuccess,
  deleteTodoSuccess
} from "../../store/slices/todosSlice";
import { store } from "../../store/store";
import { TodoItem } from "../../types/todo/TodoItem";
import { FILTER_ACTIVE, FILTER_ALL, FILTER_COMPLETED } from "../constants";

export const isFitFilters = (todo: TodoItem) => {
  const { currentFilter, searchQuery } = store.getState().query;

  if (
    (currentFilter === FILTER_COMPLETED && todo.isCompleted) ||
    (currentFilter === FILTER_ACTIVE && !todo.isCompleted)
  ) {
    return createTodoSuccess(todo);
  }

  if (
    (currentFilter === FILTER_COMPLETED && !todo.isCompleted) ||
    (currentFilter === FILTER_ACTIVE && todo.isCompleted)
  ) {
    return deleteTodoSuccess(todo.id);
  }

  if (currentFilter === FILTER_ALL) {
    return checkTodoSuccess(todo);
  }
};
