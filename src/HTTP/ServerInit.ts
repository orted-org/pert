import express, { Application, Express } from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import { IConf } from "./ConfigInit";
const cors = require("cors") as any;
function ServerInit(conf: IConf): Express {
  const srv = express();

  //Security against xss
  const xss = require("xss-clean") as any;
  srv.use(xss());

  // configuring general security and csp
  if (!conf.primaryInfo.isDevMode) srv.use(helmet());

  // hiding server details
  srv.use((req, res, next) => {
    res.setHeader("X-Powered-By", "Java Spring");
    next();
  });

  //for nginx proxy setup
  srv.enable("trust proxy");

  // parsing body
  srv.use(express.json());
  srv.use(express.urlencoded({ extended: true }));
  srv.use(cookieParser());

  //HTTP Logging
  console.log(
    conf.primaryInfo.isDevMode
      ? "configured for Dev Mode"
      : "configured for Production Mode"
  );

  if (conf.primaryInfo.isDevMode) srv.use(morgan("dev"));
  else srv.use(morgan("tiny"));

  return srv;
}

export default ServerInit;
