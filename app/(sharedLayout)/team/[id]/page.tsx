import { Id } from "@/convex/_generated/dataModel";
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { getToken } from "@/lib/auth-server";
import { notFound, redirect} from "next/navigation";
import { TeamEdit } from "@/components/app/teamEdit";
export async function generateMetadata({params}: {params: {id: Id<"teams">}}) {
    const {id} = await params
    const token = await getToken()
    const [team, user, members] = await Promise.all([
  fetchQuery(api.team.getTeamById, { id }, { token }),
  fetchQuery(api.auth.getCurrentUser, {}, { token }),
  fetchQuery(api.members.getMembersById, { id }, { token }),
]);
    if (!team) {
        return {
            title: 'Team not found',
        }
    }
    const member = members.find((member) => member.userId === user?._id)
    if(!member){
        return {
            title: 'Team not found',
        }
    }
    return {
        title: `${team.name} | Notes app`,
        description: `Team: ${team.name}`,
    }
}
export default async function Team({params}: {params: Promise<{id: Id<"teams">}>}) {
    const {id} = await params;
    const token = await getToken()
    const [team, user, members] = await Promise.all([
  fetchQuery(api.team.getTeamById, { id }, { token }),
  fetchQuery(api.auth.getCurrentUser, {}, { token }),
  fetchQuery(api.members.getMembersById, { id }, { token }),
]);
    if(!user){
        return redirect('/auth/signup');
    }
    if(!team){
        return notFound();
    }
    const member = members.find((member) => member.userId === user?._id)
    if(!member){
        return notFound();
    }
    const notes = await fetchQuery(api.notes.getNotes, { teamid: id }, { token });
    const owner = members.find((member) => member.userId === team.ownerId)
    const ownerName = owner?.user?.username
    return (
        <div className="flex flex-col items-center justify-center h-[calc(100vh-3rem)]">
                <TeamEdit team={team} userId={user._id} members={members} notes={notes} ownerName={ownerName} id={id}/>
        </div>
    )
}