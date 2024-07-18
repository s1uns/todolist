import { store } from "../../store/store";
import { TodoItem } from "../../types/todo/TodoItem";
import {
  FILTER_ACTIVE,
  FILTER_COMPLETED,
  SORT_TITLE,
  SORT_UPDATED_AT
} from "../constants";

const isFitFilters = (todo: TodoItem) => {
  const { currentFilter, searchQuery, sortBy, isAscending, selectedSharers } =
    store.getState().query;
  const { list, totalTodos } = store.getState().todos;

  if (selectedSharers && !selectedSharers.includes(todo.creatorId)) {
    return false;
  }

  if (list.length < totalTodos && sortBy === SORT_UPDATED_AT && isAscending) {
    return false;
  }

  if (
    list.length < totalTodos &&
    sortBy === SORT_TITLE &&
    isAscending &&
    todo.title.localeCompare(list[list.length - 1].title) > 0
  ) {
    return false;
  }

  if (
    list.length < totalTodos &&
    sortBy === SORT_TITLE &&
    !isAscending &&
    todo.title.localeCompare(list[list.length - 1].title) < 0
  ) {
    return false;
  }

  if (searchQuery && !todo.title.includes(searchQuery)) {
    return false;
  }

  if (currentFilter === FILTER_COMPLETED && !todo.isCompleted) {
    return false;
  }

  if (currentFilter === FILTER_ACTIVE && todo.isCompleted) {
    return false;
  }

  return true;
};

export default isFitFilters;
