import { Router } from "express";
import { ApiApp } from "../app/app";
import {
  HandleCreateTodo,
  HandleDeleteTodo,
  HandleGetTodo,
  HandleUpdateTodo,
} from "./controller";

export default function TodoRoutes(app: ApiApp): Router {
  const router = Router();
  router.get("/", app.InjectTo(HandleGetTodo));
  router.post("/", app.InjectTo(HandleCreateTodo));
  router.put("/", app.InjectTo(HandleUpdateTodo));
  router.delete("/", app.InjectTo(HandleDeleteTodo));

  return router;
}
