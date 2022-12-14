import path from "path";
import { readdirSync } from "fs";
import { WriteYamlDocumentation } from "../../docs/zod_openapi.setup";
const controllersPath = path.join(__dirname, "../http_api");

const pathsToImport = readdirSync(controllersPath, { withFileTypes: true })
  .filter((f) => f.isDirectory())
  .map((f) => `../http_api/${f.name}/docs`);

console.log(pathsToImport);

pathsToImport.forEach((path) => {
  import(path)
    .then((a) => {
      a.default();
      WriteYamlDocumentation();
    })
    .catch((err) => {
      console.log(`did not find any module ${path}, skipping...`);
    });
});
