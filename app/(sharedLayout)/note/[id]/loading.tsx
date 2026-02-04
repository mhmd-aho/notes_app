import { AvatarGroup } from "@/components/ui/avatar";
import { Card, CardContent, CardFooter, CardHeader} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading(){
    return(
        <div className="flex flex-col items-center justify-center h-[calc(100vh-3rem)] gap-2 p-4">
            <AvatarGroup>
                <Skeleton className="size-8 rounded-full"/>
                <Skeleton className="size-8 rounded-full"/>
                <Skeleton className="size-8 rounded-full"/>
            </AvatarGroup>
            <div className="flex-1 w-full">
                <Card className="h-full">
                    <CardHeader className="gap-1">
                       <Skeleton className="h-8 w-1/3"/>
                       <Skeleton className="h-4 w-1/4"/>
                       <Skeleton className="h-4 w-1/4"/>
                       <Skeleton className="h-4 w-1/4"/>
                    </CardHeader>
                    <CardContent className="flex-1 text-lg">
                        <Skeleton className="h-full w-full"/>
                    </CardContent>
                    <CardFooter className="flex items-center justify-end gap-2">
                        <Skeleton className="h-10 w-20 rounded-md"/>
                        <Skeleton className="h-10 w-20 rounded-md"/>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}