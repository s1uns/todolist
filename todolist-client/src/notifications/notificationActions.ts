import { SocketDeleteTodoPayload } from "../types/socket/SocketDeleteTodoPayload";
import { TodoItem } from "../types/todo/TodoItem";
import {
  SOCKET_CONNECTION_REFRESH,
  SOCKET_TODO_CHECK,
  SOCKET_TODO_CLEAR_COMPLETED,
  SOCKET_TODO_CREATION,
  SOCKET_TODO_DELETE,
  SOCKET_TODO_UPDATE,
  SOCKET_USER_AUTHORIZATION,
  SOCKET_USER_LOGOUT
} from "../utils/constants";

const authAction = (userId: string) => ({
  type: SOCKET_USER_AUTHORIZATION,
  payload: userId
});

const logoutAction = () => ({
  type: SOCKET_USER_LOGOUT
});

const todoCreationAction = (payload: TodoItem) => ({
  type: SOCKET_TODO_CREATION,
  payload: payload
});

const todoUpdateAction = (payload: TodoItem) => ({
  type: SOCKET_TODO_UPDATE,
  payload: payload
});

const todoDeleteAction = (payload: SocketDeleteTodoPayload) => ({
  type: SOCKET_TODO_DELETE,
  payload: payload
});

const todoCheckAction = (payload: TodoItem) => ({
  type: SOCKET_TODO_CHECK,
  payload: payload
});

const todoClearCompletedAction = () => ({
  type: SOCKET_TODO_CLEAR_COMPLETED
});

const connectionRefreshAction = () => ({
  type: SOCKET_CONNECTION_REFRESH
});

export {
  authAction,
  connectionRefreshAction,
  logoutAction,
  todoCheckAction,
  todoClearCompletedAction,
  todoCreationAction,
  todoDeleteAction,
  todoUpdateAction
};
