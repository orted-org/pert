import { z } from "zod";

export const TodoCreateValidator = z.object({
  body: z.object({ title: z.string().min(3, "Title too small"), isCompleted: z.boolean() }),
});
