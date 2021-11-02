import { ITodoStore } from "../../DB/DAO.Todo";

function GetAllTodos(s: ITodoStore) {
  return s.GetAll();
}

export default GetAllTodos;
