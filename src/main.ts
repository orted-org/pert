import { ServerInit } from "./HTTP/ServerInit";
import SinkErrorFor from "./HTTP/ErrorSinkInit";
import HandleRoutesFor from "./HTTP/RoutersInit";
import ConnectToDB from "./Helpers/Connectors/ConnectDB";
import App from "./HTTP/App";
import { Conf } from "./HTTP/ConfigInit";

async function Init() {
  const conf = Conf;
  const srv = ServerInit(conf);
  const db = await ConnectToDB(conf);

  // initialize new app
  const app = new App(db, conf, srv);
  HandleRoutesFor(app);
  SinkErrorFor(app);
  return app;
}

//Listening
Init()
  .then((app) => {
    if (app.Srv)
      app.Srv.listen(app.Conf.primaryInfo.serverPort, () => {
        console.log(`Node app running at ${app.Conf.primaryInfo.serverPort}`);
      });
  })
  .catch((err) => {
    console.log(err);
  });
