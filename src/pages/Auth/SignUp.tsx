import Collapse from "@mui/material/Collapse";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import Backdrop from "@mui/material/Backdrop";
import Divider from "@mui/material/Divider";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormHelperText from '@mui/material/FormHelperText';
import {styled} from "@mui/material/styles";
import CircularProgress from '@mui/material/CircularProgress';
import LpButton from "../../components/LpButton/LpButton.tsx";
import {FormEvent, useState} from "react";
import http from "../../http";
import {useNavigate} from "react-router";


const StyledTextField = styled(TextField)({
    '& .MuiInputBase-input': {
        boxSizing: 'border-box',
    }
})


const SignUp = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [openAlert, setOpenAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    const [emailError, setEmailError] = useState(false);
    const [emailErrorMsg, setEmailErrorMsg] = useState([]);
    const [passwordError, setPasswordError] = useState(false);
    const [passwordErrorMsg, setPasswordErrorMsg] = useState([]);

    const [defaultError, setDefaultError] = useState(false);

    const navigate = useNavigate();

    const clearFormErrors = () => {
        setEmailError(false);
        setEmailErrorMsg([]);
        setPasswordError(false);
        setPasswordErrorMsg([]);
    }
    const cleanForm = () => {
        setFirstName('');
        setLastName('');
        setEmail('');
        setPassword('');
        clearFormErrors();
    }


    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const payload = {
            first_name: firstName,
            last_name: lastName,
            email: email,
            password: password,
        }
        http.post('/auth/users/', payload)
            .then(() => {
                setOpenAlert(true);
                setAlertMessage('Account created successfully!');
                cleanForm();
            })
            .catch(err => {
                    clearFormErrors();
                    if (err.response && err.response.status === 400) {
                        const data = err.response.data;
                        if (data.email) {
                            setEmailError(true);
                            setEmailErrorMsg(data.email);
                        }
                        if (data.password) {
                            setPasswordError(true);
                            setPasswordErrorMsg(data.password);
                        }
                    } else {
                        console.log(err);
                        setDefaultError(true);
                    }
                }
            )

    }

    const handleClose = () => {
        setOpenAlert(false);
        setAlertMessage('');
        navigate('/auth/sign-in/');
    }

    return (
        <>
            <Typography
                component="h1"
                variant="h4"
                sx={{width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)'}}
            >
                Sign up
            </Typography>
            <Collapse in={defaultError}>
                <Alert severity="error">Something went wrong. Please try again later or contact support.</Alert>
            </Collapse>
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                }}
            >
                <FormControl>
                    <FormLabel htmlFor="name">First Name</FormLabel>
                    <StyledTextField
                        id="¨firstName"
                        type="firstName"
                        name="firstName"
                        placeholder="John"
                        autoComplete="firstName"
                        variant="outlined"
                        required
                        autoFocus
                        value={firstName}
                        onChange={(event) => {
                            setFirstName(event.target.value);
                        }}
                    />
                </FormControl>
                <FormControl>
                    <FormLabel htmlFor="name">Last Name</FormLabel>
                    <StyledTextField
                        id="lastName"
                        type="lastName"
                        name="lastName"
                        placeholder="Doe"
                        autoComplete="lastName"
                        variant="outlined"
                        required
                        autoFocus
                        value={lastName}
                        onChange={(event) => {
                            setLastName(event.target.value);
                        }}
                    />
                </FormControl>
                <FormControl>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <StyledTextField
                        id="email"
                        name="email"
                        placeholder="your@email.com"
                        autoComplete="email"
                        variant="outlined"
                        type="email"
                        required
                        value={email}
                        onChange={(event) => {
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
                        name="password"
                        placeholder="••••••"
                        type="password"
                        autoComplete="new-password"
                        required
                        variant="outlined"
                        value={password}
                        onChange={(event) => {
                            setPassword(event.target.value);
                        }}
                        error={passwordError}
                        color={passwordError ? 'error' : 'primary'}
                    />
                    <FormHelperText error={passwordError} component={"ul"}>
                        <ul>
                            {passwordErrorMsg.map((error, index) => (
                                <li key={index}>{error}</li>
                            ))}
                        </ul>
                    </FormHelperText>
                </FormControl>
                <LpButton
                    type="submit"
                    fullWidth
                    variant="contained"
                    // onClick={validateInputs}
                >
                    Sign up
                </LpButton>
            </Box>
            <Divider>or</Divider>
            <Box sx={{display: 'flex', flexDirection: 'column', gap: 2}}>
                <Typography sx={{textAlign: 'center'}}>
                    Already have an account?{' '}
                    <Link
                        href="/auth/sign-in/"
                        variant="body2"
                        sx={{
                            alignSelf: 'center',
                            color: 'var(--tertiary-color)',
                            opacity: 0.65,
                        }}
                    >
                        Sign in
                    </Link>
                </Typography>
            </Box>
            <Backdrop
                open={openAlert}
                onClick={handleClose}
                sx={(theme) => ({color: '#fff', zIndex: theme.zIndex.drawer + 1})}
            >
                <Snackbar
                    open={openAlert}
                    autoHideDuration={2000}
                    onClose={handleClose}
                    anchorOrigin={{vertical: 'top', horizontal: 'center'}}
                >
                    <Alert>
                        {alertMessage}
                    </Alert>
                </Snackbar>
                <CircularProgress/>
            </Backdrop>

        </>
    )
}

export default SignUp;
