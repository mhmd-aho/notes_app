"use client"
import { api } from "@/convex/_generated/api";
import usePresence from "@convex-dev/presence/react";
import FacePile from "@convex-dev/presence/facepile";
import { Id } from "@/convex/_generated/dataModel"
import { AvatarGroup } from "../ui/avatar";
import { Skeleton } from "../ui/skeleton";
interface Props{
    noteId: Id<"notes">
    userId: string
}

export function Presence({noteId,userId}: Props){
    const presenceState = usePresence(api.presence,noteId,userId)
    if(presenceState === undefined){
        return(<AvatarGroup className="h-10">
            <Skeleton className="w-8 h-8 rounded-full" />
            <Skeleton className="w-8 h-8 rounded-full" />
            <Skeleton className="w-8 h-8 rounded-full" />
        </AvatarGroup>)
    }
    if(presenceState.length === 0){
        return(
             <div className="h-10">
                <p className="text-sm text-foreground">no one in this note</p>
            </div>
        )
    }
    return(
       <div className="dark:text-background text-foreground h-10 ">
           <FacePile presenceState={presenceState || []}/>
       </div>
    )
}
