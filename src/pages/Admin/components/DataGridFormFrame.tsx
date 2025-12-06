import CloseIcon from '@mui/icons-material/Close';
import {DialogContentText} from "@mui/material";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from "@mui/material/IconButton";
import {ReactNode} from "react";
import LpButton from "../../../components/LpButton/LpButton.tsx";
import {useCrudAdminContext} from "../context/CrudAdminContext.ts";

interface IDataGridFormFrameProps {
    //Props
    label: string;
    children: ReactNode;
    formId: string;

    //Getters
    toEdit: string | undefined;

    //Handlers
    handleClose: () => void;
}

const DataGridFormFrame = (props: IDataGridFormFrameProps) => {

    const {label,children, formId, toEdit, handleClose } = props;
    const {openForm} = useCrudAdminContext();

    return (
        <>
            <Dialog
                open={openForm}
                onClose={handleClose}
                slotProps={{
                    paper: {
                        style: {
                            minWidth: '20rem',
                            maxWidth: '20rem'
                        }
                    }
                }}>
                {!toEdit && <DialogTitle sx={{px: 1}}>{`Create New ${label}`}</DialogTitle>}
                {toEdit && <DialogTitle sx={{px: 1, paddingBottom: 0}}>{`Update ${label}`} </DialogTitle>}
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={(theme) => ({
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: theme.palette.grey[500],
                    })}>
                    <CloseIcon/>
                </IconButton>
                <DialogContent sx={{
                    paddingTop: 0,
                    paddingBottom: 1,
                    paddingX: 1
                }}>
                    {toEdit && <DialogContentText sx={{
                        marginTop: 0,
                        paddingTop: 0,
                        paddingBottom: 2,

                    }}>
                        {toEdit}
                    </DialogContentText>}
                    {children}
                    <DialogActions sx={{paddingTop: 2, justifyContent: 'center'}}>
                        <LpButton type="submit" form={formId}>Submit</LpButton>
                    </DialogActions>
                </DialogContent>
            </Dialog>
        </>
    );
}

export default DataGridFormFrame;