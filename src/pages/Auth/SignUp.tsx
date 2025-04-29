import {
    Box, Divider,
    FormControl,
    FormLabel,
    TextField,
    Typography,
    Link as MuiLink,
    Card, Container, styled
} from "@mui/material";
import LpButton from "../../components/LpButton/LpButton.tsx";

const LogoIcon = styled('img')({
    width: 'auto',
    height: 'auto',
})

const StyledTextField = styled(TextField)({
    '& .MuiInputBase-input': {
        boxSizing: 'border-box',
    }
})

const SignUp = () => {


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
                    Sign up
                </Typography>
                <Box
                    component="form"
                    // onSubmit={handleSubmit}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                    }}
                >
                    <FormControl>
                        <FormLabel htmlFor="name">Full Name</FormLabel>
                        <StyledTextField
                            id="name"
                            type="name"
                            name="name"
                            placeholder="John Doe"
                            autoComplete="name"
                            variant="outlined"
                            required
                            autoFocus
                            // fullWidth
                            // error={nameError}
                            // helperText={nameErrorMessage}
                            // color={emailError ? 'error' : 'primary'}
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
                            // error={emailError}
                            // helperText={emailErrorMessage}
                            // color={emailError ? 'error' : 'primary'}
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
                            // error={passwordError}
                            // helperText={passwordErrorMessage}
                            // color={passwordError ? 'error' : 'primary'}
                        />
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
                        <MuiLink
                            href="/auth/sign-in/"
                            variant="body2"
                            sx={{
                                alignSelf: 'center',
                                color: 'var(--tertiary-color)',
                                opacity: 0.65,
                            }}
                        >
                            Sign in
                        </MuiLink>
                    </Typography>
                </Box>
            </Card>
        </Container>
    )
}

export default SignUp;
