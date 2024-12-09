import { TodoItem } from "./TodoItem";

export type UpdateTodoPayload = {
  todo: TodoItem;
  todoIndex: number;
};
