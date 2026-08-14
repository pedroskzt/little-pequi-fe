import {AlertColor} from "@mui/material/Alert";

interface IAlert {
    severity: AlertColor;
    message: string;
    open: boolean;
}

export default IAlert;