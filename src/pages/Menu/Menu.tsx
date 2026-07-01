import {Tab, Tabs} from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import {useEffect, useState} from "react";
import LpCard from "../../components/LpCard/LpCard.tsx";
import LpImage from "../../components/LpImage/LpImage.tsx";
import {apiClient} from "../../http";
import ICategory from "../../interfaces/ICategory.ts";

const RestaurantMenu = () => {
    const [categories, setCategories] = useState<ICategory[]>([]);
    const [selectedTab, setSelectedTab] = useState<number>(0);

    useEffect(() => {
        apiClient.get<ICategory[]>('/api/v1/category/menu-items')
            .then(response => {
                setCategories(response.data);
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
                <Tabs
                    value={selectedTab}
                    onChange={(_, newValue) => setSelectedTab(newValue)}
                    variant="scrollable"
                    scrollButtons={"auto"}>

                    {categories.map((category: ICategory, index: number) => (
                        <Tab

                            key={category.id}
                            label={category.title}
                            id={`${index}-tab`}
                            aria-controls={`${index}-tabpanel`}/>
                    ))}
                </Tabs>


                {!categories.length && <Box sx={{
                    textAlign: "center",
                }}>
                    <LpImage src={"https://storage.googleapis.com/little-pequi/assets/under_construction.jpg"} alt="Page Under Construction"/>
                </Box>}
            </Container>

            {categories.map((category: ICategory, index: number) => (
                <Box role={"tabpanel"} hidden={selectedTab !== index} id={`${index}-tabpanel`}
                     aria-labelledby={`${index}-tab`} key={category.id} sx={{margin: '1rem'}}>
                    <Stack
                        direction={{xs: 'column', sm: 'row'}}
                        spacing={2}
                        useFlexGap
                        alignItems={{xs: 'center', sm: 'normal'}}
                        sx={{flexWrap: 'wrap'}}>

                        {category.menu_items.map(item => (
                            <LpCard
                                key={item.title}
                                title={item.title}
                                image={item.image as string}
                                imageAlt={item.title}
                                description={item.description}
                                mediaHeight={"15rem"}
                                mediaWidth={"20rem"}>

                                <Box sx={{display: "flex", justifyContent: "flex-end"}}>
                                    <Typography>{item.price.toString()}</Typography>
                                </Box>
                            </LpCard>
                        ))}
                    </Stack>
                </Box>
            ))}

        </>
    )
}

export default RestaurantMenu;