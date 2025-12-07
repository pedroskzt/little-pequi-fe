import Container from "@mui/material/Container";
import LpImage from "../LpImage/LpImage.tsx";


const LpHeader = () => {
    return (
        <Container id={"header-logo"} sx={{textAlign: "center", mt: 2}}>
            <LpImage sx={{
                width: 'auto',
                maxWidth: {
                    xs: "50%",
                    md: "20%",
                }
            }} src={"https://storage.googleapis.com/little-pequi/assets/logo.png"} alt="Little Pequi Logo"/>
        </Container>
    )
}

export default LpHeader;
