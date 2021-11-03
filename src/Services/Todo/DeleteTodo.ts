import { ITodoStore } from "../../DB/DAO.Todo";

function DeleteTodo(s: ITodoStore, id: string) {
  return s.Delete(id);
}

export default DeleteTodo;
