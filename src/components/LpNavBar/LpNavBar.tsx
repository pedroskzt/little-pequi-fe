import {AppBar, Toolbar} from "@mui/material";
import MenuPages from "./Pages/MenuPages.tsx";
import NavPages from "./Pages/NavPages.tsx";
import MenuUser from "./MenuUser/MenuUser.tsx";


export const LpNavBar = () => {

    return (
        <AppBar position="static" sx={{
            marginTop: "1rem",
            marginBottom: "1rem",
            padding: "0 1rem",
        }}>
            <Toolbar disableGutters>
                {/*Small screen Menu*/}
                <MenuPages/>

                {/*Regular/Large screen Menu*/}
                <NavPages/>

                {/*User Menu*/}
                <MenuUser/>
            </Toolbar>
        </AppBar>
    )
}

export default LpNavBar;