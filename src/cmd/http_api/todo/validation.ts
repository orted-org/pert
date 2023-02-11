import { z } from "zod";
import { CreateValidator } from "../app/factory";

export const TodoCreateValidator = z.object({
  body: z.object({ title: z.string().min(3, "Title too small") }),
});
