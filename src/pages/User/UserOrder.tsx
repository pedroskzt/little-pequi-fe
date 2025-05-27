import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import underConstruction from "../../assets/under_construction.jpg";

const UserOrder = () => {
    return (
        <>
            <Container sx={{my: 3}}>
                <Typography variant={"h3"}>Your orders</Typography>
                <Box sx={{
                    textAlign: "center",
                }}>
                    <img src={underConstruction} alt="Page Under Construction"/>
                </Box>
            </Container>
        </>
    );
};

export default UserOrder;