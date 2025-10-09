import logo from "../../assets/logo.png";
import {Container} from "@mui/material";
import LpImage from "../LpImage/LpImage.tsx";

const LpHeader = () => {
    return (
        <Container id={"header-logo"} sx={{textAlign: "center", mt: 2}}>
            <LpImage src={logo} alt="Little Pequi Logo"/>
        </Container>
    )
}

export default LpHeader;