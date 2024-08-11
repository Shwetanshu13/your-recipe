"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";

type RecipeCardProp = {
  _id?: string;
  name: string;
  ingredients: string;
  instructions: string;
  time: string;
};

const RecipeCard = ({
  name,
  ingredients,
  instructions,
  time,
  _id,
}: RecipeCardProp) => {
  const deleteRecipe = async (id: string) => {
    try {
      const response = await axios.delete(`/api/delete-recipe/${id}`);
      // console.log(response)
    } catch (error) {
      // console.log(error)
    }
  };

  const router = useRouter();

  return (
    <div className="shadow-lg cursor-pointer flex flex-col gap-3 p-7 bg-gray-200 hover:shadow-2xl rounded-xl">
      <div
        className="flex flex-col cursor-pointer"
        onClick={() => router.push(`/recipe/${_id}`)}
      >
        <div className="font-bold text-xl mb-2">{name}</div>
        <p className="text-gray-700 text-base">
          <b>Ingredients </b>: {ingredients.slice(0, 25)}
          {ingredients.length > 25 ? "..." : ""}
        </p>
        <p className="text-gray-700 text-base">
          <b>Instructions </b>: {instructions.slice(0, 25)}
          {ingredients.length > 25 ? "..." : ""}
        </p>
        <h3 className="text-gray-500 font-semibold">Time : {time}</h3>
      </div>
      <div className="flex">
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => {
            deleteRecipe(_id!);
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default RecipeCard;
