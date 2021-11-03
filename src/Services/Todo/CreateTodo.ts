import { ITodoStore } from "../../DB/DAO.Todo";
import NewV4UUID from "../../Helpers/Wrapper/UUID";

function CreateTodo(
  s: ITodoStore,
  data: { title: string; description: string | null }
) {
  return s.Create({
    ...data,
    id: NewV4UUID(),
    updated_at: new Date(),
  });
}

export default CreateTodo;
