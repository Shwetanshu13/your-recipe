import mongoose, { Document, Schema } from "mongoose";
import { string } from "zod";

export interface Recipe extends Document {
  userid: string;
  name: string;
  ingredients: string;
  instructions: string;
  time: string;
  dishType: string;
  imageLink?: string;
  refVideoLink?: string;
  tags?: string[];
  course?: string;
  cuisine?: string;
  viewers?: string[];
}

const RecipeSchema: Schema = new Schema({
  userid: { type: String, required: true },
  name: { type: String, required: true },
  ingredients: { type: String, required: true },
  instructions: { type: String, required: true },
  time: { type: String, required: true },
  dishType: { type: string, enum: ["veg", "nonVeg"], required: true },
  imageLink: { type: String, required: false },
  refVideoLink: { type: String, required: false },
  tags: { type: [String], required: false },
  course: {
    type: String,
    enum: [
      "Breakfast",
      "Lunch",
      "Dinner",
      "Snack",
      "Starter",
      "Main Course",
      "Dessert",
      "Drink",
      "Others",
    ],
    required: true,
    default: "Others",
  },
  cuisine: {
    type: String,
    enum: [
      "North Indian",
      "South Indian",
      "American",
      "Continental",
      "Chinese",
      "Korean",
      "Others",
    ],
    required: true,
    default: "Others",
  },
  viewers: {
    type: [Schema.Types.ObjectId],
    ref: "User",
    required: false,
    default: [],
  },
});

const RecipeModel =
  (mongoose.models.Recipe as mongoose.Model<Recipe>) ||
  mongoose.model<Recipe>("Recipe", RecipeSchema);

export default RecipeModel;
