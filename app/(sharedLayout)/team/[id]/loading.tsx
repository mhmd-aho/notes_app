import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"

export default async function Loading(){
    return(
        <div className="flex flex-col items-center justify-center h-[calc(100vh-3rem)]">
                <Card className="lg:h-fit h-full lg:w-3xl w-full gap-10 max-lg:rounded-none">
                    <CardHeader>
                        <Skeleton className="h-8 w-44"/>
                        <Skeleton className="h-8 w-32"/>
                    </CardHeader>
                    <CardContent className="p-0 flex flex-col gap-2">
                        <div className="flex flex-col items-start px-2">
                            <Skeleton className="h-8 w-32 mb-2"/>
                            <Separator/>
                            <div className="flex gap-1 mt-2">
                                {Array.from({length: 4}).map((_, i) => (
                                    <Skeleton key={i} className="size-10 rounded-full"/>
                                ))}
                            </div>
                        </div>
                        <Separator/>
                        <div className="flex flex-col items-start px-2">
                            <Skeleton className="h-8 w-32 mb-2"/>
                            <Separator/>
                            <div className="flex gap-1 mt-2">
                                {Array.from({length: 4}).map((_, i) => (
                                    <Skeleton key={i} className="h-8 w-20 rounded-md"/>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>
        </div>
    )
}
