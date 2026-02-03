"use client"
import { z } from "zod";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { userSchema } from "@/app/schemas/user";
import { Controller,useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authClient } from '@/lib/auth-client'
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
export default function SignUp() {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();
    const form = useForm({    
        resolver: zodResolver(userSchema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
        },
    }); 
    // const onSubmit = (data : z.infer<typeof userSchema>)=>{
    //     startTransition(async () => {
    //     await authClient.signUp.email({
    //         email:data.email,
    //         password:data.password,
    //         username:data.username,
    //         fetchOptions:{
    //             onSuccess:()=>{
    //                 toast.success("Signup successful")
    //                 router.push("/")
    //             },
    //             onError:(error)=>{
    //                 toast.error(error.error.message)
    //             }
    //         }
    //     })
    // })
    // }   
    return (
        <div className="flex flex-col items-center justify-center h-screen w-screen">
            <Card className="lg:w-[600px] h-fit lg:py-5 w-full max-lg:rounded-none max-lg:pt-20">
                <CardHeader>
                    <CardTitle className="text-3xl">Sign Up</CardTitle>
                    <CardDescription className="text-xl">Sign up to create an account</CardDescription>
                </CardHeader>
                <CardContent>
                    <form className="flex flex-col gap-2">
                        <Controller
                        control={form.control}
                        name="username"
                        render={({field,fieldState})=>(
                            <div className="flex flex-col w-full">
                                <Label className="text-lg" htmlFor="username">Username</Label>
                                <Input className="text-lg h-12" type="text" placeholder="Enter your username" {...field}/>
                                {fieldState.error && <p className="text-red-500">{fieldState.error.message}</p>}
                            </div>
                        )}
                        />
                        <Controller
                        control={form.control}
                        name="email"
                        render={({field,fieldState})=>(
                            <div className="flex flex-col w-full">
                                <Label className="text-lg" htmlFor="email">Email</Label>
                                <Input className="text-lg h-12" type="email" placeholder="Enter your email" {...field}/>
                                {fieldState.error && <p className="text-red-500">{fieldState.error.message}</p>}
                            </div>
                        )}
                        />
                            <Controller
                            control={form.control}
                            name="password"
                            render={({field,fieldState})=>(
                            <div className="flex flex-col w-full">
                                <Label className="text-lg" htmlFor="password">Password</Label>
                                <Input className="text-lg h-12" type="password" placeholder="Enter your password" {...field}/>
                                {fieldState.error && <p className="text-red-500">{fieldState.error.message}</p>}
                            </div>
                            )}
                            />
                        <Button type="submit" className="text-lg h-12" disabled={isPending}>
                            {isPending ? "Signing Up..." : "Sign Up"}
                        </Button>
                    </form>
                </CardContent>
                <CardFooter>
                    <p>Already have an account? <Link href="/auth/signin">Sign In</Link></p>
                </CardFooter>
            </Card>
        </div>
    )
}