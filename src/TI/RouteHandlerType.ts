import { NextFunction, Request, Response } from "express";
import App from "../HTTP/App";

type RouteHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
  app: App
) => void;

export default RouteHandler;
