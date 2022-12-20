import { ApiApp } from "./app/app";

const apiApp = new ApiApp();
apiApp
  .InitiateDeps()
  .then(() => {
    apiApp.Listen();
  })
  .catch((err) => {
    console.error(`error listening on port ${apiApp.config.port}`, err);
  });
