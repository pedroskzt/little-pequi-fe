import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import {MouseEvent, useState} from "react";
import {useNavigate} from "react-router";
import {useAuth} from "../../../context/auth/AuthContext.tsx";


const MenuUser = () => {
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
    const {setIsSignedIn} = useAuth();
    const navigate = useNavigate();
    const user = JSON.parse(sessionStorage.getItem('user') || '{"first_name": "Anonymous"}');

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
                navigate('/user/order');
                break;
            case 'Logout':
                sessionStorage.removeItem('token');
                sessionStorage.removeItem('user');
                setIsSignedIn(false)
                break;
        }
    }
    return (
        <Box sx={{
            flexGrow: 0
        }}>
            <Tooltip title="Open user menu">
                <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                    <Avatar alt={user.first_name}/>
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
