import LpRoutes from './routes/index.tsx';
import {BrowserRouter} from 'react-router';
import {ThemeProvider, CssBaseline, createTheme} from "@mui/material";

const customTheme = createTheme({
    palette: {
        primary: {
            main: '#F9D259',
        },
        secondary: {
            main: '#FFF4F4',
        },
        text: {
            primary: '#A66411',
            secondary: 'rgba(166, 100, 17, 0.65)',
        },

    },
    typography: {
        fontFamily: 'Roboto',
    }
});

function App() {
    return (

        <BrowserRouter>
            <ThemeProvider theme={customTheme}>
                <CssBaseline>
                    <LpRoutes/>
                </CssBaseline>
            </ThemeProvider>
        </BrowserRouter>


    )
}

export default App
