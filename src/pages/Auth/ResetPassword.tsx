import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField
} from "@mui/material";
import {FormEvent} from "react";
import LpButton from "../../components/LpButton/LpButton.tsx";

interface IResetPasswordProps {
    open: boolean;
    handleClose: () => void;
}

const ResetPassword = ({open, handleClose}: IResetPasswordProps) => {
    return (
        <>
            <Dialog
                open={open}
                onClose={handleClose}
                slotProps={{
                    paper: {
                        component: 'form',
                        onSubmit: (event: FormEvent<HTMLFormElement>) => {
                            event.preventDefault();
                            // const formData = new FormData(event.currentTarget);
                            // const formJson = Object.fromEntries((formData as any).entries());
                            // const email = formJson.email;
                            // console.log(email);
                            handleClose();
                        }
                    }
                }}

            >
                <DialogTitle>Reset Password</DialogTitle>
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
                        fullWidth
                    />
                </DialogContent>
                <DialogActions sx={{pb: 3, px: 3}}>
                    <LpButton onClick={handleClose}>Cancel</LpButton>
                    <LpButton variant="contained" type="submit">
                        Continue
                    </LpButton>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default ResetPassword;