import { NextFunction, Request, Response } from "express";
import { ApiApp } from "./app";

export interface CustomRequest<T> extends Request {
  context: any;
  vi: T;
}
export type IRouteHandler<T> = (
  req: CustomRequest<T>,
  res: Response,
  next: NextFunction,
  app: ApiApp
) => void;
