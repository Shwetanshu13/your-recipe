import dbConnect from "@/lib/dbConnect";
import RecipeModel from "@/model/Recipe.model";
import ApiResponse from "@/utils/ApiResponse";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";

export async function GET(request: Request) {
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

  try {
    const { searchParams } = new URL(request.url);
    const queryParams = {
      recipieId: searchParams.get("recipieId"),
    };

    const recipeId = queryParams.recipieId;

    const recipie = await RecipeModel.findById(recipeId);

    return ApiResponse(true, "Recipe fetched successfully", 200, recipie);
  } catch (error) {
    // console.log(error)
    return ApiResponse(false, "An error occured while fetching recipie", 500);
  }
}
