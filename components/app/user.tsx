"use client"
import { User2Icon } from "lucide-react"
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../ui/hover-card";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { useIsMobile } from "@/app/hooks/isMobile";
export function User({username,email,isAuthenticated,isLoading,selectedTeam}: {username: string | null | undefined,email: string | null | undefined,isAuthenticated: boolean,isLoading: boolean,selectedTeam: string | null}){
    const isMobile = useIsMobile()
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
    if(!isMobile){
    return (
        <HoverCard openDelay={100} closeDelay={300}>
            <HoverCardTrigger className="flex gap-2">
                <Button variant='link'  >
                    <Avatar className="size-5">
                        <AvatarImage src={email? `https://avatar.vercel.sh/${email}`: undefined} />
                        <AvatarFallback>
                            <User2Icon/>
                        </AvatarFallback>
                    </Avatar>
                    <p>{username}</p>
                </Button>
            </HoverCardTrigger>
            <HoverCardContent className="w-fit p-1">
            {
                !isLoading &&(
                    isAuthenticated?
                    <Button className="w-full text-destructive" variant="ghost" onClick={onLogout}>Logout</Button>
                    :
                    <>
                    <Button className="w-full" asChild>
                        <Link href='/auth/signin'>Sign in</Link>
                    </Button>
                    <Separator/>
                    <Button className="w-full" asChild>
                        <Link href='/auth/signup'>Sign up</Link>
                    </Button>
                    </>
                )
            }

            </HoverCardContent>
        </HoverCard>
    )
    }else{
        return(
            <div>
                <div className="flex gap-2">
                    <Avatar className="size-8">
                        <AvatarImage src={email? `https://avatar.vercel.sh/${email}`: undefined} />
                        <AvatarFallback>
                            <User2Icon/>
                        </AvatarFallback>
                    </Avatar>
                    <h1 className="text-2xl font-bold">{username}</h1>
                </div>
                <h2 className="text-lg text-muted-foreground">{selectedTeam}</h2>
            </div>
        )
    }
}