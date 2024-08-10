import { z } from "zod";

export const recipeSchema = z.object({
  name: z.string({ message: "Name is required" }),
  ingredients: z.string({ message: "Ingredients are required" }),
  instructions: z.string({ message: "Instructions are required" }),
  time: z.string({ message: "Time is required" }),
});
