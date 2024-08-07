'use client'

import { Recipe } from '@/model/Recipe.model'
import axios from 'axios'
import { Loader2 } from 'lucide-react'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const RecipeItem = () => {

    const params = useParams<{ recipeId: string }>();
    const recipeId = decodeURIComponent(params.recipeId);

    const [recipe, setRecipe] = useState<Recipe>();
    const [loading, setLoading] = useState(true);
    const [ingredients, setIngredients] = useState<string[]>([]);
    const [instructions, setInstructions] = useState<string[]>([]);

    const fetchRecipe = async () => {
        try {
            const response = await axios.get(`/api/recipeItem?recipieId=${recipeId}`);
            setRecipe(response.data.messages);
            setIngredients(response.data.messages.ingredients.split('\n'));
            setInstructions(response.data.messages.instructions.split('\n'));
            // console.log(ingredients, instructions);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRecipe();
    }, [recipeId]);

    return (
        loading ? (
            <div className="bg-gray-100 min-h-screen flex items-center justify-center">
                <div className="max-w-xl mx-auto px-4 py-8">
                    <Loader2 size={64} className='animate-spin' />
                    <h1 className="text-3xl font-bold mb-4">Loading...</h1>
                </div>
            </div>
        ) : (
            <div className="bg-gray-100 min-h-screen flex items-center justify-center">
                <div className="max-w-xl mx-auto px-4 py-8">
                    <h1 className="text-3xl font-bold mb-4">{recipe?.name}</h1>
                    <div className="mb-4">
                        <h2 className="text-xl font-bold mb-2">Ingredients:</h2>
                        <ul className="text-lg list-disc pl-5 space-y-2">
                            {ingredients.map((ingredient, index) => (
                                <li key={index} className="w-auto">{ingredient}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="mb-4">
                        <h2 className="text-xl font-bold mb-2">Instructions:</h2>
                        <ol className="text-lg list-decimal pl-5 space-y-2">
                            {instructions.map((instruction, index) => (
                                <li key={index}>{instruction}</li>
                            ))}
                        </ol>
                    </div>
                    <p><b>Time</b>: {recipe?.time}</p>
                </div>
            </div>
        )
    );
}

export default RecipeItem
