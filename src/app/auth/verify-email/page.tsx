"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { verifyCodeSchema } from "@/schemas/verifyCodeSchema";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import axios from "axios";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

const VerifyEmail = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(verifyCodeSchema),
    defaultValues: {
      email: "",
      code: "",
    },
  });

  const verifyEmail = async (data: z.infer<typeof verifyCodeSchema>) => {
    setIsSubmitting(true);

    try {
      const response = await axios.post("/api/auth/verify-email", data);
      toast({
        title: "Email verified",
        description: response.data.message,
      });
      if (response.data.success) {
        router.push("/auth/login");
      }
    } catch (error: any) {
      console.log(error);
      toast({
        title: "Error",
        description: error.response.data?.message,
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
            src="/images/otp.jpg"
            alt="Verify Email"
            className="h-full"
          />
        </div>
      </div>
      <div className="w-full lg:w-5/12 flex align-middle">
        <div className="p-10 bg-white shadow-xl rounded-lg w-2/3 h-fit my-auto mx-auto">
          <div className="flex justify-center items-center flex-col mx-auto gap-3">
            <h1 className="text-3xl font-bold">Verify Your Email</h1>
            <h3 className="text-xl text-center font-semibold">
              {isSubmitting ? "Processing ..." : "Verify Email"}
            </h3>
            <form
              onSubmit={handleSubmit(verifyEmail)}
              className="space-y-6 w-full"
            >
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
                  Verification Code
                </label>
                <input
                  type="text"
                  {...register("code")}
                  className="p-2 border mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                {errors.code && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.code.message}
                  </p>
                )}
              </div>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  </>
                ) : (
                  "Verify Email"
                )}
              </Button>
            </form>
            <div className="mt-4">
              <h3 className="my-2 text-center text-gray-500">
                Already verified?{" "}
                <Link href="/auth/login" className=" text-black">
                  Log In
                </Link>
              </h3>
              <h3 className="my-2 text-center text-gray-500">
                Don&apos;t have an account?{" "}
                <Link href="/auth/signup" className=" text-black">
                  Register
                </Link>
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
