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
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
export function User(){
    const {isAuthenticated , isLoading}= useConvexAuth();
    const user = useQuery(api.auth.getCurrentUser,!isLoading && isAuthenticated? {}: "skip")
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
                    <AvatarImage src={user? `https://avatar.vercel.sh/${user.email}`: undefined} />
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
                                <DropdownMenuItem onClick={onLogout} className="text-red-500 font-normal focus:text-red-500">
                                        Logout
                                </DropdownMenuItem>
                                :
                                <>
                                    <DropdownMenuItem asChild>
                                        <Link className="h-full w-full" href='/auth/signin'>Sign in</Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
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