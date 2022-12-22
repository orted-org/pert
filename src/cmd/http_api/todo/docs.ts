// WIP
import { ApiDocRegistry } from "../../../docs/zod_openapi.setup";
import { TodoCreateValidator, TodoUpdateValidator } from "./validation";
const TodoCreateSchema = ApiDocRegistry.register("Todo", TodoCreateValidator);
const TodoUpdateSchema = ApiDocRegistry.register(
  "UpdateTodo",
  TodoUpdateValidator
);
export default function RegisterDoc() {
  ApiDocRegistry.registerPath({
    method: "post",
    path: "/todo/",
    summary: "Creates a todo",
    request: {
      body: {
        required: true,
        content: {
          "application/json": {
            schema: TodoCreateSchema,
          },
        },
      },
    },
    responses: {
      200: {
        description: "OK",
        content: {
          "application/json": {
            schema: TodoCreateSchema,
          },
        },
      },
      401: {
        description: "Validation Error",
      },
    },
  });

  // update todo
  ApiDocRegistry.registerPath({
    method: "put",
    path: "/todo/",
    summary: "Updates a todo",
    request: {
      body: {
        required: true,
        content: {
          "application/json": {
            schema: TodoUpdateSchema,
          },
        },
      },
    },
    responses: {
      200: {
        description: "OK",
        content: {
          "application/json": {
            schema: TodoUpdateSchema,
          },
        },
      },
    },
  });
}
