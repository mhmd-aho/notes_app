import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { authComponent } from "./auth";
import { Doc, Id } from "./_generated/dataModel";

export const getNotes = query({
  args: {teamid: v.id('teams')},
  handler: async (ctx,args) => {
      return await ctx.db.query("notes").withIndex("by_team", (q) => q.eq("team", args.teamid)).collect();

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
    team:v.id('teams'),
  },
  handler: async (ctx,args)=>{
    const user = await authComponent.safeGetAuthUser(ctx)
    if(!user){
      throw new Error('Unauthorized')
    }
    const newNote = await ctx.db.insert("notes",{
      title: args.title,
      author: user.username || user.name,
      authorId: user._id,
      team:args.team,
      updatedAt: Date.now(),
      content: {
        type: "doc",
        content: [],
      },
      
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
    if(!user){
      throw new Error('Unauthorized')
    }
    const note = await ctx.db.get(args.id)
    if(!note){
      throw new Error('Note not found')
    }
    const team = await ctx.db.get(note.team)
    if (note.author === user.name || team?.ownerId === user._id) {
      await ctx.db.delete(args.id)
    }else{
      throw new Error('You are not the creator of this note or owner of the team to delete it')
    }
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

// Update the timestamp when a note is edited
export const updateNoteTimestamp = mutation({
  args: {
    id: v.id("notes"),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, {
      updatedAt: Date.now(),
    });
  },
});