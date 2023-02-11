/* eslint-disable @typescript-eslint/no-explicit-any */
// eslint-disable-next-line @typescript-eslint/no-var-requires
import express, { Response, Router } from "express";
import { Herror } from "../../../pkg/herror/herror";
import { HerrorStatus } from "../../../pkg/herror/status_codes";
import { ToJson } from "../../../util/json";
import Logs from "../../../util/logs";
import { ApiAppConfig } from "../config";
import { IAPIDependencies, InitiateDependencies } from "../deps";
import ApiRoutes from "../routes";
import { IRouteHandler } from "./types";

export class ApiApp {
  config = ApiAppConfig;
  deps: IAPIDependencies;
  private depsCheck = false;
  private srv = this._initServer();
  constructor() {
    this.deps = {} as any;
  }
  async InitiateDeps() {
    this.deps = await InitiateDependencies();
    this.depsCheck = true;
  }
  Listen() {
    if (this.depsCheck)
      this.srv.listen(this.config.port, () => {
        Logs.info(`api listening on port ${this.config.port}`);
      });
    else {
      Logs.error("dependencies not initialized, call .InitiateDeps() first");
    }
  }

  private _initServer() {
    const srv = express();
    srv.enable("trust proxy");
    srv.use(express.json());
    srv.use(express.urlencoded({ extended: true }));

    // routes
    for (const route in ApiRoutes) {
      srv.use(route, ApiRoutes[route](this));
    }

    // sink
    srv.use((req, res, next) => {
      next(new Herror("not found", HerrorStatus.StatusNotFound));
    });
    srv.use((err: any, req: any, res: any) => {
      const status = err.status || err.responseStatus.statusCode || 500;
      const message = err.message || err.responseStatus.message || "error";
      res.status(status);
      res.send({
        isError: true,
        status: status,
        message: message,
      });
    });
    return srv;
  }

  SendRes(
    res: Response,
    resData: {
      status: number;
      data?: any;
      message?: string;
    }
  ) {
    res.setHeader("Content-Type", "application/json");
    res.status(resData.status).send(
      ToJson({
        data: resData.data,
        message: resData.message,
        is_error: false,
      })
    );
  }
  SendError(
    res: Response,
    resData: {
      status: number;
      data?: any;
      message?: string;
    }
  ) {
    res.setHeader("Content-Type", "application/json");
    res.status(resData.status).send(
      ToJson({
        data: resData.data,
        message: resData.message,
        is_error: true,
      })
    );
  }
  InjectTo<T>(handlers: IRouteHandler<T>[]) {
    const router = Router();
    handlers.forEach((handler) => {
      router.use((req, res, next) => {
        return handler(req as any, res, next, this);
      });
    });
    return router;
  }
}
