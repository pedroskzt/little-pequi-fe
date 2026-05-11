import {useCallback, useEffect, useMemo} from "react";
import {ReactNode, useState} from "react";
import {IAuthContextProps} from "./AuthContext";
import {AuthContext} from "./AuthContext";
import {decodeJwt, setLogoutCallback, tokenStore} from "../../http/auth.ts";
import {JwtPayload} from "jwt-decode";
import apiClient from "../../http";
import IUser from "../../interfaces/IUser.ts";
import {AxiosError, isAxiosError} from "axios";

type ApiError = {
    message: string;
    code: string;
}

export const AuthProvider = ({children}: { children: ReactNode }) => {
    const [isAuthLoading, setIsAuthLoading] = useState(true);
    const [user, setUser] = useState<IUser | null>(null);

    useEffect(() => {
        setLogoutCallback(() => {
            tokenStore.clear();
            setUser(null);
        });

        const token = tokenStore.getAccess();
        if (!token) {
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
            .finally(() => setIsAuthLoading(false))
    }, []);

    const isSignedIn = user !== null;
    const isAdmin = useMemo((): boolean => {
        const token = tokenStore.getAccess();
        if (!token) return false;

        const jwtPayload: JwtPayload | null = decodeJwt(token);
        if (jwtPayload && 'admin' in jwtPayload) {
            return jwtPayload['admin'] as boolean;
        }
        return false;
    }, [user]);

    const login = async (email: string, password: string) => {
        setIsAuthLoading(true);
        try {
            const {data} = await apiClient.post("/auth/sign-in/", {email, password});
            tokenStore.setAccess(data.access);
            tokenStore.setRefresh(data.refresh);
            const me = await apiClient.get<IUser>("/auth/users/me/");
            setUser(me.data);
        } catch (error) {
            if (isAxiosError<ApiError>(error)) {
                console.log(error.response?.data);
                console.log(error.response);
                console.error("Error during login:", error);
                tokenStore.clear();
                setUser(null);
                throw error as AxiosError;
            } else {
                throw error;
            }

        } finally {
            setIsAuthLoading(false);
        }

    };

    const logout = useCallback(async () => {
        try {
            // const refreshToken = tokenStore.getRefresh();
            const response = await apiClient.post('/auth/sign-out/');
            console.log(response.data);
        } catch (error) {
            console.error("Error during logout:", error);
        } finally {
            tokenStore.clear();
            setUser(null);
        }
    }, []);


    const authContext = useMemo<IAuthContextProps>(() => ({
        user,
        isSignedIn,
        isAdmin,
        isAuthLoading,
        login,
        logout
    }), [user, isAdmin, isAuthLoading, login, logout])

    return (
        <AuthContext.Provider value={authContext}>
            {children}
        </AuthContext.Provider>
    );
};