import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User.model";
import ApiResponse from "@/utils/ApiResponse";

export async function DELETE(req: Request) {
  await dbConnect();

  try {
    const { userid } = await req.json();

    const deleteRes = await UserModel.findByIdAndDelete(userid);

    if (!deleteRes) {
      return ApiResponse(false, "Error deleting user", 400);
    }

    return ApiResponse(true, "User deleted successfully", 200);
  } catch (error: any) {
    return ApiResponse(false, error.message, 500);
  }
}
