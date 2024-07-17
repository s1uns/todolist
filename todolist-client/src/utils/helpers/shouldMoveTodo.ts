import { store } from "../../store/store";
import { TodoItem } from "../../types/todo/TodoItem";
import { SORT_TITLE } from "../constants";

const shouldMoveTodo = (oldTodo: TodoItem, newTodo: TodoItem) => {
  const { sortBy } = store.getState().query;

  if (oldTodo.title === newTodo.title && sortBy === SORT_TITLE) {
    return false;
  }

  return true;
};

export default shouldMoveTodo;
