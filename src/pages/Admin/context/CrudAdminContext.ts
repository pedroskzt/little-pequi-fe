import {SetStateAction} from "react";
import {Dispatch} from "react";
import {useContext} from "react";
import {createContext} from "react";
import IAlert from "../../../interfaces/IAlert.ts";
import IOpenDeleteDialog from "../types/IOpenDeleteDialog.ts";
import IOpenReorderDialog from "../types/IOpenReorderDialog.ts";

export interface ICrudAdminContextProps {
    openForm: boolean;
    openReorderDialog: IOpenReorderDialog
    openDeleteDialog: IOpenDeleteDialog | null;
    alertState: IAlert;
    isLoading: boolean;

    setOpenForm: Dispatch<SetStateAction<boolean>>;
    setOpenReorderDialog: Dispatch<SetStateAction<IOpenReorderDialog>>;
    setOpenDeleteDialog: Dispatch<SetStateAction<IOpenDeleteDialog | null>>;
    setAlertState: Dispatch<SetStateAction<IAlert>>;
    setIsLoading: Dispatch<SetStateAction<boolean>>;

    handleCloseAlert: () => void;

}

export const CrudAdminContext = createContext<ICrudAdminContextProps | undefined>(undefined);

export const useCrudAdminContext = () => {
    const context = useContext(CrudAdminContext);
    if (context === undefined) {
        throw new Error('useCrudAdminContext must be used within an CrudAdminContextProvider');
    }
    return context;
};