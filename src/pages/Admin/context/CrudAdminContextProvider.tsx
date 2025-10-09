import {useMemo} from "react";
import {useState} from "react";
import {ReactNode} from "react";
import IAlert from "../../../interfaces/IAlert.ts";
import IOpenDeleteDialog from "../types/IOpenDeleteDialog.ts";
import IOpenReorderDialog from "../types/IOpenReorderDialog.ts";
import {CrudAdminContext} from "./CrudAdminContext.ts";
import {ICrudAdminContextProps} from "./CrudAdminContext.ts";

const CrudAdminContextProvider = ({children}: { children: ReactNode }) => {
    const [openForm, setOpenForm] = useState(false);
    const [openReorderDialog, setOpenReorderDialog] = useState<IOpenReorderDialog>({open: false, label: ''});
    const [openDeleteDialog, setOpenDeleteDialog] = useState<IOpenDeleteDialog | null>(null);
    const [alertState, setAlertState] = useState<IAlert>({open: false, message: '', severity: 'success'});
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const handleCloseAlert = () => {
        setAlertState((prevState)=>{
            return {
                ...prevState,
                open: false
            }
        })
        setIsLoading(false);
    }

    const dataGridContext = useMemo<ICrudAdminContextProps>(() => ({
        openForm,
        openReorderDialog,
        openDeleteDialog,
        alertState,
        isLoading,
        setOpenForm,
        setOpenReorderDialog,
        setOpenDeleteDialog,
        setAlertState,
        setIsLoading,
        handleCloseAlert,
    }), [openForm, openReorderDialog, openDeleteDialog, alertState, isLoading])


    return (
        <>
            <CrudAdminContext.Provider value={dataGridContext}>
                {children}
            </CrudAdminContext.Provider>
        </>

    )
}

export default CrudAdminContextProvider;