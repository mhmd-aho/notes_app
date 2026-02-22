"use client"
import { useConvexAuth, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Doc} from "@/convex/_generated/dataModel";
import { Separator } from "../ui/separator";
import { User2Icon,MenuIcon } from "lucide-react";
import { User } from "./user";
import { Skeleton } from "../ui/skeleton";
import { Teams } from "./teams";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useTeam } from "@/app/context/useTeam";
import { useMemo } from "react";
import { useIsMobile } from "@/app/hooks/isMobile";
interface TeamWithDetails extends Doc<"teams"> {
    requestsDetails: { id: string; name: string }[];
}
export default function Profile(){
        const {selectedTeamId, setSelectedTeamId} = useTeam()
        const {isAuthenticated , isLoading}= useConvexAuth();
        const user = useQuery(api.auth.getCurrentUser,!isLoading && isAuthenticated? {}: "skip")
        const teams = useQuery(api.team.getUserTeams,!isLoading && isAuthenticated? {}: "skip")
        const isMobile = useIsMobile()
        const [popoverOpen,setPopoverOpen] = useState(false)
        const selectedTeam = useMemo(() => {
                        if (!teams || !selectedTeamId) return null;
                        return teams.find((t) => (t)?._id === selectedTeamId)?.name || null;
                    }, [teams, selectedTeamId]);
                    useEffect(() => {
                        if (isLoading || teams === undefined) return;
                    
                                const hasNoSelectedTeam = !selectedTeamId || selectedTeamId === 'No team' || selectedTeamId === 'no team';
                                
                                if (hasNoSelectedTeam && teams.length > 0) {
                                    setSelectedTeamId(teams[0]?._id ?? null);
                    
                                } else if (teams.length === 0) {
                                    if (selectedTeamId !== 'no team') {
                                        setSelectedTeamId('no team');
                                    }
                                }
                            }, [selectedTeamId, teams, isLoading, setSelectedTeamId])
        if(!isMobile){
            if (isLoading){
                return(
                <div className="flex items-center justify-center gap-2 p-2 w-fit h-full rounded-full text-lg">
                    <div className="flex items-center gap-2">
                        <Skeleton className="size-8 rounded-full"/>
                        <Skeleton className=" h-6 w-32 rounded-md"/>
                    </div>
                    <Separator orientation="vertical"/>
                    <Skeleton className="h-6 w-32 rounded-md"/>
                </div>
                )
            }
            if(!isLoading && !isAuthenticated){
                return(
                    <div className="flex items-center justify-center gap-2 hover:bg-muted-foreground/20 p-2 w-fit h-full rounded-full text-lg">
                    <div className="flex items-center gap-2">
                        <Avatar className="size-7">
                            <AvatarFallback>
                                <User2Icon/>
                            </AvatarFallback>
                        </Avatar>
                        <h1>Not Authenticated</h1>
                    </div>
                    <Separator orientation="vertical"/>
                    <h1>No teams</h1>
                </div>
                )
            }
        return(
            <div className="relative flex flex-row items-center justify-center hover:bg-muted-foreground/20 lg:p-2 w-fit h-full rounded-full">
                <User username={user?.username} email={user?.email} isAuthenticated={isAuthenticated} isLoading={isLoading} selectedTeam={selectedTeam}/>
                <Separator orientation="vertical"/>
                <Teams teams={teams as TeamWithDetails[]} userId={user?._id} selectedTeam={selectedTeam} setPopoverOpen={setPopoverOpen}/>    
            </div>
        )

        }else{
            return(
                <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
                    <PopoverTrigger className="absolute left-2">
                        <MenuIcon className="size-8"/>
                    </PopoverTrigger>
                    <PopoverContent className="w-screen rounded-none h-[calc(100vh-2rem)] bg-background flex flex-col gap-2">
                        <User username={user?.username} email={user?.email} isAuthenticated={isAuthenticated} isLoading={isLoading} selectedTeam={selectedTeam}/>
                        <Separator/>
                        <Teams teams={teams as TeamWithDetails[]} userId={user?._id} selectedTeam={selectedTeam} setPopoverOpen={setPopoverOpen}/>    
                    </PopoverContent>
                </Popover>
            )
        }
    }

