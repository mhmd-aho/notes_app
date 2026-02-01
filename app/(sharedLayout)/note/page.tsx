import { Avatar, AvatarFallback, AvatarImage, AvatarGroup } from "@/components/ui/avatar"
import { Card , CardContent , CardDescription , CardHeader , CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { User2Icon } from "lucide-react"
export default function Note() {
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
                        <CardTitle className="text-2xl">Note name</CardTitle>
                        <CardDescription className="text-lg">Created at : 31-01-2026</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1">
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