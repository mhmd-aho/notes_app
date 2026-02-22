import { useContext } from "react"
import { teamContext, TeamContextType } from "./teamContext"

export function useTeam(): TeamContextType {
    const context = useContext(teamContext)
    if (!context) {
        throw new Error("useTeam must be used within TeamProvider")
    }
    return context
}