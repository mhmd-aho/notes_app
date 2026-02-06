"use client"
import { Button } from "@/components/ui/button"
import { deleteNoteAction } from "@/app/actions";
import { Id } from "@/convex/_generated/dataModel";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
export function DeleteButton({id}: {id: Id<"notes">}){
    const router = useRouter()
    return(
         
            <Button onClick={async() =>
                {
                const result = await deleteNoteAction(id);
                if (result.error){
                    toast.error(`${result.error}`)
                }
                else{
                    toast.success(result.success)
                    router.push("/")
                }
                }}
            className="ml-auto" variant="destructive">Delete</Button>
    )
}