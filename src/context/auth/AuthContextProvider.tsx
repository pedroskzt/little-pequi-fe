import {useMemo} from "react";
import {ReactNode, useState} from "react";
import {IAuthContextProps} from "./AuthContext";
import {AuthContext} from "./AuthContext";

export const AuthProvider = ({children}: { children: ReactNode }) => {
    // Initialize the isSignedIn state and check if there's a token in sessionStorage on an initial load
    const token = sessionStorage.getItem('token')
    const isUserAdmin = () => {
        if (token === null) {

            return false;
        }
        const jwtPayload = JSON.parse(atob(token.split('.')[1]));
        if (jwtPayload) {
            if ('admin' in jwtPayload) {
                return jwtPayload.admin;
            }
            return false;
        }
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