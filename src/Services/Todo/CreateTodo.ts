import { ITodoStore } from "../../DB/DAO.Todo";
import { generateNewUserID } from "../../Helpers/Auth/Helper.Auth.Factory";

function CreateTodo(
  d: ITodoStore,
  data: { title: string; description: string | null }
) {
  return d.Create({
    ...data,
    id: generateNewUserID(),
    status: false,
    updated_at: new Date(),
  });
}

export default CreateTodo;
