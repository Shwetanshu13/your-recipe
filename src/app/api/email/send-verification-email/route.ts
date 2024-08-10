import { NextRequest } from "next/server";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User.model";
import ApiResponse from "@/utils/ApiResponse";
import { sendEmail } from "@/utils/nodemailer";
import { getVerificationEmailHtml } from "@/mails/verificationEmailTemplate";

export async function POST(request: NextRequest) {
  await dbConnect();

  try {
    const { name, email, verificationCode } = await request.json();

    const user = await UserModel.findOne({ email });
    if (!user) {
      return ApiResponse(false, "User not found", 404);
    }

    if (user.verified) {
      return ApiResponse(false, "User already verified", 400);
    }

    const emailHtml = getVerificationEmailHtml(name, verificationCode);

    await sendEmail(email, "Email Verification", emailHtml);

    return ApiResponse(true, "Verification email sent successfully", 200);
  } catch (error) {
    console.log("Error in send-verification-email route: ", error);
    return ApiResponse(false, "Error sending verification email", 500);
  }
}
