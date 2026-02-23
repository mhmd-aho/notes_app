"use client"
import { Card, CardContent, CardFooter } from "../ui/card";
import { Separator } from "../ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../ui/hover-card";
import { Pen, User2Icon, X } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { DeleteButton } from "./deleteButton";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { api } from "@/convex/_generated/api";
import { FunctionReturnType } from "convex/server";
import { useState, useTransition } from "react";
import { acceptRequestAction, changeTeamNameAction, deleteMemberAction, deleteNoteAction, rejectRequestAction } from "@/app/actions";
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTrigger, AlertDialogAction, AlertDialogCancel, AlertDialogDescription, AlertDialogTitle, AlertDialogFooter } from "../ui/alert-dialog";
import { toast } from "sonner";
import { Spinner } from "../ui/spinner";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Input } from "../ui/input";
type MembersData = FunctionReturnType<typeof api.members.getMembersById>;
type TeamData = FunctionReturnType<typeof api.team.getTeamById>;

export function TeamEdit({team, userId, members, notes, ownerName,id}: {team: TeamData, userId: string, members: MembersData, notes: Doc<'notes'>[], ownerName: string | undefined | null, id: Id<'teams'>}){
    const [isEditing, setIsEditing] = useState(false);
    const [editingName, setEditingName] = useState(false);
    const [teamName, setTeamName] = useState(team.name);
    const [isMemberDeletingpPending,startMemberDeleting] = useTransition()
    const [isNameEditingPending,startNameEditing] = useTransition()
    const [isNoteDeletingPending,startNoteDeleting] = useTransition()
    const [isRequestAcceptingPending,startRequestAccepting] = useTransition()
    const [isRequestRejectingPending,startRequestRejecting] = useTransition()
    const handleMemberDelete = async (memberId: Id<"members">) => {
        startMemberDeleting(async () => {
            const res = await deleteMemberAction(memberId)
            if(res.error){
                toast.error(res.error)
            }else{
                toast.success(res.success)
            }
        })
    }
    const handleChangeName = async () => {
        startNameEditing(async () => {
            const res = await changeTeamNameAction(id, teamName)
            if(res.error){
                toast.error(res.error)
            }else{
                toast.success(res.success)
                setEditingName(false)
            }
        })
    }
    const handleNoteDelete = async (noteId: Id<"notes">) => {
        startNoteDeleting(async () => {
            const res = await deleteNoteAction(noteId)
            if(res.error){
                toast.error(res.error)
            }else{
                toast.success(res.success)
            }
        })
    }
    const handleRequestAccept = async (requestId:string) => {
        startRequestAccepting(async () => {
            const res = await acceptRequestAction(id, requestId)
            if(res.error){
                toast.error(res.error)
            }else{
                toast.success(res.success)
            }
        })
    }
    const handleRequestReject = async (requestId:string) => {
        startRequestRejecting(async () => {
            const res = await rejectRequestAction(id, requestId)
            if(res.error){
                toast.error(res.error)
            }else{
                toast.success(res.success)
            }
        })
    }
    return(
        <Card className="lg:h-fit lg:w-3xl gap-10 h-full w-full max-lg:rounded-none">
                    <CardContent className="p-0 flex flex-col gap-2">
                        <div className="lg:p-2 p-1">
                            <div className="relative w-fit">
                                <h1 className="text-3xl font-bold w-fit">{team.name}</h1>
                                {
                                    isEditing && 
                                    <>
                                        <Pen onClick={() => {setEditingName(true)}} className={ `size-4 cursor-pointer absolute top-0 -right-5 ${editingName ? 'hidden' : 'block'}`}/>
                                        {
                                            editingName && (
                                                <div className="absolute top-0 left-0 w-full h-full bg-card flex items-center gap-1">
                                                    <Input value={teamName} onChange={(e) => {setTeamName(e.target.value)}}/>
                                                    <Button onClick={() => {handleChangeName()}}>{isNameEditingPending ? <Spinner/> : 'Save'}</Button>
                                                </div>
                                            )
                                        }
                                    </>
                                }
                            </div>
                            <div className="flex flex-col lg:flex-row justify-between">
                                <h2 className="text-xl text-muted-foreground">Owned by {ownerName || 'Unknown'}</h2>
                                {
                                    team.ownerId === userId && (
                                        <Popover>
                                            <PopoverTrigger>
                                                <p className="bg-accent text-[12px] py-1 px-2 rounded-full w-fit">Requests: {team.requests.length} pending</p>
                                            </PopoverTrigger>
                                            <PopoverContent>
                                                {
                                                    team.requestsDetails.map((request) => (
                                                        <div key={request.id} className="flex items-center justify-between">
                                                            <p>{request.name}</p>
                                                            <div className="flex gap-1">
                                                                <Button disabled={isRequestAcceptingPending} onClick={() => {handleRequestAccept(request.id)}} size="sm">{isRequestAcceptingPending ? <Spinner/> : 'Accept'}</Button>
                                                                <Button disabled={isRequestRejectingPending} onClick={() => {handleRequestReject(request.id)}} size="sm">{isRequestRejectingPending ? <Spinner/> : 'Reject'}</Button>
                                                            </div>
                                                        </div>
                                                    ))
                                                }
                                            </PopoverContent>
                                        </Popover>
                                    )
                                }
                            </div>
                        </div>
                        <div className="flex flex-col items-start px-2">
                            <h1 className="text-2xl py-2">Members({members.length})</h1>
                            <Separator/>
                            <div className="flex gap-1 mt-2">
                                {members.map((member) => (
                                    <HoverCard key={member.userId} openDelay={100}>
                                        <HoverCardTrigger className="relative">
                                            <Avatar className="size-10">
                                                <AvatarImage src={member.user? `https://avatar.vercel.sh/${member.user.email}`: undefined} />
                                                <AvatarFallback>
                                                    <User2Icon/>
                                                </AvatarFallback>
                                            </Avatar>
                                            {isEditing && member.userId !== team.ownerId && (
                                                <AlertDialog>
                                                    <AlertDialogTrigger disabled={isMemberDeletingpPending} className="absolute -top-1 -right-1 bg-card rounded-full p-0.5 ">
                                                        {isMemberDeletingpPending ? <Spinner className="size-4"/> : <X className="size-4 text-destructive"/>}
                                                    </AlertDialogTrigger>
                                                    <AlertDialogContent>
                                                        <AlertDialogHeader>
                                                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                                            <AlertDialogDescription>
                                                                This action will delete the member from the team.
                                                            </AlertDialogDescription>
                                                        </AlertDialogHeader>
                                                        <AlertDialogFooter>
                                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                            <AlertDialogAction variant="destructive" disabled={isMemberDeletingpPending} onClick={() => {handleMemberDelete(member._id)}}>Delete</AlertDialogAction>
                                                        </AlertDialogFooter>
                                                    </AlertDialogContent>
                                                </AlertDialog>
                                            )}
                                        </HoverCardTrigger>
                                        <HoverCardContent className="w-fit p-1">
                                            <p>{member.user?.username}</p>
                                        </HoverCardContent>
                                    </HoverCard>
                                ))}
                            </div>
                        </div>
                        <Separator/>
                        <div className="flex flex-col items-start px-2">
                            <h1 className="text-2xl py-2">Notes ({notes.length})</h1>
                            <Separator/>
                            <div className="flex gap-1 mt-2">
                                {
                                    notes.length === 0 && (
                                        <p>No notes found</p>
                                    )
                                }
                                {notes.map((note) => (
                                    <div key={note._id} className="relative mt-2 ">
                                    <Link href={`/note/${note._id}`} className="bg-background p-2 rounded-md border">{note.title}</Link>
                                    {isEditing && (
                                            <AlertDialog>
                                                <AlertDialogTrigger disabled={isNoteDeletingPending} className="absolute -top-2.5 -right-2.5 bg-card rounded-full p-0.5 ">
                                                    {isNoteDeletingPending ? <Spinner className="size-4"/> : <X className="size-4 text-destructive"/>}
                                                </AlertDialogTrigger>
                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            This action will delete the note.
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                        <AlertDialogAction variant="destructive" disabled={isNoteDeletingPending} onClick={() => {handleNoteDelete(note._id)}}>Delete</AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                        {
                            team.ownerId === userId && (
                                    <CardFooter className="flex items-end justify-end gap-2 w-full">
                                        <Button onClick={() => {setIsEditing(!isEditing)}}>{isEditing ? 'Cancel' : 'Edit'}</Button>
                                        <DeleteButton id={id}>team</DeleteButton>
                                    </CardFooter>
                            )
                        }
                </Card>
    )
}