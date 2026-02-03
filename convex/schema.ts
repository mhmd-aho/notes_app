import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  notes: defineTable({
    title: v.string(),
    content: v.string(),
    author: v.optional(v.string()),
    updatedAt: v.optional(v.number()),
  }),
});