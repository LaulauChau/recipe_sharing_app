import { z } from "zod";

export const createRecipeDto = z.object({
  name: z.string().min(3),
  ingredients: z
    .array(
      z
        .string()
        .refine(
          (value) => /\d+(?:[a-zA-Z]+\s+|[\s]+)(?:of\s+)?[a-zA-Z]+/.test(value),
          "Invalid ingredient",
        ),
    )
    .min(1),
  steps: z.array(z.string().min(3)).min(1),
  difficulty: z.enum(["easy", "medium", "hard"]),
  time: z.object({
    preparation: z.number().int().positive(),
    cooking: z.number().int().positive(),
  }),
});

export type CreateRecipeDto = z.infer<typeof createRecipeDto>;

export const findRecipeDto = z.object({
  id: z.string().min(1),
});

export type FindRecipeDto = z.infer<typeof findRecipeDto>;

export const updateRecipeDto = createRecipeDto.partial();

export type UpdateRecipeDto = z.infer<typeof updateRecipeDto>;
