import { SocketClearCompletedPayload } from "../types/socket/SocketClearCompletedPayload";
import { SocketDeleteTodoPayload } from "../types/socket/SocketDeleteTodoPayload";
import { SocketShareTodosPayload } from "../types/socket/SocketShareTodosPayload";
import { TodoItem } from "../types/todo/TodoItem";
import {
  SOCKET_CONNECTION_REFRESH,
  SOCKET_SHARE_TODOS,
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

const todoClearCompletedAction = (payload: SocketClearCompletedPayload) => ({
  type: SOCKET_TODO_CLEAR_COMPLETED,
  payload: payload
});

const connectionRefreshAction = () => ({
  type: SOCKET_CONNECTION_REFRESH
});

const sharedTodosActions = (payload: SocketShareTodosPayload) => ({
  type: SOCKET_SHARE_TODOS,
  payload: payload
});

export {
  authAction,
  connectionRefreshAction,
  logoutAction,
  sharedTodosActions,
  todoCheckAction,
  todoClearCompletedAction,
  todoCreationAction,
  todoDeleteAction,
  todoUpdateAction
};
