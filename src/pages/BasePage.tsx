import LpNavBar from "../components/LpNavBar/LpNavBar.tsx";
import LpFooter from "../components/LpFooter/LpFooter.tsx";
import LpHeader from "../components/LpHeader/LpHeader.tsx";
import {Outlet} from "react-router-dom"


const BasePage = () => {
    return (
        <>
            <LpHeader/>
            <LpNavBar/>
            <Outlet/>
            <LpFooter/>
        </>
    )
}

export default BasePage;



