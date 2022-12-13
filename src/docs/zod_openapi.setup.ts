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

// const UserIdSchema = ApiDocRegistry.registerParameter(
//   "UserId",
//   z.string().openapi({
//     param: {
//       name: "id",
//       in: "path",
//     },
//     example: "1212121",
//   })
// );
// const UserSchema = ApiDocRegistry.register(
//   "User",
//   z.object({
//     id: z.string().openapi({
//       example: "1212121",
//     }),
//     name: z.string().openapi({
//       example: "John Doe",
//     }),
//     age: z.number().openapi({
//       example: 42,
//     }),
//   })
// );

// const bearerAuth = ApiDocRegistry.registerComponent(
//   "securitySchemes",
//   "bearerAuth",
//   {
//     type: "http",
//     scheme: "bearer",
//     bearerFormat: "JWT",
//   }
// );

// ApiDocRegistry.registerPath({
//   method: "get",
//   path: "/users/{id}",
//   description: "Get user data by its id",
//   summary: "Get a single user",
//   security: [{ [bearerAuth.name]: [] }],
//   request: {
//     params: z.object({ id: UserIdSchema }),
//   },
//   responses: {
//     200: {
//       description: "Object with user data.",
//       content: {
//         "application/json": {
//           schema: UserSchema,
//         },
//       },
//     },
//     204: {
//       description: "No content - successful operation",
//     },
//   },
// });

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
