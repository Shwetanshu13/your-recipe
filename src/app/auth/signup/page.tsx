"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from "@/schemas/signupSchema";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import axios from "axios";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

const Signup = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const registerUser = async (data: z.infer<typeof signupSchema>) => {
    setIsSubmitting(true);

    try {
      const response = await axios.post("/api/auth/signup", data);
      if (response.data.success) {
        // console.log("User registered:", response.data);
        toast({
          title: "User registered",
          description: response.data.message,
        });

        const newUser = response.data.data.newUser;
        if (newUser) {
          const emailData = {
            name: newUser.name,
            email: newUser.email,
            verificationCode: newUser.verificationCode,
          };

          const emailRes = await axios.post(
            "/api/email/send-verification-email",
            emailData
          );

          if (emailRes.data.success) {
            toast({
              title: "Verification email sent",
              description: emailRes.data.message,
            });
            router.push("/auth/verify-email");
          } else {
            // console.log(emailRes.data);
            toast({
              title: "Error",
              description: emailRes.data.message,
              variant: "destructive",
            });
            const deleteUserRes = await axios.post("/api/auth/delete-user", {
              userid: newUser._id,
            });
            if (deleteUserRes.data.success) {
              toast({
                title: "Error in signup",
                description:
                  "There was an error sending the verification email. Please try registering after some time.",
                variant: "destructive",
              });
            } else {
              // console.log(deleteUserRes.data);
            }
          }
        } else {
          toast({
            title: "Error",
            description: "User registration failed. No user data returned.",
            variant: "destructive",
          });
        }
      } else {
        toast({
          title: "Error",
          description: response.data.message,
          variant: "destructive",
        });
      }
    } catch (error: any) {
      // console.log("Error in registerUser:", error);
      toast({
        title: "Error",
        description: error.response?.data?.message || error.message,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="w-7/12 hidden lg:block">
        <div className="h-full flex justify-center items-center">
          <Image
            width={1000}
            height={1}
            src="/images/recipieBook.jpg"
            alt="Signup"
            className="h-full"
          />
        </div>
      </div>
      <div className="w-full lg:w-5/12 flex align-middle">
        <div className="p-10 bg-white shadow-xl rounded-lg w-2/3 h-fit my-auto mx-auto">
          <div className="flex justify-center items-center flex-col mx-auto gap-3">
            <h1 className="text-3xl font-bold">My Recipe Book</h1>
            <h3 className="text-xl text-center font-semibold">
              {isSubmitting ? "Processing ..." : "Sign Up"}
            </h3>
            <form
              onSubmit={handleSubmit(registerUser)}
              className="space-y-6 w-full"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  {...register("name")}
                  className="p-2 border mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                {errors.name && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.name.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  {...register("email")}
                  className="p-2 border mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                {errors.email && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  {...register("password")}
                  className="p-2 border mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                {errors.password && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  </>
                ) : (
                  "Sign Up"
                )}
              </Button>
            </form>
            <div className="mt-4">
              <h3 className="my-3 text-center text-gray-500">
                Already have an account?{" "}
                <Link href="/auth/login" className=" text-black">
                  Log In
                </Link>
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
