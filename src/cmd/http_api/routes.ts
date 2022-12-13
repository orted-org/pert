import { Router } from "express";
import { ApiApp } from "./app/app";
import TodoRoutes from "./todo/routes";

const ApiRoutes: { [key: string]: (a: ApiApp) => Router } = {
  "/todo": TodoRoutes,
};

export default ApiRoutes;
