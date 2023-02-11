import { Router } from "express";
import { ApiApp } from "../app/app";
import { CreateController } from "../app/factory";
import { TodoCreateValidator } from "./validation";

export const TodoApi = (app: ApiApp) => {
  const router = Router();
  router.get("/", app.InjectTo(HandleGetTodo));
  router.post("/", app.InjectTo(HandleCreateTodo));
  return router;
};

const HandleGetTodo = CreateController({
  handle: (req, res, next, app) => {
  },
});

const HandleCreateTodo = CreateController({
  validate: TodoCreateValidator,
  handle: (req, res, next, app) => {
    console.log(req.input.body.title);
  },
});
