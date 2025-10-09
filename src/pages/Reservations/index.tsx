import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import underConstruction from "../../assets/under_construction.jpg";
import LpImage from "../../components/LpImage/LpImage.tsx";

const Reservations = () => {
    return (
        <>
            <Container sx={{my: 3}}>
                <Typography variant={"h3"}>Reservations</Typography>
                <Box sx={{
                    textAlign: "center",
                }}>
                    <LpImage src={underConstruction} alt="Page Under Construction"/>

                </Box>
            </Container>
        </>
    );
};

export default Reservations;