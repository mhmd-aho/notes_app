import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  notes: defineTable({
    title: v.string(),
    content: v.object({
      type: v.literal("doc"),
      content: v.array(v.any()),
    }),
    author: v.string(),
    authorId: v.string(),
    updatedAt: v.number(),
  }).searchIndex('search_title',{
    searchField:'title'
  }),
});