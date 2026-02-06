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
import { useConvexAuth } from "convex/react";
export default function CreateNote() {
   const {isAuthenticated , isLoading}= useConvexAuth();
   const router = useRouter();
   const [isPending,startTransition] = useTransition();
   const form = useForm({
       resolver: zodResolver(NoteSchema),
       defaultValues:{
           title:'',
       }
   });
   
   useEffect(()=>{
       if(!isLoading && !isAuthenticated){
        router.push("/auth/signin")
       }
   },[isLoading, isAuthenticated, router]);
   const onSubmit = (data: z.infer<typeof NoteSchema>) => {
       startTransition(async () => {
           try{
               await createNoteAction(data)
               toast.success("Note created successfully")
               router.push("/")
           }
           catch{
               toast.error("Failed to create note")
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
                            <Button type="submit" disabled={isPending} className="max-lg:text-lg text-base lg:h-12 h-10">{isPending ? "Adding Note..." : "Add Note"}</Button>
                        </form>
                        </CardContent>
                    </Card>
                </div>
    );
}