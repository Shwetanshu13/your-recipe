import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User.model";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { AuthOptions } from "next-auth";

const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "Enter Email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials: any): Promise<any> {
                await dbConnect();

                try {
                    const user = await UserModel.findOne({ email: credentials.identifier });

                    if (!user) {
                        throw new Error("No user found with this email address");
                    }

                    const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);

                    if (!isPasswordCorrect) {
                        throw new Error("Password is incorrect");
                    }

                    return user;

                } catch (error) {
                    console.log("Error in Login " + error);
                    return null;
                }
            }
        })
    ],
    callbacks: {
        async jwt({token, user}) {
            if (user) {
                token._id = user._id;
                token.name = user.name;
            }

            return token;
        },
        async session({session, token}) {
            // session.user.id = token.id;
            if (token) {
                session.user._id = token._id;
                session.user.name = token.name;
            }

            return session;
        }
    
    },
    pages: {
        signIn: "/auth/login",
    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
};

export {authOptions} 