import { Router } from "express";
import { ApiApp } from "../app/app";
import { CreateController } from "../app/factory";
import {
  TodoCreateValidator,
  TodoDeleteValidator,
  TodoUpdateValidator,
} from "./validation";

export const TodoApi = (app: ApiApp) => {
  const router = Router();
  router.get("/", app.InjectTo(HandleGetTodo));
  router.post("/", app.InjectTo(HandleCreateTodo));
  router.put("/", app.InjectTo(HandleUpdateTodo));
  router.delete("/", app.InjectTo(HandleDeleteTodo));
  return router;
};

const HandleGetTodo = CreateController({
  handle: (req, res, next, app) => {
    const id = req.query.id ? Number(req.query.id ?? -1) : -1;
    if (id == -1) {
      app.deps.todoManager
        .GetMany(req.body.limit, req.body.offset)
        .then((manyTodo) => {
          app.SendRes(res, { status: 200, data: manyTodo });
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

const HandleCreateTodo = CreateController({
  validate: TodoCreateValidator,
  handle: (req, res, next, app) => {
    app.deps.todoManager
      .Create(req.input.body.title)
      .then((todo) => {
        app.SendRes(res, { status: 201, data: todo });
      })
      .catch((err) => {
        next(err);
      });
  },
});

const HandleUpdateTodo = CreateController({
  validate: TodoUpdateValidator,
  handle: async (req, res, next, app) => {
    app.deps.todoManager
      .Update(
        req.input.body.id,
        req.input.body.title,
        req.input.body.description,
        req.input.body.is_completed
      )
      .then((todo) => {
        app.SendRes(res, { status: 200, data: todo });
      })
      .catch((err) => {
        next(err);
      });
  },
});

const HandleDeleteTodo = CreateController({
  validate: TodoDeleteValidator,
  handle: (req, res, next, app) => {
    app.deps.todoManager
      .DeleteById(req.input.query.id)
      .then(() => {
        app.SendRes(res, { status: 200 });
      })
      .catch((err) => {
        next(err);
      });
  },
});
