import {styled} from "@mui/material/styles";
import logo from "../../assets/logo.png";
import Container from "@mui/material/Container";

const LogoIcon = styled('img')({
    width: 'auto',
    height: 'auto',
})

const LpHeader = () => {
    return (
        <Container id={"header-logo"} sx={{textAlign: "center", mt: 2}}>
            <LogoIcon sx={{
                maxWidth: {
                    xs: "50%",
                    md: "20%",
                }}} src={logo} alt="Little Pequi Logo"/>
        </Container>
    )
}

export default LpHeader;
