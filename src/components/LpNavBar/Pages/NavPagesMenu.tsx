import {MouseEvent, useState} from "react";
import {useNavigate} from "react-router";
import {Box, IconButton, Menu, MenuItem, Typography} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import INavLink from "../../../interfaces/INavLink.ts";

interface INavProps {
    navLinks: INavLink[];
}

const NavPagesMenu = ({navLinks}: INavProps) => {
    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

    const navigate = useNavigate();

    const handleOpenNavMenu = (event: MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleClick = (to: string) => {
        handleCloseNavMenu();
        navigate(to);
    }

    return (
        <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
            <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
            >
                <MenuIcon/>
            </IconButton>
            <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                    display: {xs: 'block', md: 'none'}
                }}
            >
                {navLinks.map(navLink => (
                    <MenuItem key={navLink.name} onClick={() => handleClick(navLink.link)}
                              sx={{":hover": {backgroundColor: "var(--secondary-color)"}}}>
                        <Typography sx={{
                            textAlign: 'center',
                            color: 'var(--tertiary-color)',
                            fontSize: '1rem',
                            fontWeight: 'bolder'
                        }}>
                            {navLink.name}
                        </Typography>
                    </MenuItem>
                ))}
            </Menu>
        </Box>
    )
}

export default NavPagesMenu;