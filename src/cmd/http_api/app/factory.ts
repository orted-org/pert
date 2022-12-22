/* eslint-disable @typescript-eslint/no-explicit-any */
import { AnyZodObject, z } from "zod";
import { HerrorStatus } from "../../../pkg/herror/status_codes";
import { IRouteHandler } from "./types";

export function CreateController<T extends AnyZodObject>(params: {
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

  return [validate, params.handle];
}

export function CreateValidator<
  H extends AnyZodObject,
  Q extends AnyZodObject,
  B extends AnyZodObject
>(params: { header?: H; body?: B; query?: Q }) {
  return z.object({
    body: params.body || z.object({} as any),
    header: params.header || z.object({} as any),
    query: params.query || z.object({} as any),
  });
}
