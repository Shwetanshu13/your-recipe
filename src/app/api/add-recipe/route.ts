import dbConnect from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";
import { authOptions } from "../auth/[...nextauth]/options";
import ApiResponse from "@/utils/ApiResponse";
import RecipeModel from "@/model/Recipe.model";

export async function POST(request: NextRequest) {
  await dbConnect();

  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!session || !user) {
    return ApiResponse(
      false,
      "You need to be logged in to view this page",
      401
    );
  }

  const { name, ingredients, instructions, time } = await request.json();

  try {
    const newRecipe = new RecipeModel({
      userid: user._id,
      name: name.trim(),
      ingredients: ingredients.trim(),
      instructions: instructions.trim(),
      time: time.trim(),
    });

    await newRecipe.save();

    return ApiResponse(true, "Recipe added successfully", 201);
  } catch (error) {
    console.log(error);
    return ApiResponse(false, "An error occured while adding recipe", 505);
  }
}
