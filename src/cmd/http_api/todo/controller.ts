import { NullValidator } from "../app/constant";
import { CreateController } from "../app/factory";
import { validateCreateTodo, validateUpdateTodo } from "./validation";

export const HandleGetTodo = CreateController({
  validate: NullValidator,
  handle: (req, res, next, app) => {
    const id = req.query.id ? Number(req.query.id ?? -1) : -1;
    if (id == -1) {
      app.deps.todoManager
        .GetMany(req.body.limit, req.body.offset)
        .then((todos) => {
          app.SendRes(res, { status: 200, data: todos });
        })
        .catch((err) => {
          next(err);
        });
      return;
    }

    app.deps.todoManager
      .GetByID(id)
      .then((todo) => {
        app.SendRes(res, { status: 200, data: todo });
      })
      .catch((err) => {
        next(err);
      });
  },
});

export const HandleCreateTodo = CreateController({
  validate: validateCreateTodo,
  handle: (req, res, next, app) => {
    app.deps.todoManager
      .Create(req.vi.body.title)
      .then((todo) => {
        app.SendRes(res, { status: 201, data: todo });
      })
      .catch((err) => {
        next(err);
      });
  },
});

export const HandleUpdateTodo = CreateController({
  validate: validateUpdateTodo,
  handle: async (req, res, next, app) => {
    const { body } = req.vi;
    app.deps.todoManager
      .Update(body.id, body.title, body.description, body.is_completed)
      .then((todo) => {
        app.SendRes(res, { status: 200, data: todo });
      })
      .catch((err) => {
        next(err);
      });
  },
});
