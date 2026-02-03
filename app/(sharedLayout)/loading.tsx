import { AvatarGroup } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";


export default async function Loading() {
    return (
        <div className="flex flex-col items-center justify-center lg:h-[calc(100vh-3rem)]  h-fit gap-2 p-4">
              <Skeleton className="self-start w-full h-10 lg:h-14 lg:w-36"/>
          <div className="flex-1 w-full flex justify-center items-start">
            <Table className="lg:w-3/4 w-full mx-auto">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-1/2">Notes names</TableHead>
                  <TableHead className="w-1/5">Created at</TableHead>
                  <TableHead className="w-1/5">People in note</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                        {Array.from({length: 10}).map((_,index)=>(
                          <TableRow key={index}>
                            <TableCell>
                              <Skeleton className="w-full h-8" />
                            </TableCell>
                            <TableCell>
                              <Skeleton className="w-full h-8" />
                            </TableCell>
                            <TableCell>
                              <AvatarGroup>
                                {Array.from({length: 3}).map((_,index)=>(<Skeleton key={index} className="w-8 h-8 rounded-full" />))}
                              </AvatarGroup>
                            </TableCell>
                          </TableRow>
                        ))
                        }
              </TableBody>
              <TableCaption>List of notes</TableCaption>
            </Table>
          </div>
    </div>
  );
}
