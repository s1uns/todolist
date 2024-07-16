import { toast } from "react-toastify";
import { io } from "socket.io-client";
import { store } from "../store/store";
import { SocketAction } from "../types/socket/SocketAction";
import { SocketClearCompletedPayload } from "../types/socket/SocketClearCompletedPayload";
import { SocketDeleteTodoPayload } from "../types/socket/SocketDeleteTodoPayload";
import { SocketShareTodosPayload } from "../types/socket/SocketShareTodosPayload";
import {
  SOCKET_ACTION,
  SOCKET_SHARE_TODOS,
  SOCKET_TODO_CHECK,
  SOCKET_TODO_CLEAR_COMPLETED,
  SOCKET_TODO_CREATION,
  SOCKET_TODO_DELETE,
  SOCKET_TODO_UPDATE
} from "../utils/constants";
import {
  sharedTodosActions,
  todoCheckAction,
  todoClearCompletedAction,
  todoCreationAction,
  todoDeleteAction,
  todoUpdateAction
} from "./notificationActions";

const url = process.env.REACT_APP_SOCKET_URL
  ? process.env.REACT_APP_SOCKET_URL
  : "";

const socket = io(url, {
  withCredentials: true
});

socket.on(SOCKET_ACTION, (action: SocketAction) => {
  if (socket.id !== action.data.socketId) {
    const { type, data } = action;

    switch (type) {
      case SOCKET_TODO_CREATION:
        store.dispatch(todoCreationAction(data.newTodo!));
        break;

      case SOCKET_TODO_DELETE:
        store.dispatch(
          todoDeleteAction(data as unknown as SocketDeleteTodoPayload)
        );
        break;

      case SOCKET_TODO_UPDATE:
        store.dispatch(todoUpdateAction(data.newTodo!));
        break;

      case SOCKET_TODO_CHECK:
        store.dispatch(todoCheckAction(data.newTodo!));
        break;

      case SOCKET_TODO_CLEAR_COMPLETED:
        store.dispatch(
          todoClearCompletedAction(
            data as unknown as SocketClearCompletedPayload
          )
        );
        break;

      case SOCKET_SHARE_TODOS:
        store.dispatch(
          sharedTodosActions(data as unknown as SocketShareTodosPayload)
        );
        break;

      default:
        toast.error("Unknown action type catched on the socket.");
        break;
    }
  }
});

export default socket;
