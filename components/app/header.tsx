import { ModeToggle } from "./themeToggle";
import Link from "next/link";
import { User } from "./user";
import SearchBar from "./searchBar";

export function Header() {
    return (
        <header className="flex items-center justify-between px-2 h-12">
            <Link href="/"><h1 className="text-2xl font-bold">Notes App</h1></Link>
            <div className="flex items-center lg:gap-2 gap-1">
                <SearchBar/>
                <ModeToggle  />
                <User/>
            </div>
        </header>
    )
}