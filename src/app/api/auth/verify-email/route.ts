import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User.model";
import ApiResponse from "@/utils/ApiResponse";

export async function POST(req: Request, res: Response) {
  dbConnect();

  try {
    const { email, code } = await req.json();

    const user = await UserModel.findOne({ email });

    if (!user) {
      return ApiResponse(false, "User not found", 404);
    }

    if (user.verificationCode !== code) {
      return ApiResponse(false, "Invalid verification code", 400);
    }

    user.verified = true;
    await user.save();

    return ApiResponse(true, "Email verified successfully", 200);
  } catch (error) {
    // console.log("Error in verify email route: ", error);

    return ApiResponse(false, "Error verifying email", 500);
  }
}
