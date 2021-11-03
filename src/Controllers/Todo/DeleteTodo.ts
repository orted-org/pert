import DeleteTodo from "../../Services/Todo/DeleteTodo";
import RouteHandler from "../../TI/RouteHandlerType";

const HandleDeleteTodo: RouteHandler = (req, res, next, app) => {
  DeleteTodo(app.db.Todo, req.body.id)
    .then(() => {
      app.SendRes(res, 200, undefined, `todo with id = ${req.body.id} deleted`);
    })
    .catch((err) => {
      next(err);
    });
};

export { HandleDeleteTodo };
