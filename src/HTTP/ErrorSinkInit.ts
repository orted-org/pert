import { makeError, coatError } from "../Helpers/ErrorHandling/MakeError";
import App from "./App";
function SinkErrorFor(app: App) {
  app.srv.use((req, res, next) => {
    next(new makeError.NotFound());
  });

  app.srv.use((err: any, req: any, res: any, next: any) => {
    err = coatError(err);
    res.status(err.status || 500);
    res.send({
      status: err.status,
      message: err.message,
    });
  });
}

export default SinkErrorFor;
