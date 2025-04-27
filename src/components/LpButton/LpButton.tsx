import {Button, ButtonProps} from "@mui/material";


const LpButton = (props: ButtonProps) => {
    return (
        <Button variant={"contained"} {...props} sx={{
            color: 'var(--tertiary-color)',
            display: 'block',
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