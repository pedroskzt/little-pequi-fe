import {
    Alert, Collapse,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField
} from "@mui/material";
import {FormEvent, useState} from "react";
import LpButton from "../../components/LpButton/LpButton.tsx";

interface IResetPasswordProps {
    open: boolean;
    handleClose: () => void;
}

const ResetPassword = ({open, handleClose}: IResetPasswordProps) => {
    const [openTemp, setOpenTemp] = useState(false);
    const [email, setEmail] = useState('');

    const closeDialog = () => {
        setOpenTemp(false);
        setEmail('');
        handleClose();
    }

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const payload = {
            email: email
        }
        setOpenTemp(true); // Temporarily shows an alert with a success message
        console.log(payload);
        // http.post('/auth/users/reset_password/', payload)

        setTimeout(() => {
            closeDialog();
        }, 5000)

    }
    return (
        <>
            <Dialog
                open={open}
                onClose={closeDialog}
                slotProps={{
                    paper: {
                        component: 'form',
                        onSubmit: handleSubmit
                    }
                }}

            >
                <DialogTitle>Reset Password</DialogTitle>
                <Collapse in={openTemp}>
                    <Alert severity="warning">W.I.P.</Alert>
                    <Alert severity="info" onClose={closeDialog}>An email will be sent to {email} with instructions to
                        recover your password.</Alert>
                </Collapse>
                <DialogContent>
                    <DialogContentText sx={{mb: 1}}>
                        Enter your account&apos;s email address, and we&apos;ll send you a link to
                        reset your password.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="email"
                        name="email"
                        label="Email address"
                        placeholder="Email address"
                        type="email"
                        value={email}
                        onChange={(event) => {
                            setEmail(event.target.value);
                        }}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions sx={{pb: 3, px: 3}}>
                    <LpButton onClick={closeDialog}>Cancel</LpButton>
                    <LpButton variant="contained" type="submit">
                        Continue
                    </LpButton>
                </DialogActions>
            </Dialog>
        </>
    )
        ;
};

export default ResetPassword;