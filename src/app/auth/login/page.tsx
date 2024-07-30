'use client'
import React, { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import Link from 'next/link'
import { useToast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'
import ApiResponse from '@/utils/ApiResponse'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import { loginSchema } from '@/schemas/loginSchema'
import { signIn } from 'next-auth/react'

const Login = () => {

    const [isSubmitting, setIsSubmitting] = useState(false)

    const { toast } = useToast()
    const router = useRouter()

    const form = useForm({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: ''
        }
    })

    const register = async (data: z.infer<typeof loginSchema>) => {
        setIsSubmitting(true)

        try {
            const result = await signIn('credentials', {
                redirect: false,
                identifier: data.email,
                password: data.password
            })
            console.log(result)
            if(result?.error){
                toast({
                    title:"Login Failed",
                    description: "Incorrect credentials",
                    variant:"destructive"
                })
            }
            setIsSubmitting(false)
            if(result?.url){
                router.replace('/home')
            }

            return ApiResponse(true, "Logged in successfully", 200)

        } catch (error:any) {
            toast({
                title: "Error",
                description: error.message,
                variant: "destructive"
            })
            return ApiResponse(false, "Error logging in", 500)
        }
    }

    return (
        <div className="flex min-h-screen bg-gray-100">
            <div className="w-7/12 hidden lg:block">
                <div className="flex justify-center items-center h-full">
                    <img src="/images/eRecipie.jpg" alt="signup" className="w-full" />
                </div>
            </div>
            <div className='w-5/12 flex align-middle'>
                <div className=' p-10 bg-white shadow-xl rounded-lg w-2/3 h-3/5 my-auto mx-auto'>
                    <div className="flex justify-center items-center flex-col mx-auto gap-3">
                        <h1 className='text-3xl text-center font-bold'>My Recipe Book</h1>
                        <h3 className='text-xl text-center font-semibold'>{isSubmitting ? "Processing ..." : "Log In"}</h3>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(register)} className="space-y-6 w-full">
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
                                    {isSubmitting ? <> <Loader2 className='mr-2 h-4 w-4 animate-spin' />Please wait</> : "Log In"}
                                </Button>
                            </form>
                        </Form>
                        <div className='mt-4'>
                            <h3 className='my-3 text-center text-gray-500'>
                                Don't have an account?{' '}
                                <Link href='/auth/signup' className=' text-black'>Sign Up</Link>
                            </h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login