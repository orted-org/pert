import { z } from "zod";

const v = z.object({
  title: z.string().min(3, "Title too small"),
});

export const validateCreateTodo = z.object({
  body: z.object({ title: z.string().min(3, "Title too small") }),
});

export const validateUpdateTodo = z.object({
  body: z.object({
    id: z.number({ required_error: "id missing" }),
    title: z.string().min(3, "Title too small.").optional(),
    description: z.string().optional(),
    is_completed: z.boolean().optional(),
    are_you_sure: z.boolean(),
  }),
});

export const validateDeleteTodo = z.object({
  query: z.object({
    id: z.string().transform((s) => {
      return Number(s);
    }),
  }),
});
