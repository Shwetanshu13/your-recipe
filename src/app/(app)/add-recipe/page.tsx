"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { recipeSchema } from "@/schemas/recipeSchema";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import axios from "axios";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import Image from "next/image";

const AddRecipe = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(recipeSchema),
    defaultValues: {
      name: "",
      ingredients: "",
      instructions: "",
      time: "",
      dishType: "veg",
      imageLink: "",
      refVideoLink: "",
      tags: [],
      course: "",
      cuisine: "",
      viewers: [],
    },
  });

  const addRecipe = async (data: z.infer<typeof recipeSchema>) => {
    setIsSubmitting(true);

    try {
      const response = await axios.post("/api/add-recipe", data);
      toast({
        title: "Recipe added",
        description: response.data.message,
      });
      router.push("/recipes");
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
      <div className="w-5/12 hidden lg:block">
        <div className="h-full flex justify-center items-center">
          <Image
            width={1000}
            height={1}
            src="/images/recipe.jpg"
            alt="Sample Recipe Pic"
            className="h-full"
          />
        </div>
      </div>
      <div className="w-full lg:w-7/12 flex align-middle">
        <div className="p-10 bg-white shadow-xl rounded-lg w-5/6 h-fit my-auto mx-auto">
          <div className="flex justify-center items-center flex-col mx-auto gap-3">
            <h1 className="text-3xl font-bold">My Recipe Book</h1>
            <h3 className="text-xl text-center font-semibold">
              {isSubmitting ? "Adding ..." : "Add Recipe"}
            </h3>
            <form
              onSubmit={handleSubmit(addRecipe)}
              className="space-y-6 w-full"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Title
                </label>
                <input
                  type="text"
                  {...register("name")}
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                />
                {errors.name && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.name.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Ingredients
                </label>
                <textarea
                  {...register("ingredients")}
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border resize-none"
                />
                {errors.ingredients && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.ingredients.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Instructions
                </label>
                <textarea
                  {...register("instructions")}
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border resize-none"
                />
                {errors.instructions && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.instructions.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Time
                </label>
                <input
                  type="text"
                  {...register("time")}
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                />
                {errors.time && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.time.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Dish Type
                </label>
                <select
                  {...register("dishType")}
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                >
                  <option value="">Select Dish Type</option>
                  <option value="veg">Veg 🟢</option>
                  <option value="nonVeg">Non-Veg 🔴</option>
                </select>
                {errors.dishType && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.dishType.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Image Link
                </label>
                <input
                  type="text"
                  {...register("imageLink")}
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                />
                {errors.imageLink && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.imageLink.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Reference Video Link
                </label>
                <input
                  type="text"
                  {...register("refVideoLink")}
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                />
                {errors.refVideoLink && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.refVideoLink.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Tags
                </label>
                <input
                  type="text"
                  {...register("tags")}
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                />
                {errors.tags && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.tags.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Course
                </label>
                <select
                  {...register("course")}
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                >
                  <option value="">Select Course</option>
                  <option value="Breakfast">Breakfast</option>
                  <option value="Lunch">Lunch</option>
                  <option value="Dinner">Dinner</option>
                  <option value="Snack">Snack</option>
                  <option value="Starter">Starter</option>
                  <option value="Main Course">Main Course</option>
                  <option value="Dessert">Dessert</option>
                  <option value="Drink">Drink</option>
                  <option value="Others">Others</option>
                </select>
                {errors.course && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.course.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Cuisine
                </label>
                <select
                  {...register("cuisine")}
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                >
                  <option value="">Select Cuisine</option>
                  <option value="North Indian">North Indian</option>
                  <option value="South Indian">South Indian</option>
                  <option value="American">American</option>
                  <option value="Continental">Continental</option>
                  <option value="Chinese">Chinese</option>
                  <option value="Korean">Korean</option>
                  <option value="Others">Others</option>
                </select>
                {errors.cuisine && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.cuisine.message}
                  </p>
                )}
              </div>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2 mt-4"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  </>
                ) : (
                  "Add Recipe"
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddRecipe;
