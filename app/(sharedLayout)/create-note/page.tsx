"use client"
import { Button } from "@/components/ui/button";
import { useTransition, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { NoteSchema } from "@/app/schemas/note";
import { createNoteAction } from "@/app/actions";
import { toast } from "sonner";
import z from "zod";
import { useRouter } from "next/navigation";
import { useConvexAuth, useQuery } from "convex/react";
import { Spinner } from "@/components/ui/spinner";
import { api } from "@/convex/_generated/api";
export default function CreateNote() {
   const {isAuthenticated , isLoading}= useConvexAuth();
   const router = useRouter();
   const [isPending,startTransition] = useTransition();
    const teams = useQuery(api.team.getUserTeams,!isLoading && isAuthenticated? {}: "skip")
   const form = useForm({
       resolver: zodResolver(NoteSchema),
       defaultValues:{
           title:'', 
           team:''
       }
   });
   
   useEffect(()=>{
       if(!isLoading && !isAuthenticated){
        router.push("/auth/signup")
        toast.error("You have to be logged in to create a note")
       }
       if(teams && teams.length === 0){
        router.push("/create-team")
        toast.error("You have to join or create a team first")
       }
   },[isLoading, isAuthenticated, teams, router]);
   const onSubmit = (data: z.infer<typeof NoteSchema>) => {
       startTransition(async () => {
           try{
               await createNoteAction(data)
               toast.success("Note created successfully")
               router.push("/")
           }
            catch(e){
                toast.error(e instanceof Error ? e.message : "Failed to create note")
            }
       })
   };
   if (isLoading) {
       return (
           <div className="flex flex-col items-center justify-center h-[calc(100vh-3rem)]">
               <Card className="lg:w-[600px] lg:h-fit lg:py-5 w-full h-full max-lg:rounded-none max-lg:pt-20">
                   <CardHeader>
                       <CardTitle className="text-3xl">Loading...</CardTitle>
                       <CardDescription className="text-xl">Checking authentication</CardDescription>
                   </CardHeader>
               </Card>
           </div>
       );
   }
   if (!isAuthenticated) {
       return null;
   }
   return (
                <div className="flex flex-col items-center justify-center h-[calc(100vh-3rem)]">
                    <Card className="lg:w-[600px] lg:h-fit lg:py-5 w-full h-full max-lg:rounded-none max-lg:pt-20">
                        <CardHeader>
                            <CardTitle className="text-3xl">Create Note</CardTitle>
                            <CardDescription className="text-xl">Create a new note</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col lg:gap-4 gap-2">
                            <Controller
                            control ={form.control}
                            name="title"
                            render={({field,fieldState})=>(
                                <div className="flex flex-col lg:gap-2 gap-1">
                                    <Label className="max-lg:text-lg text-base" htmlFor="noteName">Note title</Label>
                                    <Input placeholder="Enter note name" className="max-lg:text-lg text-base lg:h-12 h-10" type="text" id="noteName" {...field} />
                                    {fieldState.error && <p className="text-red-500 text-xs">{fieldState.error.message}</p>}
                                </div>
                            )}
                            />
                            <Controller
                            control={form.control}
                            name="team"

                            render={({field})=>(
                                <div className="flex flex-col lg:gap-2 gap-1">
                                    <Label className="max-lg:text-lg text-base" htmlFor="noteTeam">Team</Label>
                                    <select className="text-foreground bg-background lg:h-12 h-10 rounded-md" {...field} value={field.value ?? ''} id="noteTeam">
                                        {
                                            !teams?
                                            <option value=''>No team </option>
                                            :
                                            <>
                                            <option value={undefined}>Select a team</option>
                                            {
                                                teams.map((team)=>(
                                                    <option value={team?._id} key={team?._id}>{team?.name}</option>
                                                ))
                                            }
                                            </>
                                        }
                                    </select>
                                </div>                                
                            )}/>
                            <Button type="submit" disabled={isPending} className="max-lg:text-lg text-base lg:h-12 h-10">{isPending ? <span className="flex items-center gap-1">Adding Note <Spinner className="size-5"/></span>: "Add Note"}</Button>
                        </form>
                        </CardContent>
                    </Card>
                </div>
    );
}