import { ApiApp } from "./app/app";

const apiApp = new ApiApp();
apiApp
  .InitiateDeps()
  .then(() => {
    apiApp.Listen();
  })
  .catch((err) => {
    console.log(err);
  });
