import logo from "../../assets/logo.png";
import {Container} from "@mui/material";

export const LpHeader = () => {
    return (
        <Container id={"header-logo"} sx={{textAlign: "center", mt: 2}}>
            <img src={logo} alt="Little Pequi Logo"/>
        </Container>
    )
}

export default LpHeader;