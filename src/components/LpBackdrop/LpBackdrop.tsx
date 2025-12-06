import Alert from "@mui/material/Alert";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

import Snackbar from "@mui/material/Snackbar";
import IAlert from "../../interfaces/IAlert.ts";


interface ILpBackdropProps {
    isLoading: boolean;
     alertState: IAlert;
     closeAlert: () => void;
}

const LpBackdrop = (props:ILpBackdropProps) => {
    const {isLoading, alertState, closeAlert} = props

    return (
        <>
            <Snackbar
                open={alertState.open}
                autoHideDuration={3000}
                onClose={closeAlert}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center'
                }}>
                <Alert
                    severity={alertState.severity}
                    onClose={closeAlert}
                    sx={{width: '100%'}}>
                    {alertState.message}
                </Alert>
            </Snackbar>
            <Backdrop
                open={isLoading}
                onClick={
                    alertState.open ? closeAlert : () => {
                    }
                }
                sx={(theme) =>(
                    {color: '#fff', zIndex: theme.zIndex.drawer + 1}
                )}>
                <CircularProgress/>
            </Backdrop>
        </>
    )
}

export default LpBackdrop;

