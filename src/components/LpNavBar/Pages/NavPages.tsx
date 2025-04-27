import LpButton from "../../LpButton/LpButton.tsx";
import {Box, Link as MuiLink} from "@mui/material";

const navPages = ['Home', 'About', 'Menu', 'Book', 'Reservations'];

const NavPages = () => {

    return (
        <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
            {navPages.map((page) => (
                <LpButton component={MuiLink} href='/about' key={page}
                          sx={{boxShadow: "none"}}>
                    {page}
                </LpButton>
            ))}
        </Box>
    )
}

export default NavPages;
