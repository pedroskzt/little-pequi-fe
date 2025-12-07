import {Outlet} from "react-router";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";

const LogoIcon = styled('img')({
    width: 'auto',
    height: 'auto',
})

const BaseAuthPage = () => {
    return (
        <>
            <Container sx={{
                my: "1rem",
                width: ["auto", "450px", "450px", "450px", "450px"],
                maxWidth: 'none',
            }}>
                <Card variant="elevation" elevation={9} sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignSelf: 'center',
                    width: '100%',
                    padding: 4,
                    gap: 2,
                    margin: 'auto',
                }}>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'row',
                    }}>
                        <LogoIcon sx={{
                            mr: ".5rem",
                            maxWidth: '20%',
                        }} src={"https://storage.googleapis.com/little-pequi/assets/logo_footer.png"} alt="Real Pequi photo"/>
                        <Typography variant="h4" sx={{alignSelf: 'center'}}>Little Pequi</Typography>
                    </Box>
                    <Outlet/>
                </Card>
            </Container>
        </>
    )
}

export default BaseAuthPage;
