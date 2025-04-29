import {
    Box,
    Checkbox, Divider,
    FormControl,
    FormControlLabel,
    FormLabel,
    TextField,
    Typography,
    Link as MuiLink,
    Card, Container, styled
} from "@mui/material";
import LpButton from "../../components/LpButton/LpButton.tsx";
import {useState} from "react";
import ResetPassword from "./ResetPassword.tsx";



const LogoIcon = styled('img')({
    width: 'auto',
    height: 'auto',
})

const StyledTextField = styled(TextField)({
    '& .MuiInputBase-input': {
        boxSizing: 'border-box',
    }
})

const SignIn = () => {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Container sx={{
            my: "1rem",
            width: ["auto", "450px", "450px", "450px", "450px"],
            maxWidth: 'none',
        }}>
            <Card variant="elevation" elevation={9} sx={{
                display: 'flex',
                flexDirection: 'column',
                alignSelf: 'center',
                width: '100%',
                padding: 4,
                gap: 2,
                margin: 'auto',
            }}>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                }}>
                    <LogoIcon sx={{
                        mr: ".5rem"
                    }} src="/src/assets/home/logo_footer.png" alt="Real Pequi photo"/>
                    <Typography variant="h4" sx={{alignSelf: 'center'}}>Little Pequi</Typography>
                </Box>
                <Typography
                    component="h1"
                    variant="h4"
                    sx={{width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)'}}
                >
                    Sign in
                </Typography>
                <Box
                    component="form"
                    // onSubmit={handleSubmit}
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
                            // error={emailError}
                            // helperText={emailErrorMessage}
                            // color={emailError ? 'error' : 'primary'}
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
                            // error={passwordError}
                            // helperText={passwordErrorMessage}
                            // color={passwordError ? 'error' : 'primary'}
                        />
                    </FormControl>
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary"/>}
                        label="Remember me"
                    />
                    <ResetPassword open={open} handleClose={handleClose} />
                    <LpButton
                        type="submit"
                        fullWidth
                        variant="contained"
                        // onClick={validateInputs}
                    >
                        Sign in
                    </LpButton>

                    <MuiLink
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
                    </MuiLink>
                </Box>
                <Divider>or</Divider>
                <Box sx={{display: 'flex', flexDirection: 'column', gap: 2}}>
                    <Typography sx={{textAlign: 'center'}}>
                        Don&apos;t have an account?{' '}
                        <MuiLink
                            href="/auth/sign-up/"
                            variant="body2"
                            sx={{
                                alignSelf: 'center',
                                color: 'var(--tertiary-color)',
                                opacity: 0.65,
                            }}

                        >
                            Sign up
                        </MuiLink>
                    </Typography>
                </Box>
            </Card>
        </Container>
    )
}

export default SignIn;
