import { Avatar, AvatarFallback, AvatarImage, AvatarGroup } from "@/components/ui/avatar"
import { Card , CardContent , CardDescription , CardHeader , CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { User2Icon } from "lucide-react"
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
interface Props {
    params: Promise<{id: Id<"notes">}>
}
export default async function Note({params}: Props) {
    const {id} = await params;
    const note = await fetchQuery(api.notes.getNoteById, {id});
    if(!note){
        return(
            <div className="flex flex-col items-center justify-center h-[calc(100vh-3rem)] gap-2 p-4">
            <div className="flex-1 w-full">
                <Card className="h-full">
                    <CardHeader>
                        <CardTitle className="text-2xl">Note not found</CardTitle>
                    </CardHeader>
                </Card>
            </div>
        </div>
        )
    }
    const date = new Date(note._creationTime).toLocaleDateString('en-US',{
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                      second: "numeric",
                    });
    return (
        <div className="flex flex-col items-center justify-center h-[calc(100vh-3rem)] gap-2 p-4">
            <AvatarGroup>
                <Avatar>
                    <AvatarImage src="" />
                    <AvatarFallback>
                        <User2Icon/>
                    </AvatarFallback>
                </Avatar>
                <Avatar>
                    <AvatarImage src="" />
                    <AvatarFallback>
                        <User2Icon/>
                    </AvatarFallback>
                </Avatar>
                <Avatar>
                    <AvatarImage src="" />
                    <AvatarFallback>
                        <User2Icon/>
                    </AvatarFallback>
                </Avatar>
            </AvatarGroup>
            <div className="flex-1 w-full">
                <Card className="h-full">
                    <CardHeader>
                        <CardTitle className="text-2xl">{note.title}</CardTitle>
                        <CardDescription className="text-base">Author : {note.author}</CardDescription>
                        <CardDescription className="text-base" >Created at : {date}</CardDescription>
                        <CardDescription className="text-base">Last updated at : {note._creationTime}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1">
                        {note.content}
                    </CardContent>
                    <CardFooter className="flex items-center justify-end gap-2">
                        <Button>Edit</Button>
                        <Button variant="destructive">Delete</Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}