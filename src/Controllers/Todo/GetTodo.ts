import GetAllTodos from "../../Services/Todo/GetAllTodos";
import RouteHandler from "../../TI/RouteHandlerType";

const HandleGetTodo: RouteHandler = (req, res, next, app) => {
  GetAllTodos(app.TodoDAO)
    .then((i) => {
      app.SendRes(res, 201, i);
    })
    .catch((err) => {
      next(err);
    });
};

export { HandleGetTodo };
