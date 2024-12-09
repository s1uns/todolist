import { UpdateTodo } from "../../types/todo/UpdateTodo";
import { actionRequestType } from "./constants";

const createTodoRequest = (payload: string) => ({
  type: actionRequestType.ADD_TODO_REQUEST,
  payload: payload
});

const deleteTodoRequest = (payload: string) => ({
  type: actionRequestType.DELETE_TODO_REQUEST,
  payload: payload
});

const checkTodoRequest = (payload: string) => ({
  type: actionRequestType.CHECK_TODO_REQUEST,
  payload: payload
});

const updateTodoRequest = (payload: UpdateTodo) => ({
  type: actionRequestType.EDIT_TODO_REQUEST,
  payload: payload
});

const getTodosRequest = (payload?: boolean) => ({
  type: actionRequestType.GET_TODOS_REQUEST,
  payload: payload
});

const clearCompletedRequest = () => ({
  type: actionRequestType.CLEAR_COMPLETED_REQUEST
});

export {
  checkTodoRequest,
  clearCompletedRequest,
  createTodoRequest,
  deleteTodoRequest,
  getTodosRequest,
  updateTodoRequest
};
