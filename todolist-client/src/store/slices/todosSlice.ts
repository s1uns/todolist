import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CreateTodoPayload } from "../../types/todo/CreateTodoPayload";
import { TodoItem } from "../../types/todo/TodoItem";
import { TodosCollection } from "../../types/todo/TodosCollection";
import { RootState } from "../store";

interface TodosState {
  list: TodoItem[];
  totalTodos: number;
}

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

    createTodoSuccess: (state, action: PayloadAction<CreateTodoPayload>) => {
      const { todo, todoIndex } = action.payload;
      let newList: TodoItem[] = [];

      if (todoIndex === null) {
        newList = [...state.list, todo];
      } else if (state.totalTodos === state.list.length) {
        newList = [...state.list];
        newList.splice(todoIndex!, 0, todo);
      } else {
        newList = [...state.list];
        newList.splice(todoIndex!, 0, todo);
        newList.pop();
      }

      console.log("New list: ", newList);

      return {
        list: newList,
        totalTodos: state.totalTodos + 1
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
        totalTodos: state.totalTodos
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
  createTodoSuccess,
  updateTodoSuccess,
  checkTodoSuccess,
  deleteTodoSuccess,
  clearAuthorsTodosSuccess
} = todosSlice.actions;
export default todosSlice.reducer;
