import grill from "../../assets/home/Grill.jpg";
import salad from "../../assets/home/salad.jpg";
import headChef from "../../assets/home/head_chef.jpg";
import LpBanner from "../../components/LpBanner/LpBanner.tsx";
import LpCard from "../../components/LpCard/LpCard.tsx";
import {Container, Divider, List, ListItem, ListItemText, Stack} from "@mui/material";

const App = () => {
    return (
        <>
            <LpBanner/>
            <Container sx={{my: 2}}>
                <Stack
                    direction={{xs: 'column', sm: 'row'}}
                    spacing={2}
                    sx={{marginTop: '1rem', marginBottom: '1rem'}}>
                    <LpCard cardProps={{
                        title: "Grilled mediterranean dishes",
                        image: grill,
                        imageAlt: "Grilled Mediterranean dishes",
                        description: "The best dishes in town!",
                        link: "/menu",
                        linkText: "Menu"
                    }}/>
                    <LpCard cardProps={{
                        title: "Book a table",
                        image: salad,
                        imageAlt: "Fresh Mediterranean salad",
                        description: "Reserve your table for an Italian, Greek, and Turkish dining experience.",
                        link: "/reservations",
                        linkText: "Book your table now",

                    }}/>
                    <LpCard cardProps={{
                        title: "Opening Hours",
                        image: headChef,
                        imageAlt: "Little Pequi restaurant head chef",
                        description: "The Little Pequi Restaurant is open 7 days a week, except for public holidays."

                    }}>
                        <List dense={true} disablePadding={true}>
                            <Divider variant="middle" sx={{my: 1}}/>
                            <ListItem dense={true} disablePadding={true}>
                                <ListItemText
                                    primary="Monday to Friday"
                                    secondary="2pm - 10pm"
                                />
                            </ListItem>
                            <ListItem dense={true} disablePadding={true}>
                                <ListItemText
                                    primary="Saturday"
                                    secondary="2pm - 11pm"
                                />
                            </ListItem>
                            <ListItem dense={true} disablePadding={true}>
                                <ListItemText
                                    primary="Sunday"
                                    secondary="2pm - 9pm"
                                />
                            </ListItem>
                        </List>

                    </LpCard>
                </Stack>
            </Container>
        </>
    )
}

export default App;