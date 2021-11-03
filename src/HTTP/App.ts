import { NextFunction, Response, Request } from "express";
import RouteHandler from "../TI/RouteHandlerType";
import { DB } from "../DB/DB.DB";
import { Express } from "express";
import { IConf } from "./ConfigInit";
import { KV } from "../DB/DB.KV";

class App {
  db: DB;
  srv?: Express;
  conf: IConf;
  // kv: KV;
  constructor(db: DB, conf: IConf, srv?: Express) {
    this.db = db;
    this.srv = srv;
    this.conf = conf;
    // this.kv = kv;
  }
  InHandler(handler: RouteHandler) {
    return (req: Request, res: Response, next: NextFunction) => {
      return handler(req, res, next, this);
    };
  }
  SendRes(res: Response, status: number, data?: any, message?: string) {
    res.status(status).send({ status, data, message });
  }
  ShutDown() {
    this.db.Close();
  }
}

export default App;
