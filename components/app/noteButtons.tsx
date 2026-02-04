"use client"
import { Button } from "@/components/ui/button";
import { Id } from "@/convex/_generated/dataModel";
import { useState } from "react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "../ui/alert-dialog"; 
import { deleteNoteAction } from "@/app/actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
export default function NoteButtons({noteId}: {noteId: Id<"notes">}){
    const [isDelete,setIsDeleted] = useState(false)
    const router = useRouter()
    return(
        <>
            <Button>Edit</Button>
            <Button variant="destructive" onClick={()=>{setIsDeleted(true)}}>Delete</Button>
            <AlertDialog open={isDelete} onOpenChange={setIsDeleted}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle> Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete your note.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction variant="destructive" onClick={async()=>{
                            const result = await deleteNoteAction(noteId.toString());
                            if (result.error){
                                toast.error(`${result.error}`)
                            }
                            else{
                                toast.success(`${result.success}`)
                                router.push("/")
                            }
                            }}>Delete</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}
