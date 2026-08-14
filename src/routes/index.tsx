import {Route, Routes} from "react-router";
import About from "../pages/About/About.tsx";
import Admin from "../pages/Admin/Admin.tsx";
import CategoryCrud from "../pages/Admin/CategoryCrud.tsx";
import Dashboard from "../pages/Admin/Dashboard.tsx";
import MenuItemCrud from "../pages/Admin/MenuItemCrud.tsx";
import TagCrud from "../pages/Admin/TagCrud.tsx";
import BaseAuthPage from "../pages/Auth/BaseAuthPage.tsx";
import SignIn from "../pages/Auth/SignIn.tsx";
import SignUp from "../pages/Auth/SignUp.tsx";
import BasePage from "../pages/BasePage.tsx";
import Home from '../pages/Home';
import MakeOrder from "../pages/MakeOrder/MakeOrder.tsx";
import RestaurantMenu from "../pages/Menu/Menu.tsx";
import Reservations from "../pages/Reservations";
import BaseUserPage from "../pages/User/BaseUserPage.tsx";
import UserAccount from "../pages/User/UserAccount.tsx";
import UserOrder from "../pages/User/UserOrder.tsx";
import RequireAuth from "./RequireAuth.tsx";
import {RedirectIfSignedIn} from "./RedirectIfSignedIn.tsx";

function LpRoutes() {
    return (
        <Routes>
            {/* Public routes */}
            <Route path="/" element={<BasePage/>}>
                <Route index element={<Home/>}/>
                <Route path="about" element={<About/>}/>
                <Route path="menu" element={<RestaurantMenu/>}/>
                <Route path="reservations" element={<Reservations/>}/>
                <Route path="order" element={<MakeOrder/>}/>

                <Route element={<RedirectIfSignedIn/>}>
                    <Route path="auth" element={<BaseAuthPage/>}>
                        <Route path="sign-in" element={<SignIn/>}/>
                        <Route path="sign-up" element={<SignUp/>}/>
                    </Route>
                </Route>

                {/* Sign-in required routes */}
                <Route element={<RequireAuth/>}>
                    <Route path="user" element={<BaseUserPage/>}>
                        <Route path="account" element={<UserAccount/>}/>
                        <Route path="order" element={<UserOrder/>}/>

                        {/* Admin-only routes */}
                        <Route element={<RequireAuth adminOnly/>}>
                            <Route path="admin" element={<Admin/>}>
                                <Route index element={<Dashboard/>}/>
                                <Route path="category" element={<CategoryCrud/>}/>
                                <Route path="tag" element={<TagCrud/>}/>
                                <Route path="menu-item" element={<MenuItemCrud/>}/>
                            </Route>
                        </Route>
                    </Route>
                </Route>
            </Route>
        </Routes>
    )


}

export default LpRoutes
