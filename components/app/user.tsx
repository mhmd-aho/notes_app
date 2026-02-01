import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { User2Icon } from "lucide-react"
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import Link from "next/link";
export function User(){
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Avatar>
                    <AvatarImage src="" />
                    <AvatarFallback>
                        <User2Icon/>
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                         <Link className="h-full w-full" href='/auth/signin'>Sign in</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                         <Link className="h-full w-full" href='/auth/signup'>Sign up</Link>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}