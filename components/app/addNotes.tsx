"use client"
import { Button } from "@/components/ui/button";
import {Plus} from "lucide-react"
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { X } from "lucide-react";
export function AddNotes() {
    const [open, setOpen] = useState(false);
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
                        <form className="flex flex-col lg:gap-4 gap-2">
                            <div className="flex flex-col lg:gap-2 gap-1">
                                <Label className="max-lg:text-lg text-base" htmlFor="noteName">Note name</Label>
                                <Input placeholder="Enter note name" className="max-lg:text-lg text-base lg:h-12 h-10" type="text" id="noteName" />
                            </div>
                            <div className="flex flex-col lg:gap-2 gap-1">
                                <Label className="max-lg:text-lg text-base" htmlFor="noteContent">Note content</Label>
                                <Textarea placeholder="Enter note content" className="max-lg:text-lg text-base" id="noteContent" />
                            </div>
                            <Button type="submit" className="max-lg:text-lg text-base lg:h-12 h-10">Add Note</Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        )}
        </>
    )
}