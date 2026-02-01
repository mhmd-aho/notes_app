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
export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-3rem)] gap-2 p-4">
          <AddNotes/>
          <div className="flex-1 w-full flex justify-center items-start">
            <Table className="lg:w-3/4 w-full mx-auto">
              <TableCaption>List of notes</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-1/2">Notes names</TableHead>
                  <TableHead className="w-1/5">Created at</TableHead>
                  <TableHead className="w-1/5">People in note</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="flex items-center gap-2">
                    Projects
                  </TableCell>
                  <TableCell>31-01-2026</TableCell>
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
              </TableBody>
            </Table>

          </div>
    </div>
  );
}
