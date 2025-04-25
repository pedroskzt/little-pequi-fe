import LpRoutes from './routes/index.tsx';
import {BrowserRouter} from 'react-router-dom';
import {ThemeProvider, CssBaseline, createTheme} from "@mui/material";

const darkTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#F9D259',
        },
        secondary: {
            main: '#FFF4F4',
        },
    },
});

function App() {
    return (

        <BrowserRouter>
            <ThemeProvider theme={darkTheme}>
                <CssBaseline>
                    <LpRoutes/>
                </CssBaseline>
            </ThemeProvider>
        </BrowserRouter>


    )
}

export default App
