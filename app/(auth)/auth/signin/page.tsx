import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
export default function SignIn() {
    return (
        <div className="flex flex-col items-center justify-center h-screen w-screen">
            <Card className="lg:w-[600px] lg:h-fit lg:py-5 w-full h-full max-lg:rounded-none max-lg:pt-20">
                <CardHeader>
                    <CardTitle className="text-3xl">Sign In</CardTitle>
                    <CardDescription className="text-xl">Sign in to your account</CardDescription>
                </CardHeader>
                <CardContent>
                    <form className="flex flex-col gap-4">
                        <div className="flex flex-col">
                            <Label className="text-lg" htmlFor="email">Email or Username</Label>
                            <Input className="text-lg h-12" type="text" placeholder="Enter your email or username" />
                        </div>
                        <div className="flex flex-col">
                            <Label className="text-lg" htmlFor="password">Password</Label>
                            <Input className="text-lg h-12" type="password" placeholder="Enter your password" />
                        </div>
                        <Button type="submit" className="text-lg h-12">Sign In</Button>
                    </form>
                </CardContent>
                <CardFooter>
                    <p>Don&apos;t have an account? <Link href="/auth/signup">Sign Up</Link></p>
                </CardFooter>
            </Card>
        </div>
    )
}