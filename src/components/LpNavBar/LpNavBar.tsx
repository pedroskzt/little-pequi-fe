import {AppBar, Toolbar, Box} from "@mui/material";
import MenuPages from "./Pages/MenuPages.tsx";
import NavPages from "./Pages/NavPages.tsx";
import MenuUser from "./MenuUser/MenuUser.tsx";
import {useEffect, useState} from "react";


export const LpNavBar = () => {

    const [fixedNav, setFixedNav] = useState(0);

    const handleScroll = () => {
        if (window !== undefined) {
            const navEl = document.getElementById("navbar");
            const headerLogoEl = document.getElementById("header-logo");
            if (navEl && headerLogoEl) {
                const navStyle = getComputedStyle(navEl);
                const windowHeight = window.scrollY;
                const navStart = headerLogoEl.clientHeight + parseInt(navStyle.marginTop.replace('px', ''));
                if (windowHeight > navStart) {
                    const navHeight = navEl.clientHeight
                        + parseInt(navStyle.marginTop.replace('px', ''))
                        + parseInt(navStyle.marginBottom.replace('px', ''));

                    setFixedNav(navHeight);
                } else {
                    setFixedNav(0);
                }
            }

        }


    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    });

    return (
        <>
            <AppBar id={"navbar"} position="static" sx={{
                marginTop: fixedNav ? 0 : "1rem",
                marginBottom: "1rem",
                padding: "0 1rem",
                top: 0,
                position: fixedNav ? 'fixed' : 'static'
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
            <Box sx={{marginTop: `${fixedNav}px`}}/>
        </>

    )
}

export default LpNavBar;