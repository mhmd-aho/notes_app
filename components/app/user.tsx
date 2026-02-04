"use client"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { User2Icon } from "lucide-react"
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import Link from "next/link";
import { useConvexAuth } from "convex/react";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { Button } from "../ui/button";
export function User(){
    const {isAuthenticated , isLoading}= useConvexAuth();
    const onLogout = ()=>{
        authClient.signOut({
            fetchOptions:{
                onSuccess:()=>{
                    toast.success("Sign out successful")
                },
                onError:(error)=>{
                    toast.error(error.error.message)
                }
            }
        });
    }
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Avatar>
                    <AvatarImage src="" />
                    <AvatarFallback>
                        <User2Icon/>
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuGroup>
                    {
                        !isLoading &&(
                            isAuthenticated?
                                <DropdownMenuItem>
                                        <Button variant={"ghost"} className="h-7 w-full text-red-500 font-normal text-start" onClick={onLogout}>Logout</Button>
                                </DropdownMenuItem>
                                :
                                <>
                                    <DropdownMenuItem>
                                        <Link className="h-full w-full" href='/auth/signin'>Sign in</Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <Link className="h-full w-full" href='/auth/signup'>Sign up</Link>
                                    </DropdownMenuItem>
                                </>

                        )

                    }
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}