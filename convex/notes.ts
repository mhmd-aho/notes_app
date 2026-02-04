import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { authComponent } from "./auth";
import { Doc, Id } from "./_generated/dataModel";
export const getNotes = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("notes").collect();
  },
});
export const getNoteById = query({
  args: {id: v.id("notes")},
  handler: async (ctx,args) => {
    return await ctx.db.get(args.id);
  },
});
export const createNote = mutation({
  args:{
    title:v.string(),
    content:v.string(),
  },
  handler: async (ctx,args)=>{
    const user = await authComponent.safeGetAuthUser(ctx)
    if(!user){
      throw new Error('Unauthorized')
    }
    const newNote = await ctx.db.insert("notes",{
      title: args.title,
      content: args.content,
      author: user.name,
      updatedAt: Date.now(),
    })
    return newNote
  }
})
export const deleteNote = mutation({
  args:{
    id:v.id("notes"),
  },
  handler: async (ctx,args)=>{
    const user = await authComponent.safeGetAuthUser(ctx)
    const note = await ctx.db.get(args.id)
    if(!user){
      throw new Error('Unauthorized')
    }
    if (note?.author !== user.name) {
      throw new Error('You are not the creator of this note to delete it')
    }
    await ctx.db.delete(args.id)
  }
})
interface SearchNoteResult{
    _id:Id<"notes">,
    title:string,
    author:string,
}
export const searchNotes = query({
  args: { query: v.string() },
  handler: async (ctx, args) => {
    const result: Array<SearchNoteResult> = []
    const pushDocs = async (docs: Array<Doc<'notes'>>) => {
      for(const doc of docs){
        result.push({
          _id: doc._id,
          title: doc.title,
          author: doc.author,
        })
      }
    }
    const titleMatches = await ctx.db.query('notes').withSearchIndex('search_title',(q)=>q.search('title',args.query)).collect()
    await pushDocs(titleMatches)
    return result
  }
})