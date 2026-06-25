import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import Divider from "@mui/material/Divider"
import FormControlLabel from "@mui/material/FormControlLabel";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import LpButton from "../../components/LpButton/LpButton.tsx";
import {useState} from "react";
import {useAuth} from "../../context/auth/AuthContext.ts";
import ResetPassword from "./ResetPassword.tsx";
import {SignInSchema} from "./types/AuthSchema.ts";
import useSignInForm from "./hooks/useSignInForm.ts";
import LpTextField from "../../components/LpTextField/LpTextField.tsx";
import LpBackdrop from "../../components/LpBackdrop/LpBackdrop.tsx";


const SignIn = () => {

    const {control, alertState, handleSubmit, onSubmit, hideAlert} = useSignInForm();
    const {isAuthLoading} = useAuth();

    //===============================================================
    // Temporary state and handlers for reset password modal
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    //===============================================================
    return (
        <>
            <Typography
                component="h1"
                variant="h4"
                sx={{width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)'}}>
                Sign in
            </Typography>
            <Box
                component="form"
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    gap: 2,
                }}>
                <LpTextField<SignInSchema> control={control} id={"email"} name={"email"} label={"Email"} type={"email"}
                                           defaultValue={""} variant="outlined"/>
                <LpTextField<SignInSchema> control={control} id={"password"} name={"password"} label={"Password"}
                                           type={"password"} defaultValue={""} variant="outlined"/>
                <FormControlLabel
                    control={<Checkbox value="remember" color="primary"/>}
                    label="Remember me"/>

                <LpButton
                    disabled={isAuthLoading}
                    type="submit"
                    fullWidth
                    variant="contained">
                    Sign in
                </LpButton>

                <Link
                    component="button"
                    type="button"
                    onClick={handleClickOpen}
                    variant="body2"
                    sx={{
                        alignSelf: 'center',
                        color: 'var(--tertiary-color)',
                        opacity: 0.65,
                    }}>
                    Forgot your password?
                </Link>
            </Box>
            <Divider>or</Divider>
            <Box sx={{display: 'flex', flexDirection: 'column', gap: 2}}>
                <Typography sx={{textAlign: 'center'}}>
                    Don&apos;t have an account?{' '}
                    <Link
                        href="/auth/sign-up/"
                        variant="body2"
                        sx={{
                            alignSelf: 'center',
                            color: 'var(--tertiary-color)',
                            opacity: 0.65,
                        }}>
                        Sign up
                    </Link>
                </Typography>
            </Box>
            <ResetPassword open={open} handleClose={handleClose}/>
            <LpBackdrop isLoading={isAuthLoading} alertState={alertState} closeAlert={hideAlert}/>
        </>
    )
}

export default SignIn;
