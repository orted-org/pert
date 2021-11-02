import { ITodoStore } from "../../DB/DAO.Todo";

function DeleteTodo(s: ITodoStore, data: { id: string }) {
  return s.Delete(data.id);
}

export default DeleteTodo;
