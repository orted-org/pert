import { Router } from "express";
import { ApiApp } from "./app/app";
import { TodoApi } from "./todo/controller";

const ApiRoutes: { [key: string]: (app: ApiApp) => Router } = {
  "/todo": TodoApi,
};

export default ApiRoutes;
