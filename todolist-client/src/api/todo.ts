import axios from "axios";
import { ServerResponse } from "../types/common/ServerResponse";
import { TodoItem } from "../types/todo/TodoItem";
import {
  DELETE_REQUEST,
  PATCH_REQUEST,
  POST_REQUEST,
  PUT_REQUEST
} from "../utils/constants";
import { customRequest } from "./helpers";

axios.defaults.withCredentials = true;
const url = process.env.REACT_APP_BACKEND_URL;

const createTodo = async (title: string): Promise<ServerResponse<TodoItem>> => {
  const response = await customRequest<{ title: string }, TodoItem>(
    POST_REQUEST,
    `${url}todos`,
    { title: title }
  );

  return response;
};

const deleteTodo = async (todoId: string) => {
  const response = await customRequest(DELETE_REQUEST, `${url}todos/${todoId}`);

  return response;
};

const checkTodo = async (todoId: string) => {
  const response = await customRequest(
    PATCH_REQUEST,
    `${url}todos/${todoId}/check`
  );

  return response;
};

const updateTodo = async (todoId: string, newTitle: string) => {
  const response = await customRequest(PUT_REQUEST, `${url}todos`, {
    id: todoId,
    newTitle: newTitle
  });

  return response;
};

export { checkTodo, createTodo, deleteTodo, updateTodo };
