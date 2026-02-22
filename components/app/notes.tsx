'use client'
import { Edit } from "lucide-react";
import { timeAgo } from "@/lib/time";
import Link from "next/link";
import { TableBody, TableCell, TableRow } from "../ui/table";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useTeam } from "@/app/context/useTeam";
import { Id } from "@/convex/_generated/dataModel";

export function Notes(){
    const {selectedTeamId} = useTeam()
    const notes = useQuery(api.notes.getNotes,selectedTeamId && selectedTeamId !== 'no team' && selectedTeamId !== 'No team'? {teamid:selectedTeamId as Id<"teams">} : 'skip')
    return (
            <TableBody>
                {notes && notes.length > 0 ?
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
                          <h1 className="text-2xl font-bold">No notes found</h1>
                        </TableCell>
                      </TableRow>
                }
            </TableBody>
    )
}