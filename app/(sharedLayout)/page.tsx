import {
  Table,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Plus} from "lucide-react";
import Link from "next/link";
import { Notes } from "@/components/app/notes";
import { Button } from "@/components/ui/button";

export default async function Home() {
      return (
        <div className="relative flex flex-col items-center justify-center h-[calc(100vh-3rem)] w-screen gap-2 p-4">
              <Button className="self-start max-lg:w-full" variant="default" asChild>
                <Link  href="/create-note">
                    <Plus />
                    Add Note
                </Link>
              </Button>
          <div className="flex-1 w-full flex justify-center items-start">
            <Table className="lg:w-3/4 w-full mx-auto">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-1/2">Notes names</TableHead>
                  <TableHead className="w-1/5">Created at</TableHead>
                  <TableHead className="w-1/5">Last update at</TableHead>
                </TableRow>
              </TableHeader>
              <Notes/>
              <TableCaption>List of notes</TableCaption>
            </Table>
          </div>
    </div>
  );
}

