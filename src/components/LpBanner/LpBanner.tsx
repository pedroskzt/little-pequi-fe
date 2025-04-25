import {Typography, Link as MuiLink} from "@mui/material";
import './LpBanner.css'




export const LpBanner = () => {

    return (
        <article className={'banner'}>
            <Typography variant={"h3"}>SPECIAL OFFER</Typography>
            <Typography>
                30% Off This Weekend
            </Typography>
            <MuiLink className={'banner-link'} href="#" underline="none" color="#FFF" > Book now </MuiLink>
            <a className={'cta'}>Book now</a>
        </article>
    )
}

export default LpBanner;