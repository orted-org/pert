import { Router } from "express";
import App from "./App";
import { HandleCreateTodo } from "../Controllers/Todo/PostTodo";
import { HandleGetTodo } from "../Controllers/Todo/GetTodo";
import { HandleDeleteTodo } from "../Controllers/Todo/DeleteTodo";

function TodoRoutes(app: App): Router {
  const router = Router();
  router.post("/", app.InHandler(HandleCreateTodo));
  router.get("/", app.InHandler(HandleGetTodo));
  router.delete("/", app.InHandler(HandleDeleteTodo));
  return router;
}

function HandleRoutesFor(app: App) {
  if (app.Srv) app.Srv.use("/todo", TodoRoutes(app));
}
export default HandleRoutesFor;
