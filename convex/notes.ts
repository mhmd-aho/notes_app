import { query } from "./_generated/server";
import { v } from "convex/values";
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