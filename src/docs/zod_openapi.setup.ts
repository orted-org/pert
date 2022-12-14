import {
  OpenAPIGenerator,
  OpenAPIRegistry,
  extendZodWithOpenApi,
} from "@asteasolutions/zod-to-openapi";

import { z } from "zod";
import * as yaml from "yaml";
import * as fs from "fs";

extendZodWithOpenApi(z);

export const ApiDocRegistry = new OpenAPIRegistry();

function GetOpenApiDocumentation() {
  const generator = new OpenAPIGenerator(ApiDocRegistry.definitions, "3.0.0");

  return generator.generateDocument({
    info: {
      version: "1.0.0",
      title: "My API",
      description: "This is the API",
    },
    servers: [{ url: "v1" }],
  });
}

export function WriteYamlDocumentation() {
  const docs = GetOpenApiDocumentation();
  const fileContent = yaml.stringify(docs);
  fs.writeFileSync(`${__dirname}/openapi-docs.yml`, fileContent, {
    encoding: "utf-8",
  });
}
