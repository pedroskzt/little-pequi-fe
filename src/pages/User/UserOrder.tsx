import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import LpImage from "../../components/LpImage/LpImage.tsx";

const UserOrder = () => {
    return (
        <>
            <Container sx={{my: 3}}>
                <Typography variant={"h3"}>Your orders</Typography>
                <Box sx={{
                    textAlign: "center",
                }}>
                    <LpImage src={"https://storage.googleapis.com/little-pequi/assets/under_construction.jpg"} alt="Page Under Construction"/>
                </Box>
            </Container>
        </>
    );
};

export default UserOrder;