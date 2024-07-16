import {
  createTodoSuccess,
  deleteTodoSuccess
} from "../../store/slices/todosSlice";
import { store } from "../../store/store";
import { TodoItem } from "../../types/todo/TodoItem";
import {
  CHECK_TODO,
  CREATE_TODO,
  FILTER_COMPLETED,
  SORT_TITLE,
  UPDATE_TODO
} from "../constants";

const createTodo = async (todo: TodoItem, todoIndex: number | null) => {
  store.dispatch(createTodoSuccess({ todo: todo, todoIndex: todoIndex }));
};

const updateTodo = async (todo: TodoItem, todoIndex: number | null) => {
  store.dispatch(deleteTodoSuccess(todo.id));
  store.dispatch(createTodoSuccess({ todo: todo, todoIndex: todoIndex }));
};

const removeTodo = async (todoId: string) => {
  store.dispatch(deleteTodoSuccess(todoId));
};

const handleTodo = async (todo: TodoItem, action: number) => {
  const { currentFilter, searchQuery, sortBy, isAscending } =
    store.getState().query;
  const { list, totalTodos } = store.getState().todos;

  if (searchQuery === "" || todo.title.includes(searchQuery)) {
    let newTodoIndex = null;
    const filteredList = list.filter((todoItem) => todoItem.id !== todo.id);
    if (sortBy !== SORT_TITLE) {
      if (!isAscending) {
        newTodoIndex = 0;
      }
    } else {
      if (list.length <= 3) {
        const newList = isAscending
          ? [...filteredList, todo].sort((a, b) =>
              a.title.localeCompare(b.title)
            )
          : [...filteredList, todo].sort((a, b) =>
              b.title.localeCompare(a.title)
            );

        const todoIndex = newList.findIndex(
          (todoItem: TodoItem) => todoItem.id === todo.id
        );
        newTodoIndex = todoIndex;
      } else {
        for (let i = 0; i < filteredList.length - 1; i++) {
          const wordsTrinity = [
            filteredList[i].title,
            todo.title,
            filteredList[i + 1].title
          ];
          if (
            isAscending
              ? JSON.stringify(wordsTrinity) ==
                JSON.stringify(wordsTrinity.sort())
              : JSON.stringify(wordsTrinity) ==
                JSON.stringify(wordsTrinity.sort().slice().reverse())
          ) {
            newTodoIndex = i + 1;
            break;
          }
        }

        if (newTodoIndex === null) {
          if (isAscending) {
            newTodoIndex =
              todo.title.localeCompare(filteredList[0].title) < 0 ? 0 : null;
          } else {
            newTodoIndex =
              todo.title.localeCompare(filteredList[0].title) < 0 ? null : 0;
          }
        }
      }
    }

    if (newTodoIndex === null && list.length < totalTodos) {
      return;
    }

    if (action === CREATE_TODO && currentFilter !== FILTER_COMPLETED) {
      createTodo(todo, newTodoIndex);
    }

    if (action === UPDATE_TODO || action === CHECK_TODO) {
      updateTodo(todo, newTodoIndex);
    }
  } else {
    removeTodo(todo.id);
  }
};

export default handleTodo;
