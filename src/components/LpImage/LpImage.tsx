import {BoxProps} from "@mui/material";
import Box from "@mui/material/Box";

/**
 * Prop interface for the LpImage component
 * Extends BoxProps to inherit all Material-UI Box component properties
 */

interface IImageProps extends BoxProps {
    src: string;
    alt: string;
}

/**
 * LpImage - A custom image component wrapper
 *
 * This component provides a consistent way to render images throughout the application
 * by wrapping Material-UI's Box component configured as an image element.
 *
 * Features:
 * - Extends Material-UI Box properties for flexible styling
 * - Ensures required src and alt attributes for accessibility
 * - Maintains consistent image rendering patterns across the app
 *
 * @param props - Component props including src, alt, and any BoxProps
 * @returns JSX element rendering an image using Material-UI Box
 */

const LpImage = (props: IImageProps) => {

    return (
        <Box
            component={'img'}
            sx={{
                maxWidth: "100%",
                height: "auto",
                objectFit: "cover",
                boxSizing: "border-box",
                ...props.sx
            }}
            src={props.src}
            alt={props.alt}/>
    )
}

export default LpImage;