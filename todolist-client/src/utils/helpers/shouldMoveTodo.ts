import { store } from "../../store/store";
import { TodoItem } from "../../types/todo/TodoItem";
import { SORT_CREATED_AT, SORT_TITLE } from "../constants";

const shouldMoveTodo = (oldTodo: TodoItem, newTodo: TodoItem) => {
  const { sortBy } = store.getState().query;

  if (sortBy === SORT_CREATED_AT) {
    return false;
  }

  if (oldTodo.title === newTodo.title && sortBy === SORT_TITLE) {
    return false;
  }

  return true;
};

export default shouldMoveTodo;
