import axios from "axios";
import { customRequest } from "../lib/axios";
import socket from "../notifications/socket";
import { ServerResponse } from "../types/common/ServerResponse";
import { TodoItem } from "../types/todo/TodoItem";
import { TodosCollection } from "../types/todo/TodosCollection";
import {
  DELETE_REQUEST,
  GET_REQUEST,
  PATCH_REQUEST,
  POST_REQUEST,
  PUT_REQUEST,
  TODOS_LIMIT
} from "../utils/constants";

axios.defaults.withCredentials = true;
const url = process.env.REACT_APP_BACKEND_URL;

const createTodo = async (title: string) => {
  const response: ServerResponse<TodoItem> = await customRequest<
    { title: string; socketId: string },
    TodoItem
  >(POST_REQUEST, `${url}todos`, { title: title, socketId: socket.id! });

  return response;
};

const deleteTodo = async (todoId: string) => {
  const response: ServerResponse<null> = await customRequest(
    DELETE_REQUEST,
    `${url}todos/${todoId}`
  );

  return response;
};

const checkTodo = async (todoId: string) => {
  const response: ServerResponse<TodoItem> = await customRequest(
    PATCH_REQUEST,
    `${url}todos/${todoId}/check`
  );

  return response;
};

const updateTodo = async (todoId: string, newTitle: string) => {
  const response: ServerResponse<TodoItem> = await customRequest(
    PUT_REQUEST,
    `${url}todos`,
    {
      id: todoId,
      newTitle: newTitle,
      socketId: socket.id
    }
  );

  return response;
};

const clearCompleted = async () => {
  const response: ServerResponse<TodosCollection> = await customRequest(
    PATCH_REQUEST,
    `${url}todos/clear-completed`
  );

  return response;
};

const getTodos = async (
  currentPage: number,
  currentFilter: number,
  search: string
) => {
  const response: ServerResponse<TodosCollection> = await customRequest(
    GET_REQUEST,
    `${url}todos?page=${currentPage}&limit=${TODOS_LIMIT}&filter=${currentFilter}&search=${search}`
  );

  return response;
};

export {
  checkTodo,
  clearCompleted,
  createTodo,
  deleteTodo,
  getTodos,
  updateTodo
};
