import dbConnect from "@/lib/dbConnect";
import RecipeModel from "@/model/Recipe.model";
import ApiResponse from "@/utils/ApiResponse";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import { toast } from "@/components/ui/use-toast";

export async function DELETE(
  request: Request,
  { params }: { params: { recipeId: string } }
) {
  const recipeId = params.recipeId;
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
    const recipie = await RecipeModel.deleteOne({ _id: recipeId });

    if (recipie.deletedCount === 0) {
      return ApiResponse(false, "Recipe not found", 404);
    } else {
      toast({
        title: "Recipe deleted successfully",
      });
    }

    return ApiResponse(true, "Recipe deleted successfully", 200);
  } catch (error) {
    // console.log(error)
    return ApiResponse(false, "An error occured while fetching recipie", 500);
  }
}
