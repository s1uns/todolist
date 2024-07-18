import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TodoItem } from "../../types/todo/TodoItem";
import { TodosCollection } from "../../types/todo/TodosCollection";
import { UpdateTodoPayload } from "../../types/todo/UpdateTodoPayload";
import { RootState } from "../store";

interface TodosState {
  list: TodoItem[];
  totalTodos: number;
}

const moveTodo = (todoList: TodoItem[], todo: TodoItem, todoIndex: number) => {
  const oldIndex = todoList.findIndex((todoItem) => todoItem.id === todo.id);
  console.log(`Old index: ${oldIndex} - New index: ${todoIndex}`);

  if (oldIndex !== -1) {
    if (oldIndex === todoIndex) {
      todoList[oldIndex] = todo;
      return todoList;
    }

    todoList.splice(oldIndex, 1);
    todoList.splice(todoIndex, 0, todo);
    return todoList;
  }

  todoList.splice(todoIndex, 0, todo);
  return todoList;
};

const initialState: TodosState = {
  list: [],
  totalTodos: 0
};

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    incrementTodosNumberSuccess: (state) => {
      return {
        list: state.list,
        totalTodos: state.totalTodos + 1
      };
    },
    setTodosSuccess: (state, action: PayloadAction<TodosCollection>) => {
      const newList = action.payload.overwrite
        ? action.payload.list
        : [...state.list, ...action.payload.list];

      return {
        list: newList,
        totalTodos: action.payload.totalTodos
      };
    },

    clearCompletedSuccess: (state, action: PayloadAction<string>) => {
      let todosToBeDeleted = 0;

      const newList = state.list.filter((todo) => {
        if (todo.creatorId === action.payload && todo.isCompleted) {
          todosToBeDeleted++;
          return false;
        }

        return true;
      });

      return {
        list: newList,
        totalTodos: state.totalTodos - todosToBeDeleted
      };
    },

    clearAuthorsTodosSuccess: (state, action: PayloadAction<string>) => {
      let todosToBeDeleted = 0;
      const newList = state.list.filter((todo) => {
        if (todo.creatorId === action.payload) {
          todosToBeDeleted++;
          return false;
        }

        return true;
      });

      return {
        list: newList,
        totalTodos: state.totalTodos - todosToBeDeleted
      };
    },

    clearTodosSuccess: (state) => {
      return {
        list: [],
        totalTodos: 0
      };
    },

    handleTodoSuccess: (state, action: PayloadAction<UpdateTodoPayload>) => {
      const { todo, todoIndex } = action.payload;
      const newList = moveTodo([...state.list], todo, todoIndex);

      return {
        list: newList,
        totalTodos:
          state.list.length === newList.length
            ? state.totalTodos
            : state.totalTodos + 1
      };
    },

    updateTodoSuccess: (state, action: PayloadAction<TodoItem>) => {
      const newList = state.list.map((todo) =>
        todo.id === action.payload.id
          ? {
              ...todo,
              title: action.payload.title,
              isCompleted: action.payload.isCompleted,
              isUpdated: action.payload.isUpdated,
              updatedAt: action.payload.updatedAt
            }
          : todo
      );

      return {
        list: newList,
        totalTodos: state.totalTodos
      };
    },

    deleteTodoSuccess: (state, action: PayloadAction<string>) => {
      const newList = state.list.filter((todo) => {
        if (todo.id === action.payload) {
          return false;
        }

        return true;
      });

      return {
        list: newList,
        totalTodos:
          newList.length < state.list.length
            ? state.totalTodos - 1
            : state.totalTodos
      };
    }
  }
});

export const getTodos = (state: RootState) => state.todos;

export const {
  incrementTodosNumberSuccess,
  clearCompletedSuccess,
  setTodosSuccess,
  clearTodosSuccess,
  handleTodoSuccess,
  updateTodoSuccess,
  deleteTodoSuccess,
  clearAuthorsTodosSuccess
} = todosSlice.actions;
export default todosSlice.reducer;
