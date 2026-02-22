import { ModeToggle } from "./themeToggle";
import Link from "next/link";
import SearchBar from "./searchBar";
import Profile from "./profile";
import { Separator } from "../ui/separator";

export function Header() {
    return (
        <header className="flex items-center justify-between px-2 h-12">
            <div className="flex items-center lg:gap-5 gap-2 h-full py-1">
                <Link  href="/"><h1 className="lg:text-2xl text-xl font-bold  p-2 max-lg:ml-7">Notes App</h1></Link>
                <Separator orientation="vertical" className="max-lg:hidden"/>
                <Profile/>
            </div>
            <div className="flex items-center lg:gap-2 gap-1">
                <SearchBar/>
                <ModeToggle  />
            </div>
        </header>
    )
}