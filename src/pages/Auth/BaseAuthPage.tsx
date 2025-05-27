import {Outlet} from "react-router-dom";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import logoFooter from "../../assets/home/logo_footer.png";

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
                            mr: ".5rem"
                        }} src={logoFooter} alt="Real Pequi photo"/>
                        <Typography variant="h4" sx={{alignSelf: 'center'}}>Little Pequi</Typography>
                    </Box>
                    <Outlet/>
                </Card>
            </Container>
        </>
    )
}

export default BaseAuthPage;