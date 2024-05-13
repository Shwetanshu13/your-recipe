import UserModel from "@/model/User.model";
import dbConnect from "@/lib/dbConnect";
import bcrypt from "bcryptjs";
import ApiResponse from "@/utils/ApiResponse";

export async function POST(request: Request) {
    await dbConnect();

    try {
        const { name, email, password } = await request.json();

        const userAlreadyRegistered = await UserModel.findOne({ email: email });

        if (userAlreadyRegistered) {
            return ApiResponse(false, "User already registered", 400);
        } else {
            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = new UserModel({
                name,
                email,
                password: hashedPassword,
            });

            await newUser.save();
            
            return ApiResponse(true, "User registered successfully. Please verify your account.", 201);
        }

    } catch (error) {
        console.log("Error in signup route: ", error);

        return ApiResponse(false, "Error registering user", 500);
    }
}
