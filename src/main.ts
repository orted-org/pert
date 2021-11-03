import { ServerInit } from "./HTTP/ServerInit";
import SinkErrorFor from "./HTTP/ErrorSinkInit";
import HandleRoutesFor from "./HTTP/RoutersInit";
import ConnectToDB from "./Helpers/Connectors/ConnectDB";
import App from "./HTTP/App";
import { Conf } from "./HTTP/ConfigInit";
import ConnectToRedis from "./Helpers/Connectors/ConnectRedis";

async function Init() {
  const conf = Conf;
  const srv = ServerInit(conf);
  const db = await ConnectToDB(conf);
  const kv = await ConnectToRedis(conf);

  // initialize new app
  const app = new App(db, conf, kv, srv);
  HandleRoutesFor(app);
  SinkErrorFor(app);
  return app;
}

//Listening
Init()
  .then((app) => {
    if (app.srv)
      app.srv.listen(app.conf.primaryInfo.serverPort, () => {
        console.log(`Node app running at ${app.conf.primaryInfo.serverPort}`);
      });
  })
  .catch((err) => {
    console.log(err);
  });
