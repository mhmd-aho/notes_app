import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import error from '@/public/404.svg'

export default function NotFound(){
    return(
        <div className="flex flex-col items-center justify-center h-[calc(100vh-3rem)] w-screen  gap-2 p-4">
            <h1 className="text-3xl font-bold">Not Found</h1>
            <p className="text-lg">This Team you are looking for does not exist or you are not a member of this team.</p>
            <Button asChild size='lg'>
                <Link href="/">Back to Home</Link>
            </Button>
            <Image width={400} height={300} src={error} alt="window" className="object-center object-contain grayscale-100"/>
        </div>
    )
}