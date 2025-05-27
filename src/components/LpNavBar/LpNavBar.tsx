import {AppBar, Toolbar, Box} from "@mui/material";
import NavPagesMenu from "./Pages/NavPagesMenu.tsx";
import NavPagesDefault from "./Pages/NavPagesDefault.tsx";
import MenuUser from "./MenuUser/MenuUser.tsx";
import {useEffect, useState} from "react";
import LpButton from "../LpButton/LpButton.tsx";
import {Link} from "react-router-dom";
import {useAuth} from "../../context/auth/AuthContext.tsx";


const LpNavBar = () => {

    const [fixedNav, setFixedNav] = useState(0);

    const {isSignedIn} = useAuth();

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

    const navLinks = [
        {
            name: "Home",
            link: "/"
        },
        {
            name: "About",
            link: "/about"
        },
        {
            name: "Menu",
            link: "/menu"
        },
        {
            name: "Reservations",
            link: "/reservations"
        },
        {
            name: "Make your order",
            link: "/order"
        }
    ]
    return (
        <>
            <AppBar id={"navbar"} position="static" sx={{
                marginTop: fixedNav ? 0 : "1rem",
                marginBottom: "1rem",
                padding: "0 1rem",
                top: 0,
                position: fixedNav ? 'fixed' : 'static',
                zIndex: 1000
            }}>
                <Toolbar disableGutters>
                    {/*Small screen Menu*/}
                    <NavPagesMenu navLinks={navLinks}/>
                    {/*Medium/Large screen Menu*/}
                    <NavPagesDefault navLinks={navLinks}/>
                    {/*User Menu*/}

                    {isSignedIn && <MenuUser/>}
                    {!isSignedIn &&
                        <LpButton component={Link}
                                  variant="contained"
                                  to={'/auth/sign-in'}>
                            Sign-in
                        </LpButton>}
                </Toolbar>
            </AppBar>
            <Box sx={{marginTop: `${fixedNav}px`}}/>
        </>

    )
}

export default LpNavBar;