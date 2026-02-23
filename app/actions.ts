"use server"
import z from "zod";
import { NoteSchema } from "./schemas/note";
import { fetchMutation } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { getToken } from "@/lib/auth-server";
import { Id } from "@/convex/_generated/dataModel";
import { revalidatePath } from "next/cache";
import { TeamSchema } from "./schemas/team";
import { ConvexError } from "convex/values";

type FormValues = z.infer<typeof NoteSchema>
type TeamFormValues = z.infer<typeof TeamSchema>
export async function createNoteAction(data: FormValues){
    try{
        const token = await getToken()
        const validateData = NoteSchema.safeParse(data)
        if(!validateData.success){
            throw new Error(validateData.error.message)
        }
        
         await fetchMutation(api.notes.createNote,{
            title: validateData.data.title,
            team: validateData.data.team as Id<'teams'>
        },{token});
        revalidatePath("/")
        return{
            success: 'Note created successfully'
        }
    }
    catch(e){
        if (e instanceof ConvexError) {
            return { error: e.data as string }
        }
        const message = e instanceof Error ? e.message : 'Failed to create note'
        return { error: message }
    }
}
export async function createTeamAction(data: TeamFormValues){
    const token = await getToken()
    const validateData = TeamSchema.safeParse(data)
    if(!validateData.success){
        throw new Error(validateData.error.message)
    }
    try{
        await fetchMutation(api.team.createTeam,{
            name: validateData.data.name,
        },{token});
        revalidatePath("/")
        return {
            success: 'Team created successfully'
        }
    } catch(e){
        if (e instanceof ConvexError) {
            return { error: e.data as string }
        }
        const message = e instanceof Error ? e.message : 'Failed to create team'
        return { error: message }
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
        if (e instanceof ConvexError) {
            return { error: e.data as string }
        }
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

export async function createRequestAction(teamName: string) {
    const token = await getToken()
    try {
        await fetchMutation(api.team.createRequest, { teamName }, { token })
        revalidatePath("/")
        return {
            success: 'Request created successfully'
        }
    } catch (e) {
        if (e instanceof ConvexError) {
            return { error: e.data as string }
        }
        const message = e instanceof Error ? e.message : 'Failed to join team'
        return { error: message }
    }
}

export async function acceptRequestAction(teamId: Id<"teams">, userId: string) {
    const token = await getToken()
    try {
        await fetchMutation(api.team.acceptRequest, { teamId, userId }, { token })
        revalidatePath("/")
        return {
            success: 'Request accepted successfully'
        }
    } catch (e) {
        if (e instanceof ConvexError) {
            return { error: e.data as string }
        }
        const message = e instanceof Error ? e.message : 'Failed to accept request'
        return { error: message }
    }
}

export async function rejectRequestAction(teamId: Id<"teams">, userId: string) {
    const token = await getToken()
    try {
        await fetchMutation(api.team.rejectRequest, { teamId, userId }, { token })
        revalidatePath("/")
        return {
            success: 'Request rejected successfully'
        }
    } catch (e) {
        if (e instanceof ConvexError) {
            return { error: e.data as string }
        }
        const message = e instanceof Error ? e.message : 'Failed to reject request'
        return { error: message }
    }
}

export async function deleteTeamAction(teamId: Id<"teams">) {
    const token = await getToken()
    try {
        await fetchMutation(api.team.deleteTeam, { teamId }, { token })
        revalidatePath("/")
        return {
            success: 'Team deleted successfully'
        }
    } catch (e) {
        if (e instanceof ConvexError) {
            return { error: e.data as string }
        }
        const message = e instanceof Error ? e.message : 'Failed to delete team'
        return { error: message }
    }
}
export async function deleteMemberAction(memberId: Id<"members">) {
    const token = await getToken()
    try {
        await fetchMutation(api.members.deleteMember, { id:memberId }, { token })
        revalidatePath("/")
        return {
            success: 'Member deleted successfully'
        }
    } catch (e) {
        if (e instanceof ConvexError) {
            return { error: e.data as string }
        }
        const message = e instanceof Error ? e.message : 'Failed to delete member'
        return { error: message }
    }
}
export async function changeTeamNameAction(teamId: Id<"teams">, name: string) {
    const token = await getToken()
    try {
        await fetchMutation(api.team.changeTeamName, { teamId, name }, { token })
        revalidatePath("/")
        return {
            success: 'Team name changed successfully'
        }
    } catch (e) {
        if (e instanceof ConvexError) {
            return { error: e.data as string }
        }
        const message = e instanceof Error ? e.message : 'Failed to change team name'
        return { error: message }
    }
}