import { store } from "../../store/store";
import { TodoItem } from "../../types/todo/TodoItem";
import { FILTER_ACTIVE, FILTER_COMPLETED } from "../constants";

const isFitFilters = (todo: TodoItem) => {
  const { currentFilter, searchQuery } = store.getState().query;

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
