import { TodoItem } from "./TodoItem";

export type TodosCollection = {
  list: TodoItem[];
  totalTodos: number;
  activeTodos: number;
};
