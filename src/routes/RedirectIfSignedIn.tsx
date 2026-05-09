import {useAuth} from "../context/auth/AuthContext.ts";
import {Navigate, Outlet, useLocation} from "react-router";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";

export const RedirectIfSignedIn = ({to = "/"}: { to?: string }) => {
    const {isSignedIn, isAuthLoading} = useAuth();
    const location = useLocation();
    if (isAuthLoading) {
        return (
            <>
                <Backdrop open={true} sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}>
                    <CircularProgress color="inherit"/>
                </Backdrop>

            </>
        );
    }
    if (isSignedIn) return <Navigate to={location.state && location.state.from ? location.state.from.pathname : to}
                                     replace/>

    return <Outlet/>
}