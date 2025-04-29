import {Container, Stack, Typography} from "@mui/material";
import {css} from "@emotion/react";
import {Link} from "react-router-dom";
import './LpBanner.css'

const banner = css({
    backgroundImage: "linear-gradient(0deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.8)), url('/src/assets/home/restaurant_inside.jpg')"
})


const LpBanner = () => {
    return (
        <Container className={'banner'} maxWidth={false} sx={{...banner}}>
            <Stack spacing={2} sx={{
                pt: 2,
                pb: 2,
                alignItems: "center",
                justifyContent: "center",
            }}>
                <Typography variant={"h3"}>SPECIAL OFFER</Typography>
                <Typography>
                    30% Off This Weekend
                </Typography>
                <Link className={'banner-link'} to="#" color="#FFF"> Book now </Link>
            </Stack>
        </Container>
    )
}

export default LpBanner;