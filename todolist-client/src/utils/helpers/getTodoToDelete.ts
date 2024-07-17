import { store } from "../../store/store";

const getTodoToDelete = (todoIndex: number, todoId: string) => {
  const { list, totalTodos } = store.getState().todos;

  if (list.length < totalTodos && todoIndex === list.length) {
    return todoId;
  }

  if (list.length < totalTodos && todoIndex < list.length) {
    return list.slice(-1)[0].id;
  }

  return null;
};

export default getTodoToDelete;
