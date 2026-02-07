import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
export default async function Loading(){
    return(
         <div className="flex flex-col items-center justify-center h-[calc(100vh-3rem)]">
                    <Card className="lg:w-[600px] lg:h-fit lg:py-5 w-full h-full max-lg:rounded-none max-lg:pt-20">
                        <CardHeader>
                            <Skeleton className="h-8 w-1/3"/>
                            <Skeleton className="h-4 w-1/4"/>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-col lg:gap-4 gap-2">
                                <Skeleton className="h-12 w-full"/>
                                <Skeleton className="max-lg:text-lg text-base lg:h-12 h-10"/>
                          </div>
                        </CardContent>
                    </Card>
                </div>
    )
}