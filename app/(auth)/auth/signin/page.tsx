"use client"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { SignInSchema } from "@/app/schemas/user"
import { useTransition } from "react";
import z from "zod"
import { authClient } from "@/lib/auth-client"
import { toast } from "sonner"
import { Spinner } from "@/components/ui/spinner"
export default function SignIn() {
    const [isPending, startTransition] = useTransition();
    const form = useForm({
        resolver: zodResolver(SignInSchema),
        defaultValues: {
            emailOrUsername: "",
            password: "",
        },
    })
    const onSubmit = (data : z.infer<typeof SignInSchema>)=>{
        const emailRegex =  /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        const isEmail = emailRegex.test(data.emailOrUsername)
        startTransition(async ()=>{
            if(isEmail){
                await authClient.signIn.email({
                    email:data.emailOrUsername,
                    password:data.password,
                    fetchOptions:{
                        onSuccess:()=>{
                            toast.success("Sign in successful")
                            window.location.href = "/"
                        },
                        onError:(error)=>{
                            toast.error(error.error.message)
                        }
                    }
                })
            }else{
                await authClient.signIn.username({
                    username:data.emailOrUsername,
                    password:data.password,
                    fetchOptions:{
                        onSuccess:()=>{
                            toast.success("Sign in successful")
                        },
                        onError:(error)=>{
                            toast.error(error.error.message)
                        }
                    }
                })
            }
        })
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen w-screen">
            <Card className="lg:w-[600px] lg:h-fit lg:py-5 w-full h-full max-lg:rounded-none max-lg:pt-20">
                <CardHeader>
                    <CardTitle className="text-3xl">Sign In</CardTitle>
                    <CardDescription className="text-xl">Sign in to your account</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
                        <Controller
                        control={form.control}
                        name="emailOrUsername"
                        render={({field,fieldState})=>(
                            <div className="flex flex-col">
                                <Label className="text-lg" htmlFor="email">Email or Username</Label>
                                <Input className="text-lg h-12" type="text" placeholder="Enter your email or username" {...field}/>
                                {fieldState.error && <p className="text-red-500">{fieldState.error.message}</p>}
                            </div>
                        )}
                        />
                        <Controller
                        control={form.control}
                        name="password"
                        render={({field,fieldState})=>(
                            <div className="flex flex-col">
                                <Label className="text-lg" htmlFor="password">Password</Label>
                                <Input className="text-lg h-12" type="password" placeholder="Enter your password" {...field}/>
                                {fieldState.error && <p className="text-red-500">{fieldState.error.message}</p>}
                            </div>
                        )}
                        />
                        <Button type="submit" disabled={isPending} className="text-lg h-12">{isPending ? <span className="flex items-center gap-1">Signing In <Spinner className="size-5"/></span> : "Sign In"}</Button>
                    </form>
                </CardContent>
                <CardFooter>
                    <p>Don&apos;t have an account? <Link href="/auth/signup">Sign Up</Link></p>
                </CardFooter>
            </Card>
        </div>
    )
}