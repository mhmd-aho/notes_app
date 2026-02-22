import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  notes: defineTable({
    title: v.string(),
    team: v.id('teams'),
    content: v.object({
      type: v.literal("doc"),
      content: v.array(v.any()),
    }),
    author: v.string(),
    authorId: v.string(),
    updatedAt: v.number(),
  }).searchIndex('search_title',{
    searchField:'title'
  }).index("by_team", ["team"]),
  teams: defineTable({
    name: v.string(),
    ownerId: v.string(),
    requests: v.array(v.string()),
  })
    .index("by_owner", ["ownerId"])
    .index("by_name", ['name'])
    .index("by_owner_name", ["ownerId", "name"]),
  members: defineTable({
    teamId: v.id('teams'),
    userId: v.string(),
    role: v.union(v.literal('owner'), v.literal('member')),
  })
    .index("by_team", ["teamId"]) 
    .index("by_user", ["userId"])
    .index("by_user_team", ["userId", "teamId"]),
});