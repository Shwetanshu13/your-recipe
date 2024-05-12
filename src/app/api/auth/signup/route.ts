import UserModel from "@/model/User.model";
import dbConnect from "@/lib/dbConnect";
import bcrypt from "bcryptjs";
import ApiResponse from "@/utils/ApiResponse";
import { sendVerificationEmail } from "@/helper/sendVerificationEmail";

export async function POST(request: Request) {
    await dbConnect();

    try {
        const { name, email, password } = await request.json();

        const userAlreadyRegistered = await UserModel.findOne({ email: email });

        if (userAlreadyRegistered && userAlreadyRegistered.verified) {
            return ApiResponse(false, "User already registered", 400);
        } else {
            const hashedPassword = await bcrypt.hash(password, 10);

            const otp = Math.floor(100000 + Math.random() * 900000).toString();

            const otpExpiry = new Date();
            otpExpiry.setMinutes(otpExpiry.getMinutes() + 15);

            
            const emailResponse:any = await sendVerificationEmail(email, otp, name);
            
            if (!emailResponse.id) {
                return ApiResponse(false, "Error sending verification email to the user", 500);
            }
            
            const newUser = new UserModel({
                name,
                email,
                password: hashedPassword,
                otp,
                otpExpiry,
            });

            await newUser.save();
            
            return ApiResponse(true, "User registered successfully. Please verify your account.", 201);
        }

    } catch (error) {
        console.log("Error in signup route: ", error);

        return ApiResponse(false, "Error registering user", 500);
    }
}
