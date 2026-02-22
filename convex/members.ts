import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { authComponent } from "./auth"
export const getMembersById = query({
    args:{
        id:v.id("teams"),
    },
    handler: async (ctx,args)=>{
        const members = await ctx.db.query("members").withIndex("by_team", (q) => q.eq("teamId", args.id)).collect();
        return await Promise.all(
            members.map(async (member) => {
                const user = await authComponent.getAnyUserById(ctx, member.userId);
                return {
                    ...member,
                    user,
                };
            })
        );
    }
})
export const deleteMember = mutation({
    args:{
        id:v.id("members"),
    },
    handler: async (ctx,args)=>{
        const user = await authComponent.safeGetAuthUser(ctx)
        if(!user){
            throw new Error('Unauthorized')
        }
        const member = await ctx.db.get(args.id)
        if(!member){
            throw new Error('Member not found')
        }
        if (member.role === 'owner') {
            throw new Error('You cannot delete the owner of this team')
        }
        await ctx.db.delete(args.id)
    }
})