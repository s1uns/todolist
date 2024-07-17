import { store } from "../../store/store";
import { TodoItem } from "../../types/todo/TodoItem";
import { SORT_CREATED_AT, SORT_TITLE, SORT_UPDATED_AT } from "../constants";

const findTodoIndex = (todo: TodoItem) => {
  const { list } = store.getState().todos;
  const { sortBy, isAscending } = store.getState().query;

  for (let i = 0; i < list.length; i++) {
    if (
      sortBy === SORT_CREATED_AT &&
      isAscending &&
      list[i].createdAt >= todo.createdAt
    ) {
      return i;
    }

    if (
      sortBy === SORT_CREATED_AT &&
      !isAscending &&
      list[i].createdAt <= todo.createdAt
    ) {
      return i;
    }

    if (
      sortBy === SORT_UPDATED_AT &&
      isAscending &&
      list[i].updatedAt > todo.updatedAt
    ) {
      return i;
    }

    if (
      sortBy === SORT_UPDATED_AT &&
      !isAscending &&
      list[i].updatedAt < todo.updatedAt
    ) {
      return i;
    }

    if (
      sortBy === SORT_TITLE &&
      isAscending &&
      todo.title.localeCompare(list[i].title) <= 0
    ) {
      return i;
    }

    if (
      sortBy === SORT_TITLE &&
      !isAscending &&
      todo.title.localeCompare(list[i].title) >= 0
    ) {
      return i;
    }
  }

  return list.length;
};

export default findTodoIndex;
