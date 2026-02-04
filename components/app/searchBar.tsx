"use client"
import { Input } from "@/components/ui/input";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { Search } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
interface SearchNoteResult{
    _id:Id<"notes">,
    title:string,
    author:string,
}
export default function SearchBar(){
    const [searchQuery, setSearchQuery] = useState('')
    const [isOpen,setIsOpen] = useState(false)
    const [isMobile,setIsMobile] = useState(false)
    const searchResult = useQuery(api.notes.searchNotes,searchQuery.length > 2 ? {query:searchQuery} : 'skip')
    useEffect(()=>{
        const handleResize = () => {
            setIsMobile(window.innerWidth < 1024)
        }
        handleResize()
        window.addEventListener('resize',handleResize)
        return () => window.removeEventListener('resize',handleResize)
    },[])
    return(
        <>
        <div className="max-lg:flex max-lg:justify-center max-lg:items-center lg:w-96 w-9 h-9 relative max-lg:mr-1  max-lg:rounded-md  max-lg:border max-lg:bg-background max-lg:shadow-xs dark:max-lg:bg-input/30 dark:max-lg:border-input  ">
                <button disabled={!isMobile} onClick={()=>{
                    if(isOpen){
                        setIsOpen(false)
                        setSearchQuery('')
                    }else{
                        setIsOpen(true)
                    }
                }} className="size-6 lg:size-7 p-1 rounded-l-sm lg:absolute left-1 top-1">
                    <Search className="w-full h-full" />
                </button>
                <Input onChange={(e)=>setSearchQuery(e.target.value)} value={searchQuery} className="h-full w-full pl-10 hidden lg:block" placeholder="Search notes" />
                {
                    searchQuery.length > 0 && <SearchResult searchResult={searchResult} setSearchQuery={setSearchQuery}/>
                }
        </div>
        {
            isOpen && (
                <div className="absolute top-12 left-0 h-[calc(100vh-3rem)] w-full bg-background p-2 z-50 flex flex-col gap-2">
                    <Input onChange={(e)=>setSearchQuery(e.target.value)} value={searchQuery} placeholder="Search notes" />
                    {
                        searchResult === undefined ? (
                            <p className="text-2xl font-bold">Search for notes...</p>
                        ) :
                        searchResult.length === 0 ? (
                            <p className="text-2xl font-bold">No results found</p>
                        ) :
                        (
                            searchResult?.map((note)=>(
                                <Link onClick={()=>{setSearchQuery('')}} className="text-xl font-semibold p-2 border-b border-muted-foreground w-full" key={note._id} href={`/note/${note._id}`}>
                                    <p>{note.title}</p>
                                    <p className="text-sm font-normal text-muted-foreground">{note.author}</p>
                                </Link>
                            ))
                        )
                    }
                    
                    
                </div>
            )
        }
        </>
    )
}
const SearchResult = ({searchResult,setSearchQuery}: {searchResult: Array<SearchNoteResult> | undefined ,setSearchQuery: (value: string) => void})=>{
    if(searchResult === undefined){
        return(
            <div className="absolute top-full left-0 w-full h-96 flex items-center justify-center dark:bg-neutral-900 bg-neutral-200 rounded-md shadow-md mt-2 z-50">
                <p className="text-2xl font-bold">Search for notes...</p>
            </div>
        )
    }
    if(searchResult.length === 0){
        return(
            <div className="absolute top-full left-0 w-full h-96 flex items-center justify-center dark:bg-neutral-900 bg-neutral-200 rounded-md shadow-md mt-2 z-50 ">
                <p className="text-2xl font-bold">No results found</p>
            </div>
        )
    }
    return(
        <div className="absolute top-full left-0 w-full h-96 flex flex-col overflow-y-auto overflow-x-hidden dark:bg-neutral-900 bg-neutral-200 rounded-md shadow-md mt-2 z-50">
            {
                searchResult?.map((note)=>(
                    <Link onClick={()=>{setSearchQuery('')}} className="text-xl font-semibold p-2 border-b border-muted-foreground hover:bg-muted-foreground/20" key={note._id} href={`/note/${note._id}`}>
                        <p>{note.title}</p>
                        <p className="text-sm font-normal text-muted-foreground">{note.author}</p>
                    </Link>

                ))
            }
        </div>
    )
}