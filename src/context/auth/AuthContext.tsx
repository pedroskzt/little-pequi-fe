import {createContext, ReactNode, useContext, useState} from "react";

interface IAuthContext {
    isSignedIn: boolean;
    setIsSignedIn: (value: boolean) => void;
}

const AuthContext = createContext<IAuthContext | undefined>(undefined);

export const AuthProvider = ({children}: { children: ReactNode }) => {
    // Initialize the isSignedIn state and check if there's a token in sessionStorage on an initial load
    const [isSignedIn, setIsSignedIn] = useState(sessionStorage.getItem('token') !== null)

    return (
        <AuthContext.Provider value={{isSignedIn, setIsSignedIn}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
