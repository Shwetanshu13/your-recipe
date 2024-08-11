import dbConnect from "@/lib/dbConnect";
import { getResetPasswordEmailHtml } from "@/mails/resetPasswordOtp";
import ForgotPasswordModel from "@/model/ForgotPassword.model";
import UserModel from "@/model/User.model";
import ApiResponse from "@/utils/ApiResponse";
import { sendEmail } from "@/utils/nodemailer";

export async function POST(req: Request, res: Response) {
  await dbConnect();

  try {
    const { email } = await req.json();

    const user = await UserModel.findOne({ email });

    if (!user) {
      return ApiResponse(
        false,
        "User not found. Please check the email address.",
        404
      );
    }

    if (!user.verified) {
      return ApiResponse(
        false,
        "User not verified. Kindly verify yourself before reseting the password.",
        400
      );
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const newForgotPasswordUser = new ForgotPasswordModel({
      email,
      otp,
    });

    await newForgotPasswordUser.save();

    const emailHtml = getResetPasswordEmailHtml(user.name, otp);

    await sendEmail(email, "Password Reset Request", emailHtml);

    return ApiResponse(true, "Reset password otp sent successfully", 201);
  } catch (error) {
    // console.log("Error in send-forgot-password-otp route: ", error);
    return ApiResponse(false, "Error sending forgot password OTP", 500);
  }
}
