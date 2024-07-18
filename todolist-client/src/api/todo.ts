import axios from "axios";
import { customRequest } from "../lib/axios";
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
import getTodosSharersQueryParam from "../utils/helpers/getTodosSharersQueryParam";

axios.defaults.withCredentials = true;
const url = process.env.REACT_APP_BACKEND_URL;

const createTodo = async (title: string) => {
  const response: ServerResponse<TodoItem> = await customRequest<
    { title: string },
    TodoItem
  >(POST_REQUEST, `${url}todos`, { title: title });

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
      newTitle: newTitle
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
  offset: number,
  currentFilter: number,
  search: string,
  sortBy: number,
  isAscending: boolean
) => {
  const response: ServerResponse<TodosCollection> = await customRequest(
    GET_REQUEST,
    `${url}todos?offset=${offset}&limit=${TODOS_LIMIT}&filter=${currentFilter}&search=${search}&sortBy=${sortBy}${isAscending ? "&isAscending=true" : ""}${getTodosSharersQueryParam()}`
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
