import CreateTodo from "../../Services/Todo/CreateTodo";
import RouteHandler from "../../TI/RouteHandlerType";

const HandleCreateTodo: RouteHandler = (req, res, next, app) => {
  CreateTodo(app.TodoDAO, {
    title: req.body.title,
    description: req.body.description,
  })
    .then((i) => {
      app.SendRes(res, 201, i);
    })
    .catch((err) => {
      next(err);
    });
};

export { HandleCreateTodo };
