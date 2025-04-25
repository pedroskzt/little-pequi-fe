import ICard from "../../interfaces/ICard.ts";
import {ReactElement} from "react";
import Card from '@mui/material/Card'
import {CardContent, CardMedia, Typography} from "@mui/material";


interface ICardProps {
    cardProps: ICard;
    children?: ReactElement;
}


const LpCard = ({cardProps, children}: ICardProps) => {
    // console.log(cardProps);
    return (
        <article>
            <Card variant="elevation" sx={{ minHeight: '100%', maxWidth: 345}}>
                <CardMedia
                    component="img"
                    image={cardProps.image}
                    title={cardProps.imageAlt}
                />
                <CardContent>
                    <Typography gutterBottom variant="h4">
                        {cardProps.title}
                    </Typography>
                    <Typography variant="body2">
                        {cardProps.description}
                    </Typography>
                    {children}
                </CardContent>

            </Card>
        </article>
    )
}

export default LpCard;