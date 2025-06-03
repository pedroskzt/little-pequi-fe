import ICard from "../../interfaces/ICard.ts";
import {ReactElement} from "react";
import Card from '@mui/material/Card'
import {CardActions, CardContent, CardMedia, Typography} from "@mui/material";
import LpButton from "../LpButton/LpButton.tsx";
import {Link} from "react-router";


interface ICardProps {
    cardProps: ICard;
    children?: ReactElement;
}


const LpCard = ({cardProps, children}: ICardProps) => {
    return (
        <article>
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
                />
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
        </article>
    )
}

export default LpCard;