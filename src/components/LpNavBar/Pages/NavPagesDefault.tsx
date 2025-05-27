import LpButton from "../../LpButton/LpButton.tsx";
import {Box} from "@mui/material";
import {Link} from "react-router-dom";
import INavLink from "../../../interfaces/INavLink.ts";

interface INavProps {
    navLinks: INavLink[];
}

const NavPagesDefault = ({navLinks}: INavProps) => {

    return (
        <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
            {navLinks.map(navLink => (
                <LpButton key={navLink.name} component={Link} to={navLink.link} sx={{boxShadow: "none"}}>
                    {navLink.name}
                </LpButton>
            ))}
        </Box>
    )
}

export default NavPagesDefault;
