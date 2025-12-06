import {ReactElement} from "react";
import Card from '@mui/material/Card'
import {CardActions, CardContent, CardMedia, Typography} from "@mui/material";
import LpButton from "../LpButton/LpButton.tsx";
import {Link} from "react-router";


interface ICardProps {
    title: string;
    image: string;
    imageAlt: string;
    description: string;
    mediaHeight?: string;
    mediaWidth?: string;
    link?: string;
    linkText?: string;
    children?: ReactElement;
}


const LpCard = (props: ICardProps) => {
    const {children, ...cardProps} = props;
    return (
            <Card variant="elevation" elevation={9} sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                minHeight: '100%',
                maxWidth: 345
            }}>
                <CardMedia
                    component="img"
                    image={cardProps.image}
                    alt={cardProps.imageAlt}
                    sx={{marginTop: 2}}
                    style={{
                        height: cardProps.mediaHeight ? cardProps.mediaHeight : 'auto',
                        width: cardProps.mediaWidth ? cardProps.mediaWidth : '100%',
                        objectFit: 'cover',
                    }}/>

                <CardContent>
                    <Typography gutterBottom variant="h5">
                        {cardProps.title}
                    </Typography>
                    <Typography variant="body2">
                        {cardProps.description}
                    </Typography>
                    {children}
                </CardContent>

                {cardProps.link && <CardActions sx={{marginBlockStart: 'auto'}}>
                    <LpButton component={Link} to={cardProps.link}>
                        {cardProps.linkText}
                    </LpButton>
                </CardActions>}

            </Card>
    )
}

export default LpCard;