'use client'

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { recipeSchema } from '@/schemas/recipeSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import axios from 'axios'
import ApiResponse from '@/utils/ApiResponse'
import { toast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'

const AddRecipe = () => {

  const [isSubmitting, setIsSubmitting] = useState(false)

  const router = useRouter()

  const form = useForm(
    {
      resolver: zodResolver(recipeSchema),
      defaultValues: {
        name: '',
        ingredients: '',
        instructions: '',
        time: '',
        imageInput: ''
      }
    }
  )

  const addRecipe = async (data: z.infer<typeof recipeSchema>) => {
    setIsSubmitting(true)

    try {
      const response = await axios.post('/api/add-recipe', data)
      toast({
        title: "Recipe added",
        description: response.data.message
      })
      router.push('/recipes')
    } catch (error: any) {
      console.log(error)
      toast({
        title: "Error",
        description: error.response.data?.message,
        variant: "destructive"
      })
      return ApiResponse(false, "Error adding recipe", 500)
    } finally {
      setIsSubmitting(false)
    }
  }


  return (
    <div className='flex min-h-screen bg-gray-100'>
      <div className="w-5/12 hidden lg:block">
        <div className="h-full flex justify-center items-center">
          <img src="/images/recipe.jpg" alt="Sample Recipe Pic" className='h-full' />
        </div>
      </div>
      <div className="w-full lg:w-7/12 flex align-middle">
        <div className="p-10 bg-white shadow-xl rounded-lg w-5/6 h-fit my-auto mx-auto">
          <div className="flex justify-center items-center flex-col mx-auto gap-3">
            <h1 className="text-3xl font-bold">My Recipe Book</h1>
            <h3 className='text-xl text-center font-semibold'>{isSubmitting ? "Adding ..." : "Add Recipe"}</h3>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(addRecipe)} className='space-y-6 w-full'>
                <FormField
                  control={form.control}
                  name='name'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='ingredients'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ingredients</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Ingredients"
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='instructions'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Instructions</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Instructions"
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='time'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Time</FormLabel>
                      <FormControl>
                        <Input placeholder="Time" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type='submit' disabled={isSubmitting}>
                  {isSubmitting ? <> <Loader2 className='mr-2 h-4 w-4 animate-spin' /> </> : "Add Recipe"}
                </Button>
              </form> 
            </Form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddRecipe