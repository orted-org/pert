import { NextFunction, Response, Request } from "express";
import RouteHandler from "../TI/RouteHandlerType";
import { IDBStore } from "../DB/DB.DB";
import { Express } from "express";
import { IConf } from "./ConfigInit";
import { KV, IKVStore } from "../DB/DB.KV";

class App {
  db: IDBStore;
  srv: Express;
  conf: IConf;
  kv: IKVStore;
  constructor(conf: IConf, db: IDBStore, kv: IKVStore, srv: Express) {
    this.db = db;
    this.srv = srv;
    this.conf = conf;
    this.kv = kv;
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
