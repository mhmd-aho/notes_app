import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Plus} from "lucide-react";
import { api } from "@/convex/_generated/api";
import Link from "next/link";
import { Edit } from "lucide-react";
import { fetchQuery } from "convex/nextjs";
import { Button } from "@/components/ui/button";
import { timeAgo } from "@/lib/time";
export default async function Home() {
  const notes = await fetchQuery(api.notes.getNotes);
      return (
        <div className="relative flex flex-col items-center justify-center h-[calc(100vh-3rem)] gap-2 p-4">
              <Link className="self-start" href="/create-note">
                <Button variant="default" className="max-lg:w-full">
                    <Plus />
                    Add Note
                </Button>
              </Link>
          <div className="flex-1 w-full flex justify-center items-start">
            <Table className="lg:w-3/4 w-full mx-auto">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-1/2">Notes names</TableHead>
                  <TableHead className="w-1/5">Created at</TableHead>
                  <TableHead className="w-1/5">Last update at</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {
                      notes?
                      notes.map((note) =>{
                        const date = new Date(note._creationTime).toLocaleDateString('en-US',{
                          year: "numeric",
                          month: "numeric",
                          day: "numeric",
                        }).replace(/\//g,"-");
                        const lastUpdate = timeAgo(note.updatedAt);
                        return(
                          <TableRow key={note._id}>
                          <TableCell className="flex items-center gap-2">
                            <Link className="flex items-center gap-2 hover:text-background hover:bg-foreground p-1 rounded-md transition-all duration-200" href={`/note/${note._id}`}>
                                <Edit/>
                            </Link>
                            {note.title}
                          </TableCell>
                          <TableCell>{date}</TableCell>
                          <TableCell className="size-fit">
                            {lastUpdate}
                          </TableCell>
                        </TableRow>
                      );
                      }):
                      <TableRow>
                        <TableCell colSpan={3} className="text-center">
                          No notes found
                        </TableCell>
                      </TableRow>
                }
              </TableBody>
              <TableCaption>List of notes</TableCaption>
            </Table>
          </div>
    </div>
  );
}
