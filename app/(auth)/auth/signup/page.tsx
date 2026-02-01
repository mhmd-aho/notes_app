import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
export default function SignUp() {
    return (
        <div className="flex flex-col items-center justify-center h-screen w-screen">
            <Card className="lg:w-[600px] lg:h-fit lg:py-5 w-full h-full max-lg:rounded-none max-lg:pt-20">
                <CardHeader>
                    <CardTitle className="text-3xl">Sign Up</CardTitle>
                    <CardDescription className="text-xl">Sign up to create an account</CardDescription>
                </CardHeader>
                <CardContent>
                    <form className="flex flex-col gap-2">
                        <div className="flex gap-2">
                            <div className="flex flex-col gap-2 w-full">
                                <Label className="text-lg" htmlFor="username">Username</Label>
                                <Input className="text-lg h-12" type="text" placeholder="Enter your username" />
                            </div>
                            <div className="flex flex-col gap-2 w-full">
                                <Label className="text-lg" htmlFor="email">Email</Label>
                                <Input className="text-lg h-12" type="email" placeholder="Enter your email" />
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <div className="flex flex-col gap-2 w-full">
                                <Label className="text-lg" htmlFor="password">Password</Label>
                                <Input className="text-lg h-12" type="password" placeholder="Enter your password" />
                            </div>
                            <div className="flex flex-col gap-2 w-full">
                                <Label className="text-lg" htmlFor="confirmPassword">Confirm Password</Label>
                                <Input className="text-lg h-12" type="password" placeholder="Confirm your password" />
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label className="text-lg" htmlFor="avatar">Avatar</Label>
                            <Input className="text-lg h-24" type="file" />
                        </div>
                        <Button type="submit" className="text-lg h-12">Sign Up</Button>
                    </form>
                </CardContent>
                <CardFooter>
                    <p>Already have an account? <Link href="/auth/signin">Sign In</Link></p>
                </CardFooter>
            </Card>
        </div>
    )
}