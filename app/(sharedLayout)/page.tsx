import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage, AvatarGroup } from "@/components/ui/avatar"
import { AddNotes } from "@/components/app/addNotes"
import { User2Icon } from "lucide-react";
import { api } from "@/convex/_generated/api";
import Link from "next/link";
import { Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchQuery } from "convex/nextjs";
import { isAuthenticated } from "@/lib/auth-server";
export default async function Home() {
  const auth = await isAuthenticated();
  const notes = await fetchQuery(api.notes.getNotes);
      return (
        <div className="flex flex-col items-center justify-center h-[calc(100vh-3rem)] gap-2 p-4">
              <AddNotes/>
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
                {
                    auth?
                      notes?
                      notes.map((note) =>{
                        const date = new Date(note._creationTime).toLocaleDateString('en-US',{
                          year: "numeric",
                          month: "numeric",
                          day: "numeric",
                        }).replace(/\//g,"-");
                        return(
                          <TableRow key={note._id}>
                          <TableCell className="flex items-center gap-2">
                            <Link className="flex items-center gap-2 hover:text-background hover:bg-foreground p-1 rounded-md transition-all duration-200" href={`/note/${note._id}`}>
                                <Edit/>
                            </Link>
                            {note.title}
                          </TableCell>
                          <TableCell>{date}</TableCell>
                          <TableCell>
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
                          </TableCell>
                        </TableRow>
                      );
                      }):
                      <TableRow>
                        <TableCell colSpan={3} className="text-center">
                          No notes found
                        </TableCell>
                      </TableRow>
                      :
                        Array.from({length: 10}).map((_,index)=>(
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
            {
              !auth&&(
                 <div className="absolute inset-0 bg-background/30 backdrop-blur-sm flex items-center justify-center">
                           <div className="w-2xs h-50 flex flex-col items-center justify-center gap-4 bg-card text-card-foreground rounded-xl border  shadow-sm">
                             <h1 className="text-2xl font-bold">Sign in to continue</h1>
                             <Button size="lg">
                              <Link href="/auth/signin">
                                Sign in
                              </Link>
                             </Button>
                           </div>

                  </div>
                )
            }
          </div>
    </div>
  );
}
