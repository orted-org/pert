import RouteHandler from "../TI/RouteHandlerType";
import { ITodoStore, TodoDAO } from "../DB/DAO.Todo";
import { DB } from "../DB/DB.Engine";
import { Express } from "express";
import { NextFunction, Response, Request } from "express";
import { IConf } from "./ConfigInit";
import { KV } from "../DB/DB.KV";

class App {
  private DB: DB;
  Srv?: Express;
  TodoDAO: ITodoStore;
  Conf: IConf;
  KV: KV;
  constructor(db: DB, conf: IConf, kv: KV, srv?: Express) {
    this.DB = db;
    this.Srv = srv;
    this.Conf = conf;
    this.KV = kv;

    this.TodoDAO = new TodoDAO(this.DB);
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
    this.DB.Close();
  }
}

export default App;
