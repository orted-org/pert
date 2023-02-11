/* eslint-disable @typescript-eslint/no-explicit-any */
import { AnyZodObject, z } from "zod";
import { HerrorStatus } from "../../../pkg/herror/status_codes";
import { IRouteHandler } from "./types";

export function CreateHandler<T extends AnyZodObject>(params: {
  validate?: T;
  handle: IRouteHandler<z.infer<T>>;
}) {
  const validate: IRouteHandler<z.infer<T>> = async (req, res, next, app) => {
    try {
      if (params.validate) req.input = await params.validate.parseAsync(req);
      next();
    } catch (err) {
      return app.SendError(res, {
        status: HerrorStatus.StatusBadRequest,
        data: err,
        message: "validation error",
      });
    }
  };

  if (params.validate) return [validate, params.handle];
  return [params.handle];
}