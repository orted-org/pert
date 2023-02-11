import { Router } from "express";
import { ApiApp } from "../app/app";
import { CreateHandler } from "../app/factory";
import { HandleMiddleGoodMiddleware } from "../middleware/middleware";
import { TodoCreateValidator } from "./validation";

export const TodoApi = (app: ApiApp) => {
  const router = Router();
  router.use(app.InjectTo(HandleMiddleGoodMiddleware));
  router.get("/", app.InjectTo(HandleGetTodo));
  router.post("/", app.InjectTo(HandleCreateTodo));
  return router;
};

const HandleGetTodo = CreateHandler({
  handle: (req, res, next, app) => {
    console.log("i am controller");
    res.send("")
  },
});

const HandleCreateTodo = CreateHandler({
  validate: TodoCreateValidator,
  handle: (req, res, next, app) => {
    req.input.body.title;
    console.log(req.input.body.title);
  },
});


