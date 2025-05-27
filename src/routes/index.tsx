import {Route, Routes} from "react-router-dom";
import Home from '../pages/Home';
import About from "../pages/About/About.tsx";
import SignIn from "../pages/Auth/SignIn.tsx";
import SignUp from "../pages/Auth/SignUp.tsx";
import BasePage from "../pages/BasePage.tsx";
import BaseUserPage from "../pages/User/BaseUserPage.tsx";
import UserAccount from "../pages/User/UserAccount.tsx";
import RestaurantMenu from "../pages/Menu/index.tsx";
import BaseAuthPage from "../pages/Auth/BaseAuthPage.tsx";
import Reservations from "../pages/Reservations";
import MakeOrder from "../pages/MakeOrder/MakeOrder.tsx";
import UserOrder from "../pages/User/UserOrder.tsx";

function LpRoutes() {
    return (
        <Routes>
            <Route path="/" element={<BasePage/>}>
                <Route path="/" element={<Home/>}/>
                <Route path="/auth" element={<BaseAuthPage/>}>
                    <Route path="sign-in" element={<SignIn/>}/>
                    <Route path="sign-up" element={<SignUp/>}/>
                </Route>
                <Route path="/about" element={<About/>}/>
                <Route path="/menu" element={<RestaurantMenu/>}/>
                <Route path="/reservations" element={<Reservations/>}/>
                <Route path="/order" element={<MakeOrder/>}/>
                <Route path="/user" element={<BaseUserPage/>}>
                    <Route path="account" element={<UserAccount/>}/>
                    <Route path="order" element={<UserOrder/>}/>
                </Route>
            </Route>
        </Routes>
    )


}

export default LpRoutes
