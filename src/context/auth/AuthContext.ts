import {createContext, useContext} from "react";

export interface IAuthContextProps {
    isSignedIn: boolean;
    setIsSignedIn: (value: boolean) => void;
    isAdmin: boolean;
    setIsAdmin: (value: boolean) => void;
}

export const AuthContext = createContext<IAuthContextProps | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
