import {useCallback, useEffect, useMemo} from "react";
import {ReactNode, useState} from "react";
import {IAuthContextProps} from "./AuthContext";
import {AuthContext} from "./AuthContext";
import {authChannel, AuthMessage, setSignOutCallback, tokenStore} from "../../http/auth.ts";
import apiClient from "../../http";
import IUser from "../../interfaces/IUser.ts";
import {AxiosError, isAxiosError} from "axios";

type ApiError = {
    message: string;
    code: string;
}

export const AuthProvider = ({children}: { children: ReactNode }) => {
    const [isAuthLoading, setIsAuthLoading] = useState(true);
    const [isBootstrapping, setIsBootstrapping] = useState(true);
    const [user, setUser] = useState<IUser | null>(null);

    useEffect(() => {
        const onMessage = (event: MessageEvent<AuthMessage>) => {
            if (event.data?.type === 'signOut') {
                tokenStore.clear();
                setUser(null);
            }
        };
        authChannel.addEventListener('message', onMessage);
        return () => authChannel.removeEventListener('message', onMessage);
    }, []);

    // Bootstrap user data
    useEffect(() => {
        setSignOutCallback(() => {
            tokenStore.clear();
            setUser(null);
        });

        const token = tokenStore.getAccess();
        if (!token) {
            setIsBootstrapping(false);
            setIsAuthLoading(false);
            return;
        }
        apiClient.get<IUser>('/auth/users/me/')
            .then(res => {
                setUser(res.data);
            })
            .catch(err => {
                console.log(err);
                tokenStore.clear();
            })
            .finally(() => {
                setIsAuthLoading(false);
                setIsBootstrapping(false);
            })
    }, []);

    const isSignedIn = user !== null;
    const isAdmin = user?.is_staff ?? false;

    const signIn = async (email: string, password: string) => {
        setIsAuthLoading(true);
        try {
            const {data} = await apiClient.post("/auth/sign-in/", {email, password});
            tokenStore.setAccess(data.access);
            tokenStore.setRefresh(data.refresh);
            const me = await apiClient.get<IUser>("/auth/users/me/");
            setUser(me.data);
        } catch (error) {
            if (isAxiosError<ApiError>(error)) {
                tokenStore.clear();
                setUser(null);
                throw error as AxiosError;
            } else {
                throw error;
            }

        } finally {
            setIsAuthLoading(false);
            setIsBootstrapping(false);
        }

    };

    const signOut = useCallback(async () => {
        try {
            // const refreshToken = tokenStore.getRefresh();
            const response = await apiClient.post('/auth/sign-out/');
            console.log(response.data);
        } catch (error) {
            console.error("Error during logout:", error);
        } finally {
            tokenStore.clear();
            setUser(null);
            authChannel.postMessage({type: 'signOut'} satisfies AuthMessage);
        }
    }, []);


    const authContext = useMemo<IAuthContextProps>(() => ({
        user,
        isSignedIn,
        isAdmin,
        isAuthLoading,
        isBootstrapping,
        signIn: signIn,
        signOut
    }), [user, isAdmin, isAuthLoading, isBootstrapping, signIn, signOut])

    return (
        <AuthContext.Provider value={authContext}>
            {children}
        </AuthContext.Provider>
    );
};