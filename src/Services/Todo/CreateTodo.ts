import { ITodoStore } from "../../DB/DAO.Todo";
import NewV4UUID from "../../Helpers/Wrapper/UUID";

function CreateTodo(
  d: ITodoStore,
  data: { title: string; description: string | null }
) {
  return d.Create({
    ...data,
    id: NewV4UUID(),
    status: false,
    updated_at: new Date(),
  });
}

export default CreateTodo;
