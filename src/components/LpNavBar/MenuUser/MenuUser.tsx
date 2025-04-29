import {Avatar, Box, IconButton, Tooltip, Menu, MenuItem, Typography} from "@mui/material";
import {MouseEvent, useState} from "react";
import {useNavigate} from "react-router-dom";

interface IMenuUserProps {
    signIn: boolean;
}


const MenuUser = ({signIn}: IMenuUserProps) => {
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

    const navigate = useNavigate();

    const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleClick = (event: MouseEvent<HTMLElement>) => {
        const selection = event.currentTarget.textContent;
        handleCloseUserMenu();
        switch (selection) {
            case 'Account':
                navigate('/user/account');
                break;
            case 'Orders':
                navigate('/user/orders');
                break;
            case 'Logout':
                navigate('/');
                break;
        }
    }
    return (
        <Box sx={{
            flexGrow: 0,
            display: signIn ? 'flex' : 'none',
        }}>
            <Tooltip title="Open user menu">
                <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg"/>
                </IconButton>
            </Tooltip>
            <Menu
                sx={{
                    mt: '45px'
                }}
                disableScrollLock={true}
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
                <MenuItem onClick={handleClick}
                          sx={{
                              ":hover": {backgroundColor: "var(--secondary-color)"}
                          }}>
                    <Typography sx={{
                        textAlign: 'center',
                        color: 'var(--tertiary-color)',
                        fontSize: '1rem',
                        fontWeight: 'bolder'
                    }}>
                        Account
                    </Typography>
                </MenuItem>
                <MenuItem onClick={handleClick}
                          sx={{
                              ":hover": {backgroundColor: "var(--secondary-color)"}
                          }}>
                    <Typography sx={{
                        textAlign: 'center',
                        color: 'var(--tertiary-color)',
                        fontSize: '1rem',
                        fontWeight: 'bolder'
                    }}>
                        Orders
                    </Typography>
                </MenuItem>
                <MenuItem onClick={handleClick}
                          sx={{
                              ":hover": {backgroundColor: "var(--secondary-color)"}
                          }}>
                    <Typography sx={{
                        textAlign: 'center',
                        color: 'var(--tertiary-color)',
                        fontSize: '1rem',
                        fontWeight: 'bolder'
                    }}>
                        Logout
                    </Typography>
                </MenuItem>
            </Menu>
        </Box>
    )
}

export default MenuUser;
