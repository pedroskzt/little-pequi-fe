import LpNavBar from "../components/LpNavBar/LpNavBar.tsx";
import LpFooter from "../components/LpFooter/LpFooter.tsx";
import LpHeader from "../components/LpHeader/LpHeader.tsx";
import {Outlet} from "react-router-dom"
import {AuthProvider} from "../context/auth/AuthContext.tsx";


const BasePage = () => {
    // const [token, setToken] = useState<string | null>(null);
    return (
        <>
            <LpHeader/>
            <AuthProvider>
                <LpNavBar/>
                <Outlet/>
            </AuthProvider>
            <LpFooter/>
        </>
    )
}

export default BasePage;



