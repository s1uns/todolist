import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TodoItem } from "../../types/todo/TodoItem";
import { TodosCollection } from "../../types/todo/TodosCollection";
import { RootState } from "../store";

interface TodosState {
  list: TodoItem[];
  totalTodos: number;
  activeTodos: number;
}

const initialState: TodosState = {
  list: [],
  totalTodos: 0,
  activeTodos: 0
};

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    setTodosSuccess: (state, action: PayloadAction<TodosCollection>) => {
      const newList = action.payload.overwrite
        ? action.payload.list
        : [...state.list, ...action.payload.list];

      return {
        list: newList,
        totalTodos: action.payload.totalTodos,
        activeTodos: action.payload.activeTodos
      };
    },

    clearTodosSuccess: (state) => {
      return {
        list: [],
        totalTodos: 0,
        activeTodos: 0
      };
    },

    createTodoSuccess: (state, action: PayloadAction<TodoItem>) => {
      const newList = [action.payload, ...state.list];

      return {
        list: newList,
        totalTodos: state.totalTodos + 1,
        activeTodos: state.activeTodos + 1
      };
    },

    updateTodoSuccess: (state, action: PayloadAction<TodoItem>) => {
      const newList = state.list.map((todo) =>
        todo.id === action.payload.id
          ? {
              ...todo,
              title: action.payload.title,
              isUpdated: action.payload.isUpdated,
              updatedAt: action.payload.updatedAt
            }
          : todo
      );

      return {
        list: newList,
        totalTodos: state.totalTodos,
        activeTodos: state.activeTodos
      };
    },

    checkTodoSuccess: (state, action: PayloadAction<TodoItem>) => {
      const newList = state.list.map((todo) =>
        todo.id === action.payload.id
          ? {
              ...todo,
              isCompleted: action.payload.isCompleted,
              isUpdated: action.payload.isUpdated,
              updatedAt: action.payload.updatedAt
            }
          : todo
      );

      return {
        list: newList,
        totalTodos: state.totalTodos,
        activeTodos: action.payload.isCompleted
          ? state.activeTodos - 1
          : state.activeTodos + 1
      };
    },

    deleteTodoSuccess: (state, action: PayloadAction<string>) => {
      let wasCompleted;
      const newList = state.list.filter((todo) => {
        if (todo.id === action.payload) {
          wasCompleted = todo.isCompleted;
          return false;
        }

        return true;
      });

      return {
        list: newList,
        totalTodos: state.totalTodos - 1,
        activeTodos: wasCompleted ? state.activeTodos : state.activeTodos - 1
      };
    }
  }
});

export const getTodos = (state: RootState) => state.todos;

export const {
  setTodosSuccess,
  clearTodosSuccess,
  createTodoSuccess,
  updateTodoSuccess,
  checkTodoSuccess,
  deleteTodoSuccess
} = todosSlice.actions;
export default todosSlice.reducer;
