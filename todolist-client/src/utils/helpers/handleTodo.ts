import {
  createTodoSuccess,
  deleteTodoSuccess
} from "../../store/slices/todosSlice";
import { store } from "../../store/store";
import { TodoItem } from "../../types/todo/TodoItem";
import { CREATE_TODO, FILTER_COMPLETED, SORT_TITLE } from "../constants";

const createTodo = async (todo: TodoItem, todoIndex: number | null) => {
  store.dispatch(createTodoSuccess({ todo: todo, todoIndex: todoIndex }));
};

const updateTodo = async (todo: TodoItem, todoIndex: number | null) => {
  store.dispatch(deleteTodoSuccess(todo.id));
  store.dispatch(createTodoSuccess({ todo: todo, todoIndex: todoIndex }));
};

const handleTodo = async (todo: TodoItem, action: number) => {
  const { currentFilter, currentPage, searchQuery, sortBy, isAscending } =
    store.getState().query;
  const { list, totalTodos } = store.getState().todos;

  if (action === CREATE_TODO) {
    if (
      currentFilter !== FILTER_COMPLETED &&
      (searchQuery === "" || todo.title.includes(searchQuery))
    ) {
        // let
      if (sortBy !== SORT_TITLE) {
        if (!isAscending) {
          store.dispatch(createTodoSuccess({ todo: todo, todoIndex: 0 }));
        }

        if (isAscending && list.length === totalTodos) {
          store.dispatch(createTodoSuccess({ todo: todo, todoIndex: null }));
        }
      } else {
        if (list.length === 0) {
          store.dispatch(createTodoSuccess({ todo: todo, todoIndex: null }));
        } else if (list.length <= 2) {
          const newList = isAscending
            ? [...list, todo].sort((a, b) => a.title.localeCompare(b.title))
            : [...list, todo].sort((a, b) => b.title.localeCompare(a.title));
          const todoIndex = newList.findIndex(
            (todoItem: TodoItem) => todoItem.id === todo.id
          );
          store.dispatch(
            createTodoSuccess({ todo: todo, todoIndex: todoIndex })
          );
        } else {
          for (let i = 0; i < list.length - 1; i++) {
            const wordsTrinity = [list[i].title, todo.title, list[i + 1].title];
            if (
              isAscending
                ? JSON.stringify(wordsTrinity) ==
                  JSON.stringify(wordsTrinity.sort())
                : JSON.stringify(wordsTrinity) ==
                  JSON.stringify(wordsTrinity.sort().slice().reverse())
            ) {
              store.dispatch(
                createTodoSuccess({ todo: todo, todoIndex: i + 1 })
              );
              break;
            }
          }
        }
      }
    }
  }
};

export default handleTodo;
