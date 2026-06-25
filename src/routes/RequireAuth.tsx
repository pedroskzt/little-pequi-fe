import {Navigate, Outlet, useLocation} from "react-router";
import {useAuth} from "../context/auth/AuthContext.ts";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";

interface IRequireAuthProps {
    adminOnly?: boolean;
    redirectTo?: string;
}


export const RequireAuth = ({
                                adminOnly = false,
                                redirectTo = "/auth/sign-in"
                            }: IRequireAuthProps) => {
    const {isBootstrapping, isSignedIn, isAdmin} = useAuth();
    const location = useLocation();

    if (isBootstrapping) {
        return (
            <>
                <Backdrop open={true} sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}>
                    <CircularProgress color="inherit"/>
                </Backdrop>
            </>
        );
    }
    if (!isSignedIn) return <Navigate to={redirectTo} replace state={{from: location}}/>;
    {/*This is a UI hint! Backend enforces admin endpoints.*/}
    if (adminOnly && !isAdmin) return <Navigate to={"/"} replace/>;


    return <Outlet/>;
}

export default RequireAuth;

