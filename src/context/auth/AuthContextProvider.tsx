import {useMemo} from "react";
import {ReactNode, useState} from "react";
import {IAuthContextProps} from "./AuthContext";
import {AuthContext} from "./AuthContext";
import {decodeJwt, tokenStore} from "../../http/auth.ts";
import {JwtPayload} from "jwt-decode";

export const AuthProvider = ({children}: { children: ReactNode }) => {
    // Initialize the isSignedIn state and check if there's a token in sessionStorage on an initial load
    const token = tokenStore.getAccess();
    const isUserAdmin = (): boolean => {
        if (token === null) {
            return false;
        }

        const jwtPayload: JwtPayload | null = decodeJwt(token);
        if (jwtPayload && 'admin' in jwtPayload) {
            return jwtPayload['admin'] as boolean;
        }
        return false;
    }

    const [isSignedIn, setIsSignedIn] = useState(token !== null)
    const [isAdmin, setIsAdmin] = useState(isUserAdmin)

    const authContext = useMemo<IAuthContextProps>(() => ({
        isSignedIn,
        setIsSignedIn,
        isAdmin,
        setIsAdmin
    }), [isSignedIn, isAdmin])

    return (
        <AuthContext.Provider value={authContext}>
            {children}
        </AuthContext.Provider>
    );
};