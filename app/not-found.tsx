import Image from "next/image";
import error from "@/public/404.svg"
import Link from "next/link";
import { Button } from "@/components/ui/button";
export default function NotFound(){
    return(
        <div className="flex flex-col items-center justify-center h-screen w-screen gap-2 p-4">
            <h1 className="text-3xl font-bold">404</h1>
            <h1 className="text-3xl font-bold">Page Not Found</h1>
            <p className="text-lg text-muted-foreground text-center">The page you are looking for might be removed,<br/>had its name changed, or is temporarily unavailable.</p>
            <Button asChild size='lg'>
                <Link href="/">Back to Home</Link>
            </Button>
            <Image width={400} height={300} src={error} alt="window" className="object-center object-contain grayscale-100"/>
        </div>
    )
}