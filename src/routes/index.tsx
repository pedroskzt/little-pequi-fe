import {Route, Routes} from "react-router-dom";
import Home from '../pages/Home';
import About from "../pages/About/About.tsx";
import SignIn from "../pages/Auth/SignIn.tsx";
import SignUp from "../pages/Auth/SignUp.tsx";
import BasePage from "../pages/BasePage.tsx";
import BaseUserPage from "../pages/User/BaseUserPage.tsx";
import UserAccount from "../pages/User/UserAccount.tsx";

function LpRoutes() {
    return (
        <Routes>
            <Route path="/" element={<BasePage/>}>
                <Route path="/" element={<Home/>}/>
                <Route path="/auth/sign-in" element={<SignIn/>}/>
                <Route path="/auth/sign-up" element={<SignUp/>}/>
                <Route path="/about" element={<About/>}/>
                <Route path="/user" element={<BaseUserPage/>}>
                    <Route path="account" element={<UserAccount/>}/>
                </Route>
            </Route>
        </Routes>
    )


}

export default LpRoutes
