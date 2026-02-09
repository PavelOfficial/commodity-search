import { useEffect, type FunctionComponent } from "react";
import { useNavigate, useMatch } from "react-router";

import { useShallow } from "zustand/react/shallow";

import { useAuthStore } from "../model/auth";

export const authGuard = (ChildElement: FunctionComponent) => {
    return () => {
        const [isAuthorizated, isLoading, error] = useAuthStore(useShallow((state) => [state.isAuthorizated, state.isLoading, state.error]))
        const navigate = useNavigate();
        const matchToAuth = useMatch("/login");

        useEffect(() => {
            if (error && !matchToAuth) {
                navigate("/login");
            } else if (matchToAuth && !!isAuthorizated) {
                navigate("/search");
            }
        }, [error, isAuthorizated, matchToAuth]);

        if (error && !matchToAuth) {
            return null;
        }

        if (isLoading) {
            return null;
        }

        if (matchToAuth && !!isAuthorizated) {
            return null;
        }

        return <ChildElement />;
    }
}