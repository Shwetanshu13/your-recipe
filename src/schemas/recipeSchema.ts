import { z } from "zod";

export const recipeSchema = z.object({
    name: z.string(),
    ingredients: z.string(),
    instructions: z.string(),
    time:z.string()
});
