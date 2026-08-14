let accessToken: string | null = null;

export const tokenStore = {
    getAccess: () => accessToken,
    setAccess: (token: string) => { accessToken = token; },
    clear: () => {
        accessToken = null;
    },
};

export const authChannel = new BroadcastChannel('auth');
export type AuthMessage = { type: 'signOut' };

type SignOutCallback = () => void;
let signOutCallback: SignOutCallback | null = null;

export const setSignOutCallback = (callback: SignOutCallback) => signOutCallback = callback;
export const fireSignOutCallback = () => signOutCallback?.();