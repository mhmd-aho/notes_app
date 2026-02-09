
import { Card , CardContent , CardDescription , CardFooter, CardHeader , CardTitle} from "@/components/ui/card"
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Presence } from "@/components/app/presence";
import { getToken } from "@/lib/auth-server";
import { redirect, notFound } from "next/navigation";
import { CollaborativeEditor } from "@/components/app/collaborativeEditor";
import { DeleteButton } from "@/components/app/deleteButton";
import { timeAgo } from "@/lib/time";
interface Props {
    params: Promise<{id: Id<"notes">}>
}
export async function generateMetadata({params}: {params: {id: Id<"notes">}}) {
    const {id} = await params
    const note = await fetchQuery(api.notes.getNoteById, {id})
    if (!note) {
        return {
            title: 'Note not found',
        }
    }
    return {
        title: `${note.title} | Notes app`,
        description: `Note: ${note.title}`,
    }
}
export default async function Note({params}: Props) {
    const {id} = await params;
    const token = await getToken()
    const note = await fetchQuery(api.notes.getNoteById, {id});
    if(!note){
        return notFound();
    }
    const userId = await fetchQuery(api.presence.getUserId, {},{token})
    if(!userId){
        return redirect("/auth/signup")
    }
    const creationDate = new Date(note._creationTime).toLocaleDateString('en-US',{
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                      second: "numeric",
                    });
        let updateDate;
        if(typeof note.updatedAt === "number"){
        updateDate = timeAgo(note.updatedAt)
        }
       
    return (
        <div className="flex flex-col items-center justify-center h-[calc(100vh-3rem)] gap-2 p-4">
                {userId && <Presence noteId={note._id} userId={userId}/>}
            <div className="flex-1 w-full">
                <Card className="h-full">
                    <CardHeader className="gap-1">
                        <CardTitle className="text-2xl">{note.title}</CardTitle>
                        {note.author && <CardDescription className="text-sm">Author : {note.author}</CardDescription>}
                        <CardDescription className="text-sm" >Created at : {creationDate}</CardDescription>
                        {note.updatedAt && <CardDescription className="text-sm">Last updated at : {updateDate}</CardDescription>}
                    </CardHeader>
                    <CardContent className="flex-1 text-lg">
                        <CollaborativeEditor  documentId={note._id}/>
                    </CardContent>
                    <CardFooter className="flex justify-end">
                        <DeleteButton id={note._id}/>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}