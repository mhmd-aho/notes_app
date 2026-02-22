"use client"

import { useState, createContext, useMemo, useCallback, ReactNode } from "react";

export interface TeamContextType {
    selectedTeamId: string | null;
    setSelectedTeamId: (teamId: string | null) => void;
}

export const teamContext = createContext<TeamContextType | null>(null);

export function TeamProvider({ children }: { children: ReactNode }) {
    const [selectedTeamId, setSelectedTeamIdState] = useState<string | null>(
        () => (typeof window !== "undefined" ? localStorage.getItem("selectedTeamId") : null)
    );

    const setSelectedTeamId = useCallback((teamId: string | null) => {
        setSelectedTeamIdState(teamId);
        if (teamId) {
            localStorage.setItem("selectedTeamId", teamId);
        } else {
            localStorage.removeItem("selectedTeamId");
        }
    }, []);

    const contextValue = useMemo(() => ({
        selectedTeamId,
        setSelectedTeamId
    }), [selectedTeamId, setSelectedTeamId]);

    return (
        <teamContext.Provider value={contextValue}>
            {children}
        </teamContext.Provider>
    );
}
