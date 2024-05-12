import mongoose, { Document, Schema } from "mongoose";

export interface Recipe extends Document {
    userid: string;
    name: string;
    ingredients: string;
    instructions: string;
    time: string;
}

const RecipeSchema: Schema = new Schema({
    userid: { type: String, required: true },
    name: { type: String, required: true },
    ingredients: { type: String, required: true },
    instructions: { type: String, required: true },
    time: {type: String, required: true}
});

const RecipeModel = (mongoose.models.Recipe as mongoose.Model<Recipe>) || (mongoose.model<Recipe>("Recipe", RecipeSchema))

export default RecipeModel;