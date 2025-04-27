import LpRoutes from './routes/index.tsx';
import {BrowserRouter} from 'react-router-dom';
import {ThemeProvider, CssBaseline, createTheme} from "@mui/material";
import LpHeader from "./components/LpHeader/LpHeader.tsx";
import LpNavBar from "./components/LpNavBar/LpNavBar.tsx";
import LpFooter from "./components/LpFooter/LpFooter.tsx";

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
                        <LpHeader/>
                        <LpNavBar/>
                        <LpRoutes/>
                        <LpFooter/>
                </CssBaseline>
            </ThemeProvider>
        </BrowserRouter>


    )
}

export default App
