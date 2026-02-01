import { Input } from "../ui/input";
import { Search } from "lucide-react";
import { ModeToggle } from "./themeToggle";
import Link from "next/link";
import { User } from "./user";

export function Header() {
    return (
        <header className="flex items-center justify-between px-2 h-12">
            <Link href="/"><h1 className="text-2xl font-bold">Notes App</h1></Link>
            <div className="flex items-center lg:gap-2 gap-1">
                <div className="max-lg:flex max-lg:justify-center max-lg:items-center lg:w-96 w-9 h-9 relative max-lg:mr-1  max-lg:rounded-md  max-lg:border max-lg:bg-background max-lg:shadow-xs dark:max-lg:bg-input/30 dark:max-lg:border-input  ">
                    <button className="size-6 lg:size-8 p-1 hover:bg-neutral-800 rounded-l-sm lg:absolute left-0.5 top-0.5">
                        <Search className="w-full h-full" />
                    </button>
                    <Input className="h-full w-full pl-10 hidden lg:block" placeholder="Search notes" />
                </div>
                <ModeToggle  />
                <User/>
            </div>
        </header>
    )
}