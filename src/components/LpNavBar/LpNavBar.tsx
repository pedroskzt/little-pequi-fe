import {AppBar, Box, IconButton, Toolbar, Menu, MenuItem, Button, Typography, Tooltip, Avatar, Link as MuiLink} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import {useState, MouseEvent} from "react";

const navPages = ['Home', 'About', 'Menu', 'Book', 'Reservations'];
const userMenu = ['Orders', 'Account', 'Logout'];

export const LpNavBar = () => {

    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
        console.log('close');
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <AppBar position="static" color="primary" sx={{
            marginTop: "1rem",
            marginBottom: "1rem",
            padding: "0 1rem",
        }} className={'nav-bar'}>
            <Toolbar disableGutters>
                {/*Small screen Menu*/}
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
                        {navPages.map((page) => (
                            <MenuItem key={page} onClick={handleCloseNavMenu}>
                                <MuiLink href='/about' sx={{
                                    textAlign: 'center',
                                    color: 'var(--tertiary-color)',
                                    fontSize: '1rem',
                                    fontWeight: 'bolder'
                                }}>{page}</MuiLink>
                            </MenuItem>
                        ))}
                    </Menu>
                </Box>
                {/*Regular/Large screen Menu*/}
                <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
                    {navPages.map((page) => (
                        <Button
                            href='/about'
                            key={page}
                            onClick={handleCloseNavMenu}
                            sx={{
                                color: 'var(--tertiary-color)',
                                display: 'block',
                                fontSize: '1rem',
                                fontWeight: 'bolder',
                                ":hover": {backgroundColor: "var(--secondary-color)"}
                            }}
                        >
                            {page}
                        </Button>
                    ))}
                </Box>
                {/*User Menu*/}
                <Box sx={{flexGrow: 0}}>
                    <Tooltip title="Open user menu">
                        <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                            <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg"/>
                        </IconButton>
                    </Tooltip>
                    <Menu
                        sx={{
                            mt: '45px'
                        }}
                        id="menu-appbar"
                        anchorEl={anchorElUser}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                    >
                        {userMenu.map((userMenuItem) => (
                            <MenuItem key={userMenuItem} onClick={handleCloseUserMenu}
                                      sx={{
                                          ":hover": {backgroundColor: "var(--secondary-color)"}
                                      }}>
                                <Typography sx={{
                                    textAlign: 'center',
                                    color: 'var(--tertiary-color)',
                                    fontSize: '1rem',
                                    fontWeight: 'bolder'
                                }}>{userMenuItem}</Typography>
                            </MenuItem>
                        ))}
                    </Menu>
                </Box>
            </Toolbar>
        </AppBar>
    )
}

export default LpNavBar;