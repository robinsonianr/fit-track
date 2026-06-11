import { ReactNode } from "react";
import { AuthContext } from "../../../../context/AuthContext";

/* ============================================================================
 * MockAuthProvider — Storybook-only
 * ----------------------------------------------------------------------------
 * Provides a stub AuthContext value for Storybook stories. The TopBar (and
 * any of its children) calls useAuth(), which reads from AuthContext. By
 * wrapping stories in this provider, useAuth() returns the mock data
 * instead of crashing.
 *
 * Prerequisite: AuthContext must be exported from src/context/AuthContext.tsx
 * (one-line change to add `export` to the createContext line). The mock
 * value matches the real AuthContextType shape.
 * ============================================================================ */

const mockMember = {
    id: 1,
    name: "Long Tang",
    email: "long.tang@example.com",
    username: "longtang",
    profileImageId: undefined,
};

const mockValue = {
    member: mockMember,
    loading: false,
    login: async () => {
        console.log("[Storybook] login called — no-op");
    },
    register: async () => {
        console.log("[Storybook] register called — no-op");
    },
    logOut: () => {
        console.log("[Storybook] logOut called — would clear tokens and redirect to /login");
    },
    refreshMember: async () => {
        console.log("[Storybook] refreshMember called — no-op");
    },
};

export function MockAuthProvider({ children }: { children: ReactNode }) {
    return (
        <AuthContext.Provider value={mockValue as never}>
            {children}
        </AuthContext.Provider>
    );
}