import {Button, ButtonProps} from "@mui/material";

interface IButtonProps extends ButtonProps{
    hidden?: boolean | undefined;
    to?: string;
}

const LpButton = (props: IButtonProps) => {
    const hidden = props.hidden === undefined ? true : props.hidden;
    return (
        <Button variant={"contained"} href={props.to} {...props} sx={{
            color: 'var(--tertiary-color)',
            display: hidden ? 'block' : 'none',
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