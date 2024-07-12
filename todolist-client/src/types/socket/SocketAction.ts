import { TodoItem } from "../todo/TodoItem";

export type SocketAction = {
  type: string;
  data: {
    socketId: string;
    todoId?: string;
    newTodo?: TodoItem;
    userId?: string;
    author?: string;
    isShared?: boolean;
  };
};
