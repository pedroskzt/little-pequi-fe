import {useEffect, useState} from "react";
import http from "../../http";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import underConstruction from "../../assets/under_construction.jpg";

interface IMenuItem {
    id: number;
    title: string;
    description: string;
    price: number;
    image: string;
    imageAlt: string;
    category: string;
}

const RestaurantMenu = () => {
    const [menuItems, setMenuItems] = useState<IMenuItem[]>([]);

    useEffect(() => {
        http.get<IMenuItem[]>('/api/v1/menu-items')
            .then(response => {
                setMenuItems(response.data);
                console.log(menuItems)
            })
            .catch(error => {
                    console.log(error);
                }
            )
    }, [])
    return (
        <>
            <Container>
                <Typography variant={"h3"}>Menu</Typography>
                {menuItems.map(item => (
                    <p key={item.id}> {item.title} </p>
                ))}
                {menuItems.length===0 &&  <Box sx={{
                    textAlign: "center",
                }}>
                    <img src={underConstruction} alt="Page Under Construction"/>
                </Box>}
            </Container>
        </>
    )
}

export default RestaurantMenu;