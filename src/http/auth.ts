import {jwtDecode} from "jwt-decode";

export const tokenStore = {
    ACCESS_KEY: "token", //Necessary?
    REFRESH_KEY: "refresh", //Necessary?
    USER_KEY: "user", //Necessary?
    getAccess: () => sessionStorage.getItem("token"),
    getRefresh: () => sessionStorage.getItem("refresh"),
    getUser: () => sessionStorage.getItem("user"),
    setAccess: (token: string) => sessionStorage.setItem("token", token),
    setRefresh: (token: string) => sessionStorage.setItem("refresh", token),
    setUser: (user: string) => sessionStorage.setItem("user", user),
    clear: () => {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("refresh");
        sessionStorage.removeItem("user");
    },
};

export const decodeJwt = <JwtPayload>(token: string): JwtPayload | null => {
    try {
        return jwtDecode<JwtPayload>(token);

    } catch (err) {
        console.log(err)
        return null;
    }
}
