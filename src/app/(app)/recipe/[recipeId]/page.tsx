'use client'

import { Recipe } from '@/model/Recipe.model'
import axios from 'axios'
import { Loader, Loader2 } from 'lucide-react'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const page = () => {

    const params = useParams<{ recipeId: string }>();
    const recipeId = decodeURIComponent(params.recipeId);

    // console.log(recipieId)

    const [recipe, setRecipe] = useState<Recipe>()
    const [loading, setLoading] = useState(true)

    const fetchRecipe = async () => {
        try {
            const response = await axios.get(`/api/recipeItem?recipieId=${recipeId}`)
            setRecipe(response.data.messages)
            // console.log(response)
        } catch (error) {
            console.log(error)
        }finally{
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchRecipe()
    }, [])

    return (
        loading ? (<div className="bg-gray-100 min-h-screen flex items-center justify-center">
            <div className="max-w-xl mx-auto px-4 py-8">
                <Loader2 size={64} className='animate-spin' />
                <h1 className="text-3xl font-bold mb-4">Loading...</h1>
            </div>
        </div>) :
        (<div className="bg-gray-100 min-h-screen flex items-center justify-center">
            <div className="max-w-xl mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-4">{recipe?.name}</h1>
                <div className="mb-4">
                    <h2 className="text-xl font-bold mb-2">Ingredients:</h2>
                    <h3 className='text-xl'>{recipe?.ingredients} </h3>
                </div>
                <div className="mb-4">
                    <h2 className="text-xl font-bold mb-2">Instructions:</h2>
                    <h3 className='text-xl'>{recipe?.instructions} </h3>
                </div>
                <p><b>Time</b> : {recipe?.time}</p>
            </div>
        </div>)
    )
}

export default page