import mongoose, { Schema, Document } from "mongoose";

export interface User extends Document {
  username: string;
  name: string;
  email: string;
  password: string;
  totalRecipes: number;
  yourRecipes: number;
  sharedRecipes: number;
  favourites: string[];
}

const UserSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  totalRecipes: { type: Number, default: 0 },
  yourRecipes: { type: Number, default: 0 },
  sharedRecipes: { type: Number, default: 0 },
  favourites: { type: [Schema.Types.ObjectId], ref: "Recipe" },
});

const UserModel =
  (mongoose.models.User as mongoose.Model<User>) ||
  mongoose.model<User>("User", UserSchema);

export default UserModel;
