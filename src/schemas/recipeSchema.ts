import { z } from "zod";

export const recipeSchema = z.object({
  name: z.string({ message: "Name is required" }),
  ingredients: z.string({ message: "Ingredients are required" }),
  instructions: z.string({ message: "Instructions are required" }),
  time: z.string({ message: "Time is required" }),
  dishType: z.enum(["veg", "nonVeg"], {
    errorMap: () => ({ message: "Dish Type is required" }),
  }),
  imageLink: z.string().url().optional(),
  refVideoLink: z.string().url().optional(),
  tags: z.array(z.string()).optional(),
  course: z
    .enum([
      "Breakfast",
      "Lunch",
      "Dinner",
      "Snack",
      "Starter",
      "Main Course",
      "Dessert",
      "Drink",
      "Others",
    ])
    .refine((value) => !!value, { message: "Course is required" }),
  cuisine: z
    .enum([
      "North Indian",
      "South Indian",
      "American",
      "Continental",
      "Chinese",
      "Korean",
      "Others",
    ])
    .refine((value) => !!value, { message: "Cuisine is required" }),
  viewers: z.array(z.string()).optional(),
});
