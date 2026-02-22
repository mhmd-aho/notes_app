"use client"
import { Button } from "@/components/ui/button";
import { useTransition, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TeamSchema } from "@/app/schemas/team";
import { createTeamAction } from "@/app/actions";
import { toast } from "sonner";
import z from "zod";
import { useRouter } from "next/navigation";
import { useConvexAuth } from "convex/react";
import { Spinner } from "@/components/ui/spinner";
export default function CreateTeam() {
   const {isAuthenticated , isLoading}= useConvexAuth();
   const router = useRouter();
   const [isPending,startTransition] = useTransition();
   const form = useForm({
       resolver: zodResolver(TeamSchema),
       defaultValues:{
           name:'',
       }
   });
   
   useEffect(()=>{
       if(!isLoading && !isAuthenticated){
        router.push("/auth/signup")
       }
   },[isLoading, isAuthenticated, router]);
   const onSubmit = (data: z.infer<typeof TeamSchema>) => {
       startTransition(async () => {
           try{
               await createTeamAction(data)
               toast.success("Team created successfully")
               router.push("/")
           }
           catch{
               toast.error("Failed to create team")
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
                            <CardTitle className="text-3xl">Create Team</CardTitle>
                            <CardDescription className="text-xl">Create a new team</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col lg:gap-4 gap-2">
                            <Controller
                            control ={form.control}
                            name="name"
                            render={({field,fieldState})=>(
                                <div className="flex flex-col lg:gap-2 gap-1">
                                    <Label className="max-lg:text-lg text-base" htmlFor="teamName">Team name</Label>
                                    <Input placeholder="Enter team name" className="max-lg:text-lg text-base lg:h-12 h-10" type="text" id="teamName" {...field} />
                                    {fieldState.error && <p className="text-red-500 text-xs">{fieldState.error.message}</p>}
                                </div>
                            )}
                            />
                            <Button type="submit" disabled={isPending} className="max-lg:text-lg text-base lg:h-12 h-10">{isPending ? <span className="flex items-center gap-1">Creating Team <Spinner className="size-5"/></span>: "Create Team"}</Button>
                        </form>
                        </CardContent>
                    </Card>
                </div>
    );
}