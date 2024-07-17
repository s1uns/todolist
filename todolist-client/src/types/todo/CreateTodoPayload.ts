import { TodoItem } from "./TodoItem";

export type CreateTodoPayload = {
  todo: TodoItem;
  todoIndex?: number | null;
  sortBy?: number;
  isAscending?: boolean;
};
