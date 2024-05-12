'use client'

import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import React from 'react'

const page = () => {
    const router = useRouter()
    return (
        <div className='p-5 bg-center flex' style={{
            backgroundImage: "url('/images/home.jpg')",
            height: 'calc(100vh - 4rem)',
        }}>
            <div className="flex flex-col gap-5 justify-center items-center m-auto">
                <h1 className="text-3xl text-center">Welcome to <b>Your Recipes</b></h1>
                <p className="text-center font-semibold">Store and organize your favorite recipes online!</p>
                <p className="text-center font-semibold">Never lose a recipe again. Keep them all in one place and access them from anywhere.</p>
                <div className="flex justify-center">
                    <Button onClick={() => router.push('/recipes')}>
                        My Recipes
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default page