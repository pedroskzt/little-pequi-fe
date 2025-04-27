import {MouseEvent, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Avatar, Box, IconButton, Tooltip, Menu, MenuItem, Typography} from "@mui/material";

const userMenu = ['Orders', 'Account', 'Logout'];

const MenuUser = () => {
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

    const navigate = useNavigate();

    const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleClick = () => {
        handleCloseUserMenu();
        navigate('/about');
    }
    return (
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
                    <MenuItem key={userMenuItem} onClick={handleClick}
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
    )
}

export default MenuUser;
