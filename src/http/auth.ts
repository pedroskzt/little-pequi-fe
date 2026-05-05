import {jwtDecode} from "jwt-decode";

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
