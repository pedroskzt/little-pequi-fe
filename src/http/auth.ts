export const tokenStore = {
    ACCESS_KEY: "token", //Necessary?
    REFRESH_KEY: "refresh", //Necessary?
    getAccess: () => sessionStorage.getItem("token"),
    getRefresh: () => sessionStorage.getItem("refresh"),
    setAccess: (token: string) => sessionStorage.setItem("token", token),
    setRefresh: (token: string) => sessionStorage.setItem("refresh", token),
    clear: () => {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("refresh");
    },
};

// May be temporary, double check after moving backend to and frontend to HTTPCookie_only
export const authChannel = new BroadcastChannel('auth');
export type AuthMessage = { type: 'signOut' } | { type: 'signIn' };

type SignOutCallback = () => void;
let signOutCallback: SignOutCallback | null = null;

export const setSignOutCallback = (callback: SignOutCallback) => signOutCallback = callback;
export const fireSignOutCallback = () => signOutCallback?.();