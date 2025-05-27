import {Button, ButtonProps} from "@mui/material";

interface IButtonProps extends ButtonProps{
    to?: string;
}

const LpButton = (props: IButtonProps) => {
    return (
        <Button variant={"contained"} href={props.to} {...props} sx={{
            color: 'var(--tertiary-color)',
            fontSize: '1rem',
            fontWeight: 'bolder',
            ":hover": {backgroundColor: "var(--secondary-color)"},
            ...props.sx
        }}>
            {props.children}
        </Button>
    )
}


export default LpButton;