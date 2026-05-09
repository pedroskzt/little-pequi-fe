import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import {useState} from "react";
import {useNavigate} from "react-router";
import {Outlet} from "react-router"
import CrudAdminContextProvider from "./context/CrudAdminContextProvider.tsx";


const Admin = () => {
    const [openMenu, setOpenMenu] = useState(false);
    const navigate = useNavigate();
    const toggleDrawer = (newOpen: boolean) => () => {
        setOpenMenu(newOpen);
    };

    const drawerLinks = [
        {
            name: "Dashboard",
            link: ""
        },
        {
            name: "Category",
            link: "category"
        },
        {
            name: "Tag",
            link: "tag"
        },
        {
            name: "Menu Item",
            link: "menu-item"
        }
    ]


    const DrawerList = (
        <Box sx={{width: 250}} role="presentation" onClick={toggleDrawer(true)}>
            <List>
                {drawerLinks.map(drawerLink => (
                    <ListItem key={drawerLink.name} disablePadding>
                        <ListItemButton onClick={() => {
                            navigate(drawerLink.link)
                        }}>
                            <ListItemText primary={drawerLink.name}/>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider/>
        </Box>
    );

    return (
        <>
            <Stack direction={"row"} flexDirection={"column"} sx={{my: 2, position: 'relative'}}
                   id={'drawer-container'}>

                <Container>
                    <CrudAdminContextProvider>
                        <Typography variant={'h3'} sx={{paddingBottom: 3}}>
                            <IconButton
                                size="large"
                                onClick={toggleDrawer(!openMenu)}
                                sx={{
                                    paddingRight: 4
                                }}>
                                <MenuOpenIcon sx={{color: 'var(--tertiary-color)'}}/>
                            </IconButton>
                            Administration
                        </Typography>
                        <Outlet/>
                    </CrudAdminContextProvider>
                </Container>
            </Stack>
            <Drawer open={openMenu}
                    onClose={toggleDrawer(false)}
                    slotProps={{
                        paper: {
                            style: {
                                position: 'absolute'
                            }
                        },
                        backdrop: {
                            style: {
                                position: 'absolute'
                            }
                        }
                    }}
                    ModalProps={{
                        container: document.getElementById('drawer-container'),
                        style: {position: 'absolute'},
                    }}
                    variant={'temporary'}>
                {DrawerList}
            </Drawer>
        </>
    )
}

export default Admin;