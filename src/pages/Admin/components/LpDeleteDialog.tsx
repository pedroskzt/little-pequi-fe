import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import LpButton from "../../../components/LpButton/LpButton.tsx";
import apiClient from "../../../http";
import IAction from "../../../interfaces/IAction.ts";
import {useCrudAdminContext} from "../context/CrudAdminContext.ts";

interface ILpDeleteDialogProps {
    // open: boolean;
    label: string;
    apiUrl: string;
    // toDeleteId: number|string;

    updateDataList: (action: IAction) => void;
}

const LpDeleteDialog = (props: ILpDeleteDialogProps) => {

    const {label, apiUrl, updateDataList} = props;
    const {openDeleteDialog, setAlertState} = useCrudAdminContext();

    const handleClose = () => {
        updateDataList({type: 'delete'});
    }

    const handleDelete = () => {
        if (openDeleteDialog) {
            apiClient.delete(`${apiUrl}/${openDeleteDialog.id}`)
                .then(() => {
                    updateDataList({type: 'delete', id: openDeleteDialog.id})
                    setAlertState({
                        open: true,
                        message: `${label} deleted successfully!`,
                        severity: 'success'
                    });
                })
                .catch(error => {
                    console.log(error);
                    // TODO: Show error message
                    setAlertState({
                        open: true,
                        message: `${label} delete failed!`,
                        severity: 'error'
                    })
                })
        }
    }

    return (
        <>
            <Dialog
                open={openDeleteDialog ? openDeleteDialog.open : false}
                onClose={handleClose}
                aria-labelledby="delete-confirmation-dialog-title">
                <DialogTitle id="delete-confirmation-dialog-title">
                    Delete Category Confirmation
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Do you really want to delete <strong>{`${openDeleteDialog ? openDeleteDialog.title : ''}`}</strong>?
                    </DialogContentText>
                    <DialogActions sx={{justifyContent: 'space-between'}}>
                        <LpButton onClick={handleClose} autoFocus>Cancel</LpButton>
                        <LpButton onClick={handleDelete}>Yes</LpButton>
                    </DialogActions>
                </DialogContent>

            </Dialog>
        </>
    )
}

export default LpDeleteDialog;