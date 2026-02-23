import { mutation, query } from "./_generated/server";
import { ConvexError, v } from "convex/values";
import { authComponent } from "./auth";
export const createTeam = mutation({
  args:{
    name:v.string(),
  },
  handler: async (ctx,args)=>{
    const user = await authComponent.safeGetAuthUser(ctx)
    if(!user){
      throw new ConvexError('Unauthorized')
    }
    const team = await ctx.db.query('teams').withIndex('by_name',(q)=>q.eq('name',args.name)).first()
    if(team){
      throw new ConvexError('Team already exists')
    }
    const newTeam = await ctx.db.insert("teams",{
      name: args.name,
      ownerId: user._id,
      requests: [],
    })
    await ctx.db.insert("members",{
      teamId: newTeam,
      userId: user._id,
      role: 'owner',
    })
    return newTeam
  }
})
export const getTeamById = query({
  args:{
    id: v.id("teams"),
  },
  handler: async (ctx,args)=>{
    const team = await ctx.db.get(args.id)
    if(!team){
      throw new ConvexError('Team not found')
    }
    const requestsWithUsers = await Promise.all(
      team.requests.map(async (requestId) => {
        const requester = await authComponent.getAnyUserById(ctx, requestId);
        return {
          id: requestId,
          name: requester?.username || requester?.name || "Unknown User",
        };
      })
    );
    return {
      ...team,
      requestsDetails: requestsWithUsers,
    }
  }
})
export const getTeamByName = query({
  args:{
    teamName: v.string(),
  },
  handler: async (ctx,args)=>{
    return await ctx.db.query('teams').withIndex('by_name',(q)=>q.eq('name',args.teamName)).first()
  }
})
export const getTeamMembers = query({
  args:{
    id:v.id("teams"),
  },
  handler: async (ctx,args)=>{
    return await ctx.db.query("members").withIndex("by_team", (q) => q.eq("teamId", args.id)).collect();
  }
})
export const getUserTeams = query({
  handler: async (ctx) => {
    const user = await authComponent.safeGetAuthUser(ctx);
    if (!user) {
      throw new ConvexError("Unauthorized");
    }
    const userId = user._id;
    const memberships = await ctx.db.query("members").withIndex("by_user", (q) => q.eq("userId", userId)).collect();
    const teams = (await Promise.all(memberships.map((membership) => ctx.db.get(membership.teamId)))).filter(Boolean);
    return await Promise.all(
      teams.map(async (team) => {
        const requestsWithUsers = await Promise.all(
          team!.requests.map(async (requestId) => {
            const requester = await authComponent.getAnyUserById(ctx, requestId);
            return {
              id: requestId,
              name: requester?.username || requester?.name || "Unknown User",
            };
          })
        );
        return {
          ...team,
          requestsDetails: requestsWithUsers,
        };
      })
    );
  }
});

export const createRequest = mutation({
  args:{
    teamName:v.string(),
  },
  handler: async (ctx,args)=>{
    const user = await authComponent.safeGetAuthUser(ctx)
    if(!user){
      throw new ConvexError('Unauthorized')
    }
    const team = await ctx.db.query("teams").withIndex('by_name',(q)=>q.eq('name',args.teamName)).first()
    if(!team){
      throw new ConvexError('Team not found')
    }
    const membership = await ctx.db.query("members").withIndex("by_user_team", (q) => q.eq("userId", user._id).eq("teamId", team._id)).first();
    if(membership){
      throw new ConvexError('You are already a member of this team')
    }
    if(team.requests.includes(user._id)){
      throw new ConvexError('You have already sent a request to this team')
    }
    await ctx.db.patch(team._id,{
      requests: [...team.requests, user._id],
    })
    return team
  }
})
export const acceptRequest = mutation({
  args:{
    teamId:v.id("teams"),
    userId:v.string(),
  },
  handler: async (ctx,args)=>{
    const user = await authComponent.safeGetAuthUser(ctx)
    if(!user){
      throw new ConvexError('Unauthorized')
    }
    const team = await ctx.db.get(args.teamId)
    if(!team){
      throw new ConvexError('Team not found')
    }
    if(team.ownerId !== user._id){
      throw new ConvexError('You are not the owner of this team')
    }
    if(!team.requests.includes(args.userId)){
      throw new ConvexError('User has not sent a request to this team')
    }
    await ctx.db.patch(team._id,{
      requests: team.requests.filter((id)=>id !== args.userId),
    })
    await ctx.db.insert("members",{
      teamId: team._id,
      userId: args.userId,
      role: 'member',
    })
    return team
  }
})
export const rejectRequest = mutation({
  args:{
    teamId:v.id("teams"),
    userId:v.string(),
  },
  handler: async (ctx,args)=>{
    const user = await authComponent.safeGetAuthUser(ctx)
    if(!user){
      throw new ConvexError('Unauthorized')
    }
    const team = await ctx.db.get(args.teamId)
    if(!team){
      throw new ConvexError('Team not found')
    }
    if(team.ownerId !== user._id){
      throw new ConvexError('You are not the owner of this team')
    }
    if(!team.requests.includes(args.userId)){
      throw new ConvexError('User has not sent a request to this team')
    }
    await ctx.db.patch(team._id,{
      requests: team.requests.filter((id)=>id !== args.userId),
    })
    return team
  }
})
export const deleteTeam = mutation({
  args:{
    teamId:v.id("teams"),
  },
  handler: async (ctx,args)=>{
    const user = await authComponent.safeGetAuthUser(ctx)
    if(!user){
      throw new ConvexError('Unauthorized')
    }
    const team = await ctx.db.get(args.teamId)
    if(!team){
      throw new ConvexError('Team not found')
    }
    if(team.ownerId !== user._id){
      throw new ConvexError('You are not the owner of this team')
    }

    // Cascade delete members
    const members = await ctx.db.query("members").withIndex("by_team", (q) => q.eq("teamId", args.teamId)).collect();
    for (const member of members) {
      await ctx.db.delete(member._id);
    }

    // Cascade delete notes
    const notes = await ctx.db.query("notes").withIndex("by_team", (q) => q.eq("team", args.teamId)).collect();
    for (const note of notes) {
      await ctx.db.delete(note._id);
    }

    // Delete the team record
    await ctx.db.delete(args.teamId)
    return { success: true }
  }
})
export const changeTeamName = mutation({
  args:{
    teamId:v.id("teams"),
    name:v.string(),
  },
  handler: async (ctx,args)=>{
    const user = await authComponent.safeGetAuthUser(ctx)
    if(!user){
      throw new ConvexError('Unauthorized')
    }
    const team = await ctx.db.get(args.teamId)
    if(!team){
      throw new ConvexError('Team not found')
    }
    if(team.ownerId !== user._id){
      throw new ConvexError('You are not the owner of this team')
    }
    await ctx.db.patch(team._id,{
      name: args.name,
    })
    return team
  }
})