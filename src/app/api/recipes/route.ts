import dbConnect from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";
import { authOptions } from "../auth/[...nextauth]/options";
import ApiResponse from "@/utils/ApiResponse";
import mongoose from "mongoose";
import RecipeModel from "@/model/Recipe.model";



export async function GET(request:NextRequest) {
    await dbConnect();
    
    const session = await getServerSession(authOptions)
    const user = session?.user

    if(!session || !user){
        return ApiResponse(false, "You need to be logged in to view this page", 401);
    }

    // const userId = new mongoose.Types.ObjectId(user._id);
    const userId = user._id;
    console.log(userId)

    try {

        const recipies = await RecipeModel.find({userid: userId});

        return Response.json(
            {
                success: true,
                messages: recipies
            },
            {
                status: 200
            }
        )

    } catch (error) {
        console.log(error)
        return ApiResponse(false, "An error occured while fetching recipies", 500);
    }




}