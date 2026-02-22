"use client"
import { Button } from "@/components/ui/button"
import { deleteNoteAction, deleteTeamAction } from "@/app/actions";
import { Id } from "@/convex/_generated/dataModel";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, AlertDialogCancel, AlertDialogAction } from "../ui/alert-dialog";
import { useTeam } from "@/app/context/useTeam";
export function DeleteButton({id,children}: {id: Id<'notes'> | Id<'teams'>, children: React.ReactNode}){
    const router = useRouter()
    const {selectedTeamId, setSelectedTeamId} = useTeam()
    const handleDelete = async() =>{
            if(children === 'note'){
                const result = await deleteNoteAction(id as Id<'notes'>);
                if (result.error){
                    toast.error(`${result.error}`)
                }
                else{
                    toast.success(result.success)
                    router.push("/")
                }
            }
            if(children === 'team'){
                try {
                    const result = await deleteTeamAction(id as Id<'teams'>)
                    if(result.error){
                        toast.error(result.error)
                    }else{
                        toast.success(result.success)
                        if (selectedTeamId === id) {
                            setSelectedTeamId(null)
                        }
                    }
                } catch (e) {
                    toast.error(e instanceof Error ? e.message : "Failed to delete team")
                }
            }
                    }
    return(
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="destructive" >Delete</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your {children} and remove your data from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete} variant="destructive">Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}