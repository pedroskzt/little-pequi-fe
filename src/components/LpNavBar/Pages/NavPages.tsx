import LpButton from "../../LpButton/LpButton.tsx";
import {Box} from "@mui/material";
import {Link} from "react-router-dom";

const NavPages = () => {

    return (
        <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
            <LpButton component={Link} to='/' sx={{boxShadow: "none"}}>
                Home
            </LpButton>
            <LpButton component={Link} to='/about' sx={{boxShadow: "none"}}>
                About
            </LpButton>
            <LpButton component={Link} to='/' sx={{boxShadow: "none"}}>
                Menu
            </LpButton>
            <LpButton component={Link} to='/' sx={{boxShadow: "none"}}>
                Reservations
            </LpButton>
            <LpButton component={Link} to='/' sx={{boxShadow: "none"}}>
                Make your order
            </LpButton>
        </Box>
    )
}

export default NavPages;
