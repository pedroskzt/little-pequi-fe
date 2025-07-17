import {styled} from "@mui/material/styles";
import logoFooter from "../../assets/home/logo_footer.png";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

const LogoIcon = styled('img')({
    width: 'auto',
    height: 'auto',
})

const LpFooter = () => {
    return (

        <Stack direction="row" spacing={1} gap={"2rem 1rem"} aria-label={"Footer"} sx={{
            backgroundColor: "var(--primary-color)",
            p: "1rem",
            justifyContent: "space-between",
            alignItems: "center",
        }}>
            <LogoIcon sx={{
                maxWidth: {
                    xs: "12%",
                    md: "2.5%"
                }
            }} src={logoFooter} alt="Little Pequi Logo"/>
            <Typography sx={{
                borderTop: '#333333',
                borderStyle: 'solid',
                borderWidth: '0.1rem',
                borderBottom: 'none',
                borderLeft: 'none',
                borderRight: 'none',
                textAlign: 'right',
                paddingTop: '1rem',
            }}>Copyright Little Pequi</Typography>
        </Stack>

    )
}

export default LpFooter;
