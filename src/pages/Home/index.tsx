import Container from "@mui/material/Container"
import Divider from "@mui/material/Divider"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemText from "@mui/material/ListItemText"
import Stack from "@mui/material/Stack";
import LpBanner from "../../components/LpBanner/LpBanner.tsx";
import LpCard from "../../components/LpCard/LpCard.tsx";

const App = () => {
    return (
        <>
            <LpBanner/>
            <Container sx={{my: 2}}>
                <Stack
                    direction={{xs: 'column', sm: 'row'}}
                    spacing={2}
                    alignItems={{xs: 'center', sm: 'normal'}}
                    sx={{marginTop: '1rem', marginBottom: '1rem'}}>
                    <LpCard
                        title={"Grilled mediterranean dishes"}
                        image={"https://storage.googleapis.com/little-pequi/assets/Grill.jpg"}
                        imageAlt={"Grilled Mediterranean dishes"}
                        description={"The best dishes in town!"}
                        link={"/menu"}
                        linkText={"Menu"}
                        mediaHeight={"15rem"}/>
                    <LpCard
                        title={"Book a table"}
                        image={"https://storage.googleapis.com/little-pequi/assets/salad.jpg"}
                        imageAlt={"Fresh Mediterranean salad"}
                        description={"Reserve your table for an Italian, Greek, and Turkish dining experience."}
                        link={"/reservations"}
                        linkText={"Book your table now"}
                        mediaHeight={"15rem"}/>
                    <LpCard
                        title={"Opening Hours"}
                        image={"https://storage.googleapis.com/little-pequi/assets/head_chef.jpg"}
                        imageAlt={"Little Pequi restaurant head chef"}
                        description={"The Little Pequi Restaurant is open 7 days a week, except for public holidays."}
                        mediaHeight={"15rem"}>

                        <List dense={true} disablePadding={true}>
                            <Divider variant="middle" sx={{my: 1}}/>
                            <ListItem dense={true} disablePadding={true}>
                                <ListItemText primary="Monday to Friday" secondary="2pm - 10pm"/>
                            </ListItem>
                            <ListItem dense={true} disablePadding={true}>
                                <ListItemText primary="Saturday" secondary="2pm - 11pm"/>
                            </ListItem>
                            <ListItem dense={true} disablePadding={true}>
                                <ListItemText primary="Sunday" secondary="2pm - 9pm"/>
                            </ListItem>
                        </List>

                    </LpCard>
                </Stack>
            </Container>
        </>
    )
}

export default App;