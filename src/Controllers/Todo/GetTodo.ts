import GetAllTodos from "../../Services/Todo/GetAllTodos";
import RouteHandler from "../../TI/RouteHandlerType";

const HandleGetTodo: RouteHandler = (req, res, next, app) => {
  GetAllTodos(app.db.Todo)
    .then((i) => {
      app.SendRes(res, 200, i);
    })
    .catch((err) => {
      next(err);
    });
};

export { HandleGetTodo };
