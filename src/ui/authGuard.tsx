import { useEffect, type FunctionComponent } from "react";
import { useMatch, Navigate } from "react-router";

import { useShallow } from "zustand/react/shallow";

import { authLogout, useAuthStore } from "@/model/auth";

export const authGuard = (ChildElement: FunctionComponent) => {
    return () => {
        const [isAuthorizated, error, rememberMe] = useAuthStore(useShallow((state) => [state.isAuthorizated, state.error, state.rememberMe]))
        const matchToAuth = useMatch("/login");

        useEffect(() => {
            const beforeUnloadHandler = () => {
              if (!rememberMe) {
                authLogout();
              }
            };

            window.addEventListener('beforeunload', beforeUnloadHandler);

            return () => {
                window.removeEventListener('beforeunload', beforeUnloadHandler);
            };
        }, [rememberMe]);
        

        if ((error || !isAuthorizated) && !matchToAuth) {
            return <Navigate to="/login" />;
        }

        if (matchToAuth && !!isAuthorizated) {
            return <Navigate to="/search" />;
        }

        return <ChildElement />;
    }
}