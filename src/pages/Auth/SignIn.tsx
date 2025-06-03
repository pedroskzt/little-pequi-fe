import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import Divider from "@mui/material/Divider"
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import {styled} from "@mui/material/styles";
import Alert from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";

import LpButton from "../../components/LpButton/LpButton.tsx";
import {ChangeEvent, FormEvent, useEffect, useState} from "react";
import ResetPassword from "./ResetPassword.tsx";
import http from "../../http";
import {useNavigate} from "react-router";
import {useAuth} from "../../context/auth/AuthContext.tsx";
import IUser from "../../interfaces/IUser.ts";


const StyledTextField = styled(TextField)({
    '& .MuiInputBase-input': {
        boxSizing: 'border-box',
    }
})

const SignIn = () => {
    const [open, setOpen] = useState(false);
    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [emailErrorMsg, setEmailErrorMsg] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const [passwordErrorMsg, setPasswordErrorMsg] = useState('');


    const {isSignedIn, setIsSignedIn} = useAuth();
    const navigate = useNavigate();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const clearErrors = () => {
        setAlertOpen(false);
        setEmailError(false);
        setEmailErrorMsg('');
        setPasswordError(false);
        setPasswordErrorMsg('')
    }
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        clearErrors();
        const payload = {
            email: email,
            password: password
        }

        http.post('/auth/sign-in/', payload)
            .then(res => {
                sessionStorage.setItem('token', res.data.access);
                sessionStorage.setItem('refresh', res.data.refresh);
                setEmail('');
                setPassword('');
                setIsSignedIn(true);
            })
            .then(() => {
                http.get<IUser>('/auth/users/me/')
                    .then(res => {
                        sessionStorage.setItem('user', JSON.stringify(res.data));
                    })
                    .catch(err => {
                            console.log(err);
                        }
                    )
            })
            .catch(err => {
                if (err.response) {
                    const data = err.response.data;
                    console.log(data);
                    if (err.response.status === 400) {
                        if (data.email) {
                            setEmailError(true);
                            setEmailErrorMsg(() => (data.email));
                        }
                        if (data.password) {
                            setPasswordError(true);
                            setPasswordErrorMsg(() => (data.password));
                        }
                    } else {
                        setAlertMessage(() => (data.detail));
                        setAlertOpen(true);
                    }
                } else {
                    setAlertOpen(true);
                    setAlertMessage('Something went wrong. Please try again later or contact support.')
                }

            })
        event.preventDefault();
    }
    useEffect(() => {
        if (isSignedIn) {
            navigate('/');
        }
    })
    return (
        <>
            <Typography
                component="h1"
                variant="h4"
                sx={{width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)'}}
            >
                Sign in
            </Typography>
            <Collapse in={alertOpen}>
                <Alert severity="error">{alertMessage}</Alert>
            </Collapse>
            <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    gap: 2,
                }}
            >
                <FormControl>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <StyledTextField
                        id="email"
                        type="email"
                        name="email"
                        placeholder="your@email.com"
                        autoComplete="email"
                        required
                        variant="outlined"
                        autoFocus
                        value={email}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => {
                            setEmail(event.target.value);
                        }}
                        error={emailError}
                        helperText={emailErrorMsg}
                        color={emailError ? 'error' : 'primary'}
                    />
                </FormControl>
                <FormControl>
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <StyledTextField
                        id="password"
                        type="password"
                        name="password"
                        placeholder="••••••"
                        autoComplete="current-password"
                        required
                        variant="outlined"
                        value={password}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => {
                            setPassword(event.target.value);
                        }}
                        error={passwordError}
                        helperText={passwordErrorMsg}
                        color={passwordError ? 'error' : 'primary'}
                    />
                </FormControl>
                <FormControlLabel
                    control={<Checkbox value="remember" color="primary"/>}
                    label="Remember me"
                />

                <LpButton
                    type="submit"
                    fullWidth
                    variant="contained"
                    // onClick={validateInputs}
                >
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
                    }}
                >
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
                        }}

                    >
                        Sign up
                    </Link>
                </Typography>
            </Box>
            <ResetPassword open={open} handleClose={handleClose}/>
        </>
    )
}

export default SignIn;
