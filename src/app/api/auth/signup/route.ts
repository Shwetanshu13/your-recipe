import UserModel from "@/model/User.model";
import dbConnect from "@/lib/dbConnect";
import bcrypt from "bcryptjs";
import ApiResponse from "@/utils/ApiResponse";

export async function POST(request: Request) {
  await dbConnect();

  try {
    const { name, email, password } = await request.json();

    const userAlreadyRegistered = await UserModel.findOne({ email: email });

    if (userAlreadyRegistered?.verified) {
      return ApiResponse(false, "User already registered", 400);
    } else if (userAlreadyRegistered && !userAlreadyRegistered.verified) {
      return ApiResponse(
        false,
        "User already registered but not verified. Please check your email for the verification code and verify your account.",
        400
      );
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const verificationCode = Math.floor(Math.random() * 1000000).toString();

      const newUser = new UserModel({
        name,
        email,
        password: hashedPassword,
        verificationCode,
      });

      await newUser.save();

      return ApiResponse(true, "User registered successfully.", 201, {
        newUser,
      });
    }
  } catch (error) {
    // console.log("Error in signup route: ", error);

    return ApiResponse(false, "Error registering user", 500);
  }
}
