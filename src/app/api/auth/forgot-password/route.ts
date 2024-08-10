import dbConnect from "@/lib/dbConnect";
import ForgotPasswordModel from "@/model/ForgotPassword.model";
import UserModel from "@/model/User.model";
import ApiResponse from "@/utils/ApiResponse";
import bcrypt from "bcryptjs";

export async function POST(req: Request, res: Response) {
  await dbConnect();

  try {
    const { email, otp, password } = await req.json();

    const forgotPasswordUser = await ForgotPasswordModel.findOne({
      email,
      otp,
    });

    if (!forgotPasswordUser) {
      return ApiResponse(false, "Invalid OTP or user", 400);
    }

    const user = await UserModel.findOne({ email });

    if (!user) {
      return ApiResponse(
        false,
        "User not found. Please check the email address.",
        404
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;
    await user.save();

    return ApiResponse(true, "Password reset successfully", 200);
  } catch (error) {
    console.log("Error in forgot-password route: ", error);
    return ApiResponse(
      false,
      "Error verifying forgot password OTP and reseting password.",
      500
    );
  }
}
