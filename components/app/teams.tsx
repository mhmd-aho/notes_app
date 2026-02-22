import { HoverCard, HoverCardContent, HoverCardTrigger } from "../ui/hover-card";
import { Button } from "../ui/button";
import { ChevronsUpDown } from "lucide-react";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import { Spinner } from "../ui/spinner";
import Link from "next/link";
import { Settings } from "lucide-react";
import { CrownIcon } from "lucide-react";
import { PlusIcon } from "lucide-react";
import { MinusIcon } from "lucide-react";
import { createRequestAction, acceptRequestAction, rejectRequestAction } from "@/app/actions";
import { toast } from "sonner";
import { Id } from "@/convex/_generated/dataModel";
import { useTeam } from "@/app/context/useTeam";
import { useState,useTransition } from "react";
import { Doc } from "@/convex/_generated/dataModel";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useIsMobile } from "@/app/hooks/isMobile";
interface TeamWithDetails extends Doc<"teams"> {
    requestsDetails: { id: string; name: string }[];
}
export function Teams({teams,userId,selectedTeam,setPopoverOpen}: {teams: TeamWithDetails[],userId: string | undefined,selectedTeam: string | null,setPopoverOpen: (open: boolean) => void}){
            const isMobile = useIsMobile()
            const {setSelectedTeamId} = useTeam()
            const [createIsPending,createStartTransition] = useTransition()
            const [acceptIsPending,acceptStartTransition] = useTransition()
            const [rejectIsPending,rejectStartTransition] = useTransition()
            const [teamName,setTeamName] = useState("")
            const handleCreateRequest = () => {
                createStartTransition(async () => {
                    if (!teamName.trim()) return;
                    try {
                        await createRequestAction(teamName);
                        setTeamName("");
                        toast.success("Request sent successfully");
                    } catch (e) {
                        toast.error(e instanceof Error ? e.message : "Failed to send request");
                    }
                });
            };
            const handleAcceptRequest = async (teamId: Id<"teams"> | undefined, userId: string) => {
                if (!teamId) return;
                acceptStartTransition(async () => {
                    try {
                        await acceptRequestAction(teamId, userId)
                        toast.success("Request accepted successfully")
                    } catch (e) {
                        toast.error(e instanceof Error ? e.message : "Failed to accept request")
                    }
                })
            }
            const handleRejectRequest = async (teamId: Id<"teams"> | undefined, userId: string) => {
                if (!teamId) return;
                rejectStartTransition(async () => {
                    try {
                        await rejectRequestAction(teamId, userId)
                        toast.success("Request rejected successfully")
                    } catch (e) {
                        toast.error(e instanceof Error ? e.message : "Failed to reject request")
                    }
                })
            }
            if(!isMobile){
                return(
                        <HoverCard openDelay={100} closeDelay={300}>
                                <HoverCardTrigger>
                                    <Button variant='link'>
                                        <p>{selectedTeam ? selectedTeam : 'no team'}</p>
                                        <ChevronsUpDown className="size-5"/>
                                    </Button>
                                </HoverCardTrigger>
                                <HoverCardContent className='flex flex-col gap-2'>
                                    <div>
                                        <h1>All Teams</h1>
                                        {teams ? (
                                            teams.length === 0  ? (
                                                <p className="w-full h-full text-start pl-2 text-muted-foreground">No teams</p>
                                            ) : (
                                                (teams as TeamWithDetails[]).map((team) => (
                                                    team !== null && team !== undefined && (
                                                        team.ownerId === userId ?
                                                    <div key={team._id} className="flex items-center justify-between group">
                                                        <HoverCard>
                                                            <Link href={`/team/${team._id}`}>
                                                                <Settings className="size-4 hidden group-hover:block text-muted-foreground hover:text-foreground transition-all duration-200"/>
                                                            </Link>
                                                            <HoverCardTrigger asChild>
                                                                <button onClick={() => setSelectedTeamId(team._id)} className="flex-1 h-full flex items-center gap-2 text-start pl-2">
                                                                    <p>{team.name}</p>
                                                                    <CrownIcon className="size-4"/>
                                                                    {team.requests.length > 0 &&<p className="size-4 text-[10px] rounded-full flex items-center justify-center bg-muted-foreground">{team.requests.length}</p>}
                                                                </button>
                                                            </HoverCardTrigger>
                                                            <HoverCardContent side="right">
                                                                <div>
                                                                    <h1>Requests</h1>
                                                                    {team.requestsDetails && team.requestsDetails.length === 0 ? (
                                                                        <p className="w-full h-full text-start p-1 text-muted-foreground">No requests</p>
                                                                    ) : (
                                                                        team.requestsDetails.map((request)=>(
                                                                            <div className="w-full h-full text-start hover:bg-muted p-1 rounded flex justify-between items-center group/btn" key={request.id}>
                                                                                <p>{request.name}</p>
                                                                                <div className="flex gap-2">
                                                                                    <button disabled={acceptIsPending} onClick={()=>handleAcceptRequest(team._id,request.id)} className="opacity-0 group-hover/btn:opacity-100 text-muted-foreground hover:text-foreground transition-all duration-200" >
                                                                                        {acceptIsPending ? <Spinner className="size-4"/> : <PlusIcon className="size-4"/>}
                                                                                    </button>
                                                                                    <button disabled={rejectIsPending} onClick={()=>handleRejectRequest(team._id,request.id)} className="opacity-0 group-hover/btn:opacity-100 text-muted-foreground hover:text-foreground transition-all duration-200" >
                                                                                        {rejectIsPending ? <Spinner className="size-4"/> : <MinusIcon className="size-4"/>}
                                                                                    </button>
                                                                                                </div>
                                                                                            </div>
                                                                                            
                                                                                        ))
                                                                                    )}
                                                                                </div>
                                                                            </HoverCardContent>
                                                                        </HoverCard>
                                                                    </div>
                                                                    :
                                                                    <div key={team._id} className="flex items-center gap-2 group">
                                                                        <Link href={`/team/${team._id}`}>
                                                                            <Settings className="size-4 hidden group-hover:block text-muted-foreground hover:text-foreground transition-all duration-200"/>
                                                                        </Link>
                                                                        <p>{team.name}</p>
                                                                    </div>
                                                                    )
                                                                ))
                                                            )
                                                        ) : (
                                                            <p className="w-full h-full text-start pl-2 text-muted-foreground">Loading...</p>
                                                        )}
                                                    </div>
                                                    <Separator/>
                                                    <div>
                                                        <h1>Join a Team</h1>
                                                        <div className="w-full flex gap-1">
                                                            <Input type="text" value={teamName} onChange={(e)=>setTeamName(e.target.value)} placeholder="Team name" />
                                                            <Button disabled={createIsPending} onClick={handleCreateRequest}>{createIsPending? <Spinner className="size-5"/>:"Join"}</Button>
                                                        </div>
                                                    </div>
                                                    <Separator/>
                                                    <Button asChild>
                                                        <Link href='/create-team'>Create Team</Link>
                                                    </Button>
                                </HoverCardContent>
                        </HoverCard>   
    
                )
            }else{
                return(
                <div className="flex-1 flex-col">
                    <div className="flex flex-col gap-1 h-3/4">
                        <h1 className="text-2xl mb-1">Teams</h1>
                        {teams ? (
                                teams.length === 0  ? (
                                    <p className="text-2xl self-center text-muted-foreground">No teams</p>
                                ) : (
                                    (teams as TeamWithDetails[]).map((team) => (
                                        team !== null && team !== undefined && (
                                            team.ownerId === userId ?
                                                    <div key={team._id} className="flex items-center justify-between">
                                                            <div className="flex items-center gap-2">
                                                                <Link onClick={() => setPopoverOpen(false)} href={`/team/${team._id}`}>
                                                                    <Settings className="size-4 active:text-muted-foreground"/>
                                                                </Link>
                                                                <button onClick={() => setSelectedTeamId(team._id)} className="flex-1 h-full flex items-center gap-2 text-start">
                                                                        <p>{team.name}</p>
                                                                        <CrownIcon className="size-4"/>
                                                                </button>
                                                            </div>
                                                            <Popover>
                                                                <PopoverTrigger>
                                                                    {team.requests.length > 0 && <p className="text-[12px] px-2 rounded-full flex items-center justify-center bg-muted-foreground text-background">{team.requests.length} pending requests</p>}
                                                                </PopoverTrigger>
                                                                <PopoverContent>
                                                                    <div className="flex flex-col gap-2">
                                                                        {team.requestsDetails.map((request) => (
                                                                            <div key={request.id} className="flex items-center gap-2">
                                                                                <p>{request.name}</p>
                                                                                <Button onClick={() => handleAcceptRequest(team._id,request.id)}>Accept</Button>
                                                                                <Button onClick={()=>handleRejectRequest(team._id,request.id)}>Reject</Button>
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                </PopoverContent>
                                                            </Popover>    
                                                    </div>
                                                                    :
                                                                    <div key={team._id} className="flex items-center gap-2 group">
                                                                        <Link href={`/team/${team._id}`}>
                                                                            <Settings className="size-4 hidden group-hover:block text-muted-foreground hover:text-foreground transition-all duration-200"/>
                                                                        </Link>
                                                                        <p>{team.name}</p>
                                                                    </div>
                                                                    )
                                                                ))
                                                            )
                                                        ) : (
                                                            <p className="text-2xl self-center text-muted-foreground">Loading...</p>
                                                        )}
                                        </div>
                                        <Separator/>
                                            <div className="pb-2">
                                                <h1 className="text-2xl mb-1">Join a Team</h1>
                                                <div className="w-full flex gap-1">
                                                    <Input type="text" value={teamName} onChange={(e)=>setTeamName(e.target.value)} placeholder="Team name" />
                                                    <Button disabled={createIsPending} onClick={handleCreateRequest}>{createIsPending? <Spinner className="size-5"/>:"Join"}</Button>
                                                </div>
                                            </div>
                                            <Separator/>
                                            <Button className="my-2 w-full" asChild>
                                                <Link onClick={() => setPopoverOpen(false)} href='/create-team'>Create Team</Link>
                                            </Button>
                </div>
                )
            }
}