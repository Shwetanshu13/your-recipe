'use client'
import React, { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import Link from 'next/link'
import { signupSchema } from '@/schemas/signupSchema'
import { useToast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import ApiResponse from '@/utils/ApiResponse'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import Image from 'next/image'

const Signup = () => {

    const [isSubmitting, setIsSubmitting] = useState(false)

    const { toast } = useToast()
    const router = useRouter()

    const form = useForm({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            name: '',
            email: '',
            password: ''
        }
    })

    const register = async (data: z.infer<typeof signupSchema>) => {
        setIsSubmitting(true)

        try {
            const response = await axios.post('/api/auth/signup', data)
            toast({
                title: "User registered",
                description: response.data.message
            })
            setIsSubmitting(false)
            if (response.data.success) {
                router.push(`/auth/login`)
            }
            // console.log(response.data)
        } catch (error: any) {
            console.log(error)
            toast({
                title: "Error",
                description: error.response.data.message,
                variant: "destructive"
            })
            setIsSubmitting(false)
            return ApiResponse(false, "Error registering user", 500)
        }
    }

    return (
        <div className="flex min-h-screen bg-gray-100">
            <div className="w-7/12 hidden lg:block">
                <div className="flex justify-center items-center h-full">
                    <Image width={1000} height={1} src="/images/recipieBook.jpg" alt="signup" className="w-full" />
                </div>
            </div>
            <div className='w-full lg:w-5/12 flex align-middle'>
                <div className=' p-10 bg-white shadow-xl rounded-lg w-2/3 h-fit my-auto mx-auto'>
                    <div className="flex justify-center items-center flex-col mx-auto gap-3">
                        <h1 className='text-3xl text-center font-bold'>My Recipe Book</h1>
                        <h3 className='text-xl text-center font-semibold'>{isSubmitting ? "Processing ..." : "Sign Up"}</h3>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(register)} className="space-y-6 w-full">
                                <FormField
                                    name="name"
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Name</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Name"
                                                    {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    name="email"
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Email"
                                                    {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    name="password"
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Password</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="password"
                                                    placeholder="Password"
                                                    {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <Button type='submit' disabled={isSubmitting}>
                                    {isSubmitting ? <> <Loader2 className='mr-2 h-4 w-4 animate-spin' /> </> : "Sign Up"}
                                </Button>
                            </form>
                        </Form>
                        <div className='mt-4'>
                            <h3 className='my-3 text-center text-gray-500'>
                                Already have an account?{' '}
                                <Link href='/auth/login' className=' text-black'>Log In</Link>
                            </h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup