'use client'

import RecipeCard from '@/components/custom/RecipeCard'
import { Button } from '@/components/ui/button'
import { Recipe } from '@/model/Recipe.model'
import axios from 'axios'
import { Loader2, Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'


const Recipes = () => {


    const [recipes, setRecipes] = useState([])
    const [loading, setLoading] = useState(true)

    const router = useRouter()

    const fetchRecipes = async () => {
        try {
            const response = await axios.get('/api/recipes')
            setRecipes(response.data.messages)
            // console.log(response)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    React.useEffect(() => {
        fetchRecipes()
    }, [])

    return (
        <div>
            <h1 className=' text-center font-bold text-3xl mt-3 mb-7'>Your Recipes</h1>
            {loading ? (<div className="bg-gray-100 min-h-screen flex items-center justify-center">
                <div className="max-w-xl mx-auto px-4 py-8">
                    <Loader2 size={64} className=' animate-spin' />
                    <h1 className="text-3xl font-bold mb-4">Loading...</h1>
                </div>
            </div>) :

                (<div className="recipes grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 justify-between items-center m-5">
                    {recipes.map((recipe: Recipe) => (
                        <div key={recipe._id} className="recipe">
                            <RecipeCard {...recipe} />
                        </div>
                    ))}
                </div>)}
            {(recipes.length === 0 && !loading) &&
                <div className="bg-gray-100 min-h-screen flex items-center justify-center">
                    <div className="max-w-xl mx-auto px-4 py-8">
                        <h1 className="text-3xl font-bold mb-4">No Recipes Found</h1>
                        <Button
                            size="lg"
                            onClick={() => router.push('/add-recipe')}
                        >
                            Add Recipe
                        </Button>
                    </div>
                </div>
            }
            <div>
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => router.push('/add-recipe')}
                    className='fixed bottom-5 right-5 rounded-full bg-green-500 hover:bg-green-600 w-16 h-16'
                >
                    <Plus className="h-10 w-10" />
                </Button>
            </div>
        </div>
    )
}

export default Recipes
