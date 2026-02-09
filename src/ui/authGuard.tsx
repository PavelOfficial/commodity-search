import type { FunctionComponent } from "react";
import { useNavigate, useMatch } from "react-router";

import { useShallow } from "zustand/react/shallow";

import { useAuthStore } from "../model/auth";

export const authGuard = (ChildElement: FunctionComponent) => {
    return () => {
        const [isAuthorizated, isLoading, error] = useAuthStore(useShallow((state) => [state.isAuthorizated, state.isLoading, state.error]))
        const navigate = useNavigate();
        const matchToAuth = useMatch("login")

        if (error && !matchToAuth) {
            navigate("/login")
            return null;
        }

        if (isLoading) {
            return null;
        }

        if (matchToAuth && !!isAuthorizated) {
            navigate("/search");
            return null;
        }

        return <ChildElement />;
    }
}