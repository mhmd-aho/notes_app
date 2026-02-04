"use client"
import { Button } from "@/components/ui/button";
import {Plus} from "lucide-react"
import { useState, useTransition } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { X } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { NoteSchema } from "@/app/schemas/note";
import { createNoteAction } from "@/app/actions";
import { toast } from "sonner";
import z from "zod";
export function AddNotes() {
    const [open, setOpen] = useState(false);
    const [isPending,startTransition] = useTransition()
    const form = useForm({
        resolver: zodResolver(NoteSchema),
        defaultValues:{
            title:'',
            content:''
        }
    })
    const onSubmit = (data: z.infer<typeof NoteSchema>) => {
        startTransition(async () => {
            try{
                await createNoteAction(data)
                toast.success("Note created successfully")
                setOpen(false)
            }
            catch{
                toast.error("Failed to create note")
            }
        })
    }
    return (
        <>
        <Button onClick={() => setOpen(true)} variant="default" className="self-start max-lg:w-full">
            <Plus />
            Add Note
        </Button>
        {open && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/10 backdrop-blur-xs p-4">
                <Card className="relative w-2xl h-fit lg:py-5 py-2 max-lg:gap-3">
                        <Button onClick={() => setOpen(false)} variant="ghost" className=" absolute top-5 right-5 size-12">
                            <X className="size-full" />
                        </Button>
                    <CardHeader className="max-lg:gap-0">
                        <CardTitle className="lg:text-2xl text-xl">Add Note</CardTitle>
                        <CardDescription className="lg:text-lg text-base">Add a new note</CardDescription>
                    </CardHeader>
                    <CardContent className="max-lg:gap-0">
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
                            control ={form.control}
                            name="content"
                            render={({field,fieldState})=>(
                                <div className="flex flex-col lg:gap-2 gap-1">
                                    <Label className="max-lg:text-lg text-base" htmlFor="noteContent">Note content</Label>
                                    <Textarea placeholder="Enter note content" className="max-lg:text-lg text-base" id="noteContent" {...field}/>
                                    {fieldState.error && <p className="text-red-500 text-xs">{fieldState.error.message}</p>}
                                </div>
                            )}
                            />
                            <Button type="submit" disabled={isPending} className="max-lg:text-lg text-base lg:h-12 h-10">{isPending ? "Adding Note..." : "Add Note"}</Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        )}
        </>
    )
}