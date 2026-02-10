"use server"
import z from "zod";
import { NoteSchema } from "./schemas/note";
import { fetchMutation } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { getToken } from "@/lib/auth-server";
import { Id } from "@/convex/_generated/dataModel";
import { revalidatePath } from "next/cache";

type FormValues = z.infer<typeof NoteSchema>
export async function createNoteAction(data: FormValues){
    try{
        const token = await getToken()
        const validateData = NoteSchema.safeParse(data)
        if(!validateData.success){
            throw new Error(validateData.error.message)
        }
        await fetchMutation(api.notes.createNote,{
            title: validateData.data.title,
        },{token});
        revalidatePath("/")
        return{
            success: 'Note created successfully'
        }
    }
    catch{
        return{
            error: 'Failed to create note'
        }
    }
}
export async function deleteNoteAction(id: string){
    try{
        const token = await getToken()
        await fetchMutation(api.notes.deleteNote,{id:id as Id<"notes">},{token})
        revalidatePath('/')
        return {
            success: 'Note deleted successfully'
        }
    }
    catch(e){
        const message = e instanceof Error ? e.message : 'Failed to delete note'
        if(message.includes('You are not the creator')){
            return{
                error: 'You are not the creator of this note to delete it'
            }
        }
        return{
            error: message
        }
    }
}
