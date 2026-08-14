import {createContext, useContext} from "react";
import IUser from "../../interfaces/IUser.ts";

export interface IAuthContextProps {
    user: IUser | null;
    isSignedIn: boolean;
    isAdmin: boolean;
    isAuthLoading: boolean;
    isBootstrapping: boolean;
    signIn: (email: string, password: string) => Promise<void>;
    signOut: () => Promise<void>;
}

export const AuthContext = createContext<IAuthContextProps | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
